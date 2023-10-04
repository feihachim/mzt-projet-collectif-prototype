"use strict";

let genres;
let genreButtons;
let movieList;
let movieListFiltered;

const body=document.querySelector("body");

function createCloudButton(genre){
    const buttonEl=document.createElement("button");
    buttonEl.classList.add("movie-genre");
    buttonEl.textContent=genre;
    body.appendChild(buttonEl);
    // return buttonEl;
}

function createCard(movie){
    const article=document.createElement("article");
    const h3=document.createElement("h3");
    const pEl=document.createElement("p");
    const imgEl=document.createElement("img");
    h3.textContent=movie.title;
    article.appendChild(h3);
    pEl.textContent=movie.plot;
    article.appendChild(pEl);
    imgEl.src=movie.posterUrl;
    article.appendChild(imgEl);
    body.appendChild(article);
}

let xhr = new XMLHttpRequest();
xhr.open("GET",'./data/db.json');
xhr.responseType = 'json';
xhr.send();

xhr.onload = function(){
  if(xhr.status != 200){
    alert(`Error ${xhr.status}:${xhr.statusText}`);
  }
  else{
    movieList=xhr.response.movies;
    movieListFiltered=movieList;
    genres=xhr.response.genres;
    console.log(genres);
    genres.map(genre=>createCloudButton(genre));
    genreButtons=document.querySelectorAll(".movie-genre");
    [...genreButtons].forEach(element=>{
        element.addEventListener("click",(e)=>{
            movieListFiltered=movieListFiltered.filter(movie=>movie.genres.includes(element.textContent));
            console.log(movieListFiltered);
            movieListFiltered.map(movie=>createCard(movie));
        })
    })
  }
};

xhr.onerror = function(){
  alert('Request fauled!');
};

