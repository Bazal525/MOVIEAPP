import React, { useState } from "react";
import noImage from "../assets/movieNoImage.png";
import { Link } from "react-router-dom";

const ExtendedMovieCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnterHandler = () => setIsHovered(true);
    const onMouseLeaveHandler = () => setIsHovered(false);

    const obtainImage = () => props.image || noImage;
    const obtainTitle = () => props.title || "No title";
    const obtainDescription = () => {
        const description = props.description || "No description";
        const limitedDescription = description.split(' ').slice(0, 40).join(' ');
        return description.length > 40 ? `${limitedDescription}...` : limitedDescription;
    };
    const obtainYear = () => props.year || "no info";
    const obtainId = () => props.id;

    const cardStyles = {
        scale: isHovered ? "1.03" : "1.00",
        textDecoration: "none",
    };

    const imageStyles = {
        maxHeight: "12rem",
    };

    return (
        <Link to={`/details/${encodeURIComponent(obtainId())}`}
              className="card text-bg-secondary m-3 border-warning"
              style={cardStyles}
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
        >
            <div className="row no-gutters">
                <div className="col-md-2">
                    <img src={obtainImage()} className="card-img" alt="" style={imageStyles}/>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{obtainTitle()}</h5>
                        <p className="card-subtitle">{obtainYear()}</p>
                        <p className="card-text">{obtainDescription()}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ExtendedMovieCard;
