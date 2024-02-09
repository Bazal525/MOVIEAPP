import React, { useEffect, useState } from "react";
import MovieCard from "./Poster";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

const Towatchhome = () => {
    const [ToWatchlist, setToWatchlist] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!isExpired(token));

        if (!isExpired(token)) {
            const user = decodeToken(token);
            const userId = user?.userId;
            const moviesInWatchlist = JSON.parse(localStorage.getItem(userId + ' watchlist')) || [];
            setToWatchlist(moviesInWatchlist);
        }
    }, []);

    return (
        <div style={styles}>
            <h1 style={{ color: "#ffc100" }}>Movies to watch: </h1>
            {isLogged ? (
                <Slider {...settings}>
                    {ToWatchlist.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={movie.image}
                            description={movie.desc}
                            id={movie.id}
                        />
                    ))}
                </Slider>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    <p style={{ fontSize: "1.5rem", color: "#ffc100" }}>You must first be logged in to see your list of movies to watch</p>
                    <Link to="/signin" className="btn btn-primary">Log In</Link>
                </div>
            )}
        </div>
    );
};

const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

};

const styles = {
    marginTop: "2rem",
    padding: "3rem",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: "25px",
    overflow: "hidden",
};

export default Towatchhome;
