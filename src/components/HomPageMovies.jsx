import React from "react";
import MoviePoster from "./Poster";
import Slider from "react-slick";

const HomPageMovies = (props) => {
    const moviesList = props.movies;
    const sliderSettings = {
        speed: 1200,
        slidesToShow: 5,
        slidesToScroll: 4,
    };
    const containerStyles = {
        marginTop: "2rem",
        padding: "3rem",
        backgroundColor: "rgba(0,0,0,0.45)",
        borderRadius: "25px",
        overflow: "hidden",
    };
    return (
        <div style={containerStyles}>
            <h1 style={{color: "#ffc100"}}>Recommended</h1>
            <Slider {...sliderSettings}>
                {moviesList.map((movie) => (
                    <MoviePoster
                        key={movie.id}
                        title={movie.title}
                        image={movie.image}
                        description={movie.content}
                        id={movie.id}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default HomPageMovies;
