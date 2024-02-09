import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMovie, getMovieDetails } from "../movie";
import { decodeToken, isExpired } from "react-jwt";

const Details = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const token = localStorage.getItem('token');
    const isLoggedIn = !isExpired(token);
    const user = decodeToken(token);
    const userId = user?.userId;
    const navigate = useNavigate();
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const details = await getMovieDetails(decodeURIComponent(id));
                setMovieDetails(details);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
        fetchData();
        checkWatchlist();
    }, [id, userId]);

    const checkWatchlist = () => {
        const moviesInWatchlist = JSON.parse(localStorage.getItem(userId + 'watchlist')) || [];
        setIsInWatchlist(moviesInWatchlist.some(movie => movie.id === id));
    };

    const handleToggleWatchlist = () => {
        const moviesInWatchlist = JSON.parse(localStorage.getItem(userId + 'watchlist')) || [];
        const movie = { id, image: movieDetails?.image || "" };

        if (isInWatchlist) {
            const updatedWatchlist = moviesInWatchlist.filter(movie => movie.id !== id);
            localStorage.setItem(userId + 'watchlist', JSON.stringify(updatedWatchlist));
        } else {
            moviesInWatchlist.push(movie);
            localStorage.setItem(userId + 'watchlist', JSON.stringify(moviesInWatchlist));
        }

        setIsInWatchlist(!isInWatchlist);
    };

    const handleDeleteMovie = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (confirmDelete) {
            try {
                await deleteMovie(id, token);
                navigate('/');
            } catch (error) {
                console.error("Error deleting movie:", error);
            }
        }
    }

    const getYear = () => {
        return movieDetails?.productionYear || "no info";
    }

    return (
        <div style={pageStyles} className="pt-4 pb-4">
            {movieDetails &&
                <div className="card text-bg-secondary rounded-lg border-dark">
                    <div className="row no-gutters">
                        <div className="col-md-2 d-flex flex-column">
                            <img
                                src={movieDetails.image}
                                className="card-img m-2"
                                alt=""
                                style={imageStyle}
                            />
                            {isLoggedIn && (
                                <button type="button" className={`btn ${isInWatchlist ? "btn-success" : "btn-warning"} m-2 w-100`} onClick={handleToggleWatchlist}>
                                    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                </button>
                            )}
                            {isLoggedIn && user.isAdmin && (
                                <button type="button" className="btn btn-danger m-2 w-100" onClick={handleDeleteMovie}>Delete Movie</button>
                            )}
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h2 className="card-title">{movieDetails.title}</h2>
                                <p className="card-subtitle">Year: {getYear()}</p>
                                <p className="card-text mt-4">{movieDetails.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const imageStyle = {
    objectFit: "fill",
    maxHeight: "20rem",
    width: "100%",
};

const pageStyles = {
    paddingLeft: "20%",
    paddingRight: "20%",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`,
    color: "white",
    paddingTop: "2rem"
}

export default Details;
