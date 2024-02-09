import axios from "axios";

const baseURL = "https://at.usermd.net/api";

export const getMovies = () => {
    return axios.get(`${baseURL}/movies`)
        .then(response => {return response.data;})
        .catch(error => console.log(error));
}

export const getMovieDetails = (movieId) => {
    return axios.get(`${baseURL}/movies/${movieId}`)
        .then(response => {return response.data})
        .catch(error => console.log(error));
}

export const addNewMovie = (title, image, content, year) => {
    axios.post(`${baseURL}/movies`,{
        title: title,
        image: image,
        content: content,
        productionYear: year
    }).then(response => {console.log(response)})
        .catch(error => {
            console.error("Error adding movie:", error);
            throw error;  // Rzuć błąd, aby obsłużyć go w komponencie
        });
}

export const deleteMovie = (movieId, token) => {
    axios.delete(`${baseURL}/movie/${movieId}`,{
        headers: {
            Authorization: `Bearer ${token}`
    }})
        .then(response => {console.log(response)})
        .catch(error => console.log(error))
}