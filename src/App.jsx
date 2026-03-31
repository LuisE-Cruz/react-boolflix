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
    <>
      <div className='container'>
        <div className='row bg-dark text-white'>
          <div className='col-9'>
            <img className='mt-1 mb-1' src="https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" alt="Logo Boolfix" />
          </div>
          <div className='col-3'>
            <div className="input-group mb-3 mt-3">
              <button className="btn btn-outline-secondary text-white" type="button" id="button-addon1" onClick={searchMovies}>Button</button>
              <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={e => setSearchValue(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='container bg-dark'>
        <div className='row row-cols-1 row-cols-md-3 row-cols-lg-5 text-white' >
          {

            movieSearched.map((movie) => (
              <div className='col my-3' key={movie.id} id='hover_movies'>
                <img className='img-fluid' id='movie_display' src={movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : 'https://placehold.co/342x513/png?text=Poster+Non+Disponibile'} alt={movie.original_title} />
                <div id='movie_overview'>
                  <h2>{movie.original_title}</h2>
                  <h3>{movie.title}</h3>
                  <div className={`fi fi-${ogLanguageToFlag[movie.original_language] || movie.original_language}`}></div>
                  <div>Voto: {starsVote(movie.vote_average)}</div>
                  <div><strong>Overview</strong>:{movie.overview}</div>
                </div>
              </div>
            ))
          }
          {
            seriesSearched.map((series) => (
              <div className='col my-3' key={series.id} id='hover_series'>
                <img className='img-fluid' id='series_display' src={series.poster_path ? `https://image.tmdb.org/t/p/w342/${series.poster_path}` : 'https://placehold.co/342x513/png?text=Poster+Non+Disponibile'} alt={series.original_name} />
                <div id='series_overview'>
                  <h1>{series.original_name}</h1>
                  <h2>{series.name}</h2>
                  <div className={`fi fi-${ogLanguageToFlag[series.original_language] || series.original_language}`}></div>
                  <div>Voto: {starsVote(series.vote_average)}</div>
                  <div><strong>Overview</strong>:{series.overview}</div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default App
