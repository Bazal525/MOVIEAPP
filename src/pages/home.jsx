import React, {useEffect, useState} from "react";
import Towatchhome from "../components/Towatchhome";
import {getMovies} from "../movie";
import HomPageMovies from "../components/HomPageMovies";
const Home = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then(setMovies)
    }, []);

    return (
        <div style={homeStyle} className="pt-4 pb-4">
            <HomPageMovies movies = {movies}/>
            <Towatchhome/>
        </div>
    )
}

const homeStyle = {
    paddingLeft: "20%",
    paddingRight: "20%",
    backgroundColor: "red",
    backgroundImage: `url("https://wallpaperset.com/w/full/7/5/b/203988.jpg")`
}

export default Home;