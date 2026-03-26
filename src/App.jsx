import './App.css'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=matrix`

  console.log(API_KEY);
  console.log(api_url);


  return (
    <>

    </>
  )
}

export default App
