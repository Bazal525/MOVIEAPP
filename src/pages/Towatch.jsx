import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import MovieCard from "../components/Poster";

const Towatch = () => {
    const [moviesFromWatchlist, setMoviesFromWatchlist] = useState([]);
    const [movieToRemove, setMovieToRemove] = useState(null);
    const token = localStorage.getItem('token');
    const user = decodeToken(token);
    const userId = user.userId;

    useEffect(() => {
        getMoviesFromWatchlist();
    }, [userId]);

    const getMoviesFromWatchlist = () => {
        const moviesInWatchlist = JSON.parse(localStorage.getItem(userId + ' watchlist')) || [];
        setMoviesFromWatchlist(moviesInWatchlist);
    };

    const handleRemoveMovie = (movieId) => {
        const updatedWatchlist = moviesFromWatchlist.filter(
            (movie) => movie.id !== movieId
        );
        setMoviesFromWatchlist(updatedWatchlist);
        localStorage.setItem(userId + ' watchlist', JSON.stringify(updatedWatchlist));
        setMovieToRemove(null);
    };

    return (
        <div style={pageStyles}>
            <h1>To watch list: </h1>
            <div className="movie-grid pt-4 pb-4" style={movieGridStyles}>
                {moviesFromWatchlist.map((movie, key) => (
                    <div
                        key={key}
                        className="position-relative"
                        onMouseEnter={() => setMovieToRemove(movie.id)}
                        onMouseLeave={() => setMovieToRemove(null)}
                    >
                        <MovieCard
                            title={movie.title}
                            image={movie.image}
                            id={movie.id}
                        />
                        {movieToRemove === movie.id && (
                            <button
                                className="btn btn-warning position-absolute bottom-0 start-0 end-0"
                                style={{ opacity: 1, borderRadius: "0 0 0 0", transform: "scale(1.08)" }}
                                onClick={() => handleRemoveMovie(movie.id)}
                            >
                                Remove from list
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const pageStyles = {
    paddingLeft: "20%",
    paddingRight: "20%",
    backgroundColor: "#1b263b",
    color: "#ffc100",
    paddingTop: "2rem",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`
};

const movieGridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
};

export default Towatch;
