import { use, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const api_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
  const api_series = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`

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


  return (
    <>
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
                  <li className={`fi fi-${movie.original_language === "en" ? "gb" : movie.original_language === "ja" ? "jp" : movie.original_language === "zh" ? "cn" : movie.original_language === "ko" ? "kr" : movie.original_language === "el" ? "gr" : movie.original_language}`}></li>
                  <li>{movie.vote_average}</li>
                </ul>
              ))
            }
            <hr />
            {
              seriesSearched.map((series) => (
                <ul key={series.id}>
                  <li>{series.original_name}</li>
                  <li>{series.name}</li>
                  <li className={`fi fi-${series.original_language === "en" ? "gb" : series.original_language === "ja" ? "jp" : series.original_language === "zh" ? "cn" : series.original_language === "ko" ? "kr" : series.original_language === "el" ? "gr" : series.original_language}`}></li>
                  <li>{series.vote_average}</li>
                </ul>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
