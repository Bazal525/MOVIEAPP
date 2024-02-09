import React, {useState} from "react";
import {addNewMovie} from "../movie";

const AddMovieForm = () => {

    const [movieTitle, setMovieTitle] = useState("");
    const [moviePoster, setMoviePoster] = useState("");
    const [movieYear, setMovieYear] = useState("");
    const [movieDescription, setMovieDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewMovie(movieTitle, moviePoster, movieYear, movieDescription);
        resetForm();
    }

    const resetForm = () => {
        setMovieTitle("");
        setMoviePoster("");
        setMovieYear("");
        setMovieDescription("");
    };

    return (
        <div style={pageStyles} className="pt-4 pb-4">
            <form
                style={formStyles}
                className="d-flex flex-column"
                onSubmit={handleSubmit}
            >
                <h2>Add Movie</h2>
                <div className="form-group mt-2">
                    <label htmlFor="inputMovieTitle">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputMovieTitle"
                        placeholder="Movie title:"
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                    />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="inputMovieCover">Movie Poster</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputMovieCover"
                        placeholder="Link:"
                        value={moviePoster}
                        onChange={(e) => setMoviePoster(e.target.value)}
                    />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="inputMovieYear">Year:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputMovieYear"
                        placeholder="Year:"
                        value={movieYear}
                        onChange={(e) => setMovieYear(e.target.value)}
                    />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="inputDescription">Description</label>
                    <textarea
                        className="form-control"
                        id="inputDescription"
                        placeholder="Description..."
                        rows="10"
                        value={movieDescription}
                        onChange={(e) => setMovieDescription(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary">
                        Add Movie
                    </button>
                    <button type="button" className="btn btn-danger" onClick={resetForm}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

const pageStyles = {
    paddingLeft: "35%",
    paddingRight: "35%",
    backgroundColor: "#ffc100",
    color: "white",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`
}

const formStyles = {
    padding: "2rem",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: "25px",
    overflow: "hidden",
}

export default AddMovieForm;
