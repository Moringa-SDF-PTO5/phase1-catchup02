const API_KEY = "6be093a1a0f961d1b8df3150cdc2eae9";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmUwOTNhMWEwZjk2MWQxYjhkZjMxNTBjZGMyZWFlOSIsInN1YiI6IjYxMzdjMTM5MWI3Mjk0MDA2NTAwNjUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZtGZOAxS3ymCmfXGDuFGw_-WDZfNiKIrcY6d3OXHrvQ";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE = "https://image.tmdb.org/t/p/original";
const REQUEST_HEADER = {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "Accept": "application/json"
}

// UI elements
const container = document.querySelector("#content-container");

const getMovies = () => {
    const path = "/discover/movie"
    fetch(`${BASE_URL}${path}`, {
        headers: REQUEST_HEADER
    })
    .then((response) => response.json())
    .then((body) => {
        const results = body.results;
        let resultsChildren = "";
        for(result of results){
            const element = createItemUI(
                BASE_IMAGE + result.poster_path,
                result.title,
                result.overview
            )
            resultsChildren = resultsChildren + element
        }
        container.innerHTML = resultsChildren;
    });
}

const getTvShows = () => {
    const path = "/discover/tv"
    fetch(`${BASE_URL}${path}`, {
        headers: REQUEST_HEADER
    })
    .then((response) => response.json())
    .then((body) => {
        // TODO: Complete TV Shows Section
        container.innerHTML = '<p>You are in the TV page</p>'
    });
}

const createItemUI = (poster, title, description) => {
    return `
    <div class="col-3 p-2">
        <div class="card" style="width: 18rem;">
            <img src="${poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>
    </div>
    `;
}

const selectMenuItem = (item) => {
    if(item == "movies"){
        getMovies()
    }else{
        getTvShows()
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getMovies()
})