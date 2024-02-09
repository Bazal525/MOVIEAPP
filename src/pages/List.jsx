import React, {useEffect, useState} from "react";
import MovieCardLong from "../components/MovieList";
import SortInput from "../components/sortInput";
import {getMovies} from "../movie";

const List = () => {

    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        getMovies().then((movies) => {
            setMovies(movies);
            setFilteredMovies(movies);
        });
    }, []);

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);

        const filtered = movies.filter((movie) =>
            movie?.title?.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredMovies(filtered);
    };

    const handleSortChange = (selectedOption) => {
        let sortedMovies = [...filteredMovies];

        switch (selectedOption) {
            case "title-asc":
                sortedMovies.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                break;
            case "title-desc":
                sortedMovies.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
                break;
            case "year-asc":
                sortedMovies.sort((a, b) => (a.productionYear || 0) - (b.productionYear || 0));
                break;
            case "year-desc":
                sortedMovies.sort((a, b) => (b.productionYear || 0) - (a.productionYear || 0));
                break;
            default:
                break;
        }

        setFilteredMovies(sortedMovies);
    };

    return (
        <div style={pageStyles}>
            <h1>Movies ranking</h1>
            <div className={"d-flex flex-row pt-4 pb-4 justify-content-between"}>
                <div className={"flex-grow-1"}>
                    {filteredMovies.map((movie, key)=><MovieCardLong key = {key} title = {movie.title} image = {movie.image} description = {movie.content} id = {movie.id} year = {movie.productionYear}/>)}
                </div>
                <div style={{marginTop: "1rem", paddingLeft: "4rem"}}>
                    <input className="form-control mr-sm-2 mb-" type="search" placeholder="Find..." value={searchInput} onChange={handleSearchChange}/>
                    <SortInput
                        options={[
                            { value: "year-asc", label: "The oldest" },
                            { value: "year-desc", label: "The latest" }
                        ]}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>
        </div>
    )
}

const pageStyles={
    paddingLeft: "20%",
    paddingRight: "20%",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`,
    color: "#ffc100",
    paddingTop: "2rem"
}

export default List;