import React, { useState } from "react";
import noImage from "../assets/movieNoImage.png";
import { Link } from "react-router-dom";

const UpdatedMovieComponent = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const fetchMovieImage = () => props.image || noImage;
    const obtainMovieId = () => props.id;

    const movieCardStyles = {
        height: "15rem",
        transform: `scale(${isHovered ? 1.1 : 0.9})`,
        transition: "transform ease 1s",
        overflow: "hidden",
        textDecoration: "none",
        boxShadow: "2px 0.5px 10px rgba(255, 245, 120, 0.8)",
    };

    const PosterStyle = {
        flex: "1",
        objectFit: "cover",
        maxHeight: "15rem",
    };

    return (
        <Link
            to={`/details/${encodeURIComponent(obtainMovieId())}`}
            className="card movie-card rounded-lg m-3 border-dark"
            style={movieCardStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={fetchMovieImage()}
                alt="movie cover"
                style={PosterStyle}
            />
        </Link>
    );
};
export default UpdatedMovieComponent;
