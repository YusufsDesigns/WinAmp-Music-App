import { useState, useEffect, useRef } from 'react'
import './index.css'
import axios from 'axios'
import { CiMenuFries } from 'react-icons/ci'
import Loader from './components/Loader'
import MusicCards from './components/MusicCards'
import MusicSearch from './components/MusicSearch'
import Menu from './components/Menu'
import Sidebar from './components/SideBar'
import AudioPlayer from './components/AudioPlayer'
import bellIcon from './assets/icons/bell-icon.png'
import profileImg from './assets/icons/profile-img.png'
import arrowDown from './assets/icons/arrow-down-icon.png'
import searchIcon from './assets/icons/search-icon.png'


function App() {
  const audioRef = useRef();
  const [musicData, setMusicData] = useState()
  const [initialPage, setInitialPage] = useState(false)
  const [formData, setFormData] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [musicSearchData, setMusicSearchData] = useState()
  const [musicSearched, setMusicSearched] = useState(false)
  const [menu, setMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '508af0ffaemsh56f037494935f2ep1d647djsn51aeb521beb8',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.get('https://deezerdevs-deezer.p.rapidapi.com/search?q="pop"', options);
        console.log(response.data.data);
        const musicArray = response.data.data.map(data => {
        return {
          id: data.id,
          album: data.album,
          artist: data.artist,
          song: data.preview,
          title: data.title_short,
          isPlayed: false,
          isDownloaded: false
        }
      })
      console.log(musicArray);
      setMusicData(musicArray);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className='bg-mid-black h-screen w-full flex items-center justify-center'><div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div> ;
  }

  if (error) {
    return <div className='flex flex-col space-y-2 items-center justify-center bg-mid-black w-full h-screen text-white font-poppins'>
      <span>Something went wrong. Please reload</span>
      <button className='bg-red text-white py-2 px-5 rounded' onClick={reload}>Reload</button>
    </div>;
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    setMusicSearched(true)
    setIsLoading(true)
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '508af0ffaemsh56f037494935f2ep1d647djsn51aeb521beb8',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${formData}`, options);
        console.log(response.data.data);
        const musicArray = response.data.data.map(data => {
        return {
          id: data.id,
          album: data.album,
          artist: data.artist,
          song: data.preview,
          title: data.title_short,
          isPlayed: false,
          isDownloaded: false
        }
      })
      console.log(musicArray);
      setMusicSearchData(musicArray);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
  }

  // if (searchIsLoading) {
  //   return <div className='flex items-center justify-center bg-mid-black w-full h-screen text-red font-poppins'>Loading...</div>;
  // }

  // if (searchError) {
  //   return <div className='flex items-center justify-center bg-mid-black w-full h-screen text-red font-poppins'>Oops! Something went wrong.</div>;
  // }

  function handlePlay(){
    audioRef.current.play()
    setIsPlaying(true)
  }

  function handlePause(){
      audioRef.current.pause()
      setIsPlaying(false)
  }

  function songClick(id){
    let index = musicData.findIndex(music => music.id == id)
    setCurrentTrackIndex(index)
    handlePlay()
  }

  function searchedSongClick(id){
    let index = musicSearchData.findIndex(music => music.id == id)
    setCurrentTrackIndex(index)
    handlePlay()
  }

  function reload(){
    window.location.reload()
  }

  const handleDownloadClick = (id, src, title) => {
    const link = document.createElement("a");
    link.href = src
    link.download = title
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    props.setData(prevData => prevData.map(data => {
        if(data.id == id){
            return {
                ...data,
                isDownloaded: true
            }
        } else{
            return {...data}
        }
    }))
};

  function handleMenu(){
    setMenu(prevMenu => !prevMenu)
  }

  return (
    <div className="App bg-mid-black min-h-screen">
      {!initialPage ? 
      <Loader setInitial={setInitialPage} />
      :
      <div className='flex w-full'>
        <Menu menu={menu} />
        {!musicSearched && <div className='px-5 lg:px-2.5 overflow-y-scroll h-screen full sixty-five'>
          <nav className='py-9 flex items-center justify-between'>
            <form className="bg-dark-grey py-3 px-5 flex items-center rounded-md space-x-5 w-3/4 lg:w-2/5" onSubmit={handleSubmit}>
              <img src={searchIcon} alt="" />
              <input
                  type="text" 
                  name="name" 
                  value={formData} 
                  placeholder="Search artists, songs, podcasts..."
                  onChange={(event) => setFormData(event.target.value)}
                  className='border-none bg-dark-grey outline-none w-full text-grey font-poppins placeholder:font-poppins placeholder:text-mid-grey'
              />
            </form>
            <div className='items-center space-x-3 text-grey hidden lg:flex'>
              <img src={bellIcon} alt="" />
              <span>WakaWaka Boy</span>
              <img src={profileImg} className='w-12 h-12' alt="" />
              <img src={arrowDown} alt="" />
            </div>
            <CiMenuFries className='text-white text-2xl z-20 lg:hidden' onClick={handleMenu} />
          </nav>
          <MusicCards 
            musicData={musicData} 
            songClick={songClick}
          />
        </div>}
        {!musicSearched && <Sidebar musicData={musicData} handleDownloadClick={handleDownloadClick} />}
        {musicSearched && 
          <MusicSearch musicData={musicSearchData} songClick={searchedSongClick} name={formData.name} handleDownloadClick={handleDownloadClick} reload={reload} />}
        {!musicSearched && 
          <AudioPlayer 
            data={musicData} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            handlePlay={handlePlay}
            handlePause={handlePause}
            audioRef={audioRef}
        />}
        {musicSearched && 
          <AudioPlayer 
            data={musicSearchData} 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            handlePlay={handlePlay}
            handlePause={handlePause}
            audioRef={audioRef}
        />}
      </div>
      }
    </div>
  )
}

export default App
