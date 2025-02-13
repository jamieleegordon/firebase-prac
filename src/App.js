import { useEffect, useState } from 'react';
import './App.css'
import { Auth } from './components/auth';
import { auth, db } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {

  const [movieList, setMovieList] = useState([])

  //New Movie states
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false)

  //Update title state
  const [updatedTitle, setUpdatedTitle] = useState("")

  const movieCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef)
      // Grab only the data in the collection
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id}
      ))
      setMovieList(filteredData)
      // console.log(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle})
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try {
        await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser.uid
      })

      getMovieList()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Auth/>

      <div>
        <input
          placeholder='Movie Title'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder='Release Date'
          type='number'
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type='checkbox'
          checked = {isNewMovieOscar}
          onChange={(e) => setisNewMovieOscar(e.target.checked)}
        />
        <label>Recieved an oscar</label>

        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style = {{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>

            <input
              placeholder = "new title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>

      

    </div>
  );
}

export default App;
