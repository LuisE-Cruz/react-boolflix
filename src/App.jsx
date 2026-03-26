import { useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`

  const [searchValue, setSearchValue] = useState('')
  const [movieSearched, setMovieSearched] = useState([])

  function searchMovies(e) {
    e.preventDefault()
    axios.get(`${api_url}&query=${searchValue}`)
      .then(response => {
        setMovieSearched(response.data.results)
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
            <div>
              {

                movieSearched.map((movie) => (
                  <ul key={movie.id}>
                    <li>{movie.title}</li>
                    <li>{movie.original_title}</li>
                    <li className={`fi fi-${movie.original_language === "en" ? "gb" : movie.original_language === "ja" ? "jp" : movie.original_language === "zh" ? "cn" : movie.original_language}`}></li>
                    <li>{movie.vote_average}</li>
                  </ul>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
