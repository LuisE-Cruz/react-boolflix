import { useState } from 'react'
import './App.css'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

const api_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
const api_series = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`

const ogLanguageToFlag = {
  en: "gb",
  ja: "jp",
  zh: "cn",
  ko: "kr",
  el: "gr",
}

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [movieSearched, setMovieSearched] = useState([])
  const [seriesSearched, setSeriesSearched] = useState([])

  function searchMovies(e) {
    e.preventDefault()
    axios.get(`${api_movies}&query=${searchValue}`)
      .then(response => {
        setMovieSearched(response.data.results)
      })
    axios.get(`${api_series}&query=${searchValue}`)
      .then(response => {
        setSeriesSearched(response.data.results)
      })
  }

  const starsVote = (vote) => {
    const averageVote = Math.ceil(vote / 2);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= averageVote) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>)
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>)
      }
    }
    return stars;
  }


  return (

    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <div className="input-group mb-3 mt-3">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={searchMovies}>Button</button>
            <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={e => setSearchValue(e.target.value)} />
          </div>
          {

            movieSearched.map((movie) => (
              <ul key={movie.id}>
                <li>{movie.original_title}</li>
                <li>{movie.title}</li>
                <li><img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.original_title} /></li>
                <li className={`fi fi-${ogLanguageToFlag[movie.original_language] || movie.original_language}`}></li>
                <li>{starsVote(movie.vote_average)}</li>
              </ul>
            ))
          }
          <hr />
          {
            seriesSearched.map((series) => (
              <ul key={series.id}>
                <li>{series.original_name}</li>
                <li>{series.name}</li>
                <li><img src={`https://image.tmdb.org/t/p/w342/${series.poster_path}`} alt={series.original_title} /></li>
                <li className={`fi fi-${ogLanguageToFlag[series.original_language] || series.original_language}`}></li>
                <li>{starsVote(series.vote_average)}</li>
              </ul>
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default App
