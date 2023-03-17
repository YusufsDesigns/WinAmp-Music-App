import { useState, useEffect, useRef } from 'react'
import './index.css'
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
  const [formData, setFormData] = useState({name: ""})
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [musicSearchData, setMusicSearchData] = useState()
  const [musicSearched, setMusicSearched] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    async function getMusicData(){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '508af0ffaemsh56f037494935f2ep1d647djsn51aeb521beb8',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q='pop'`, options)
      const result = await res.json()
      const musicArray = []
      result.data.forEach(data => {
        musicArray.push({
          id: data.id,
          album: data.album,
          artist: data.artist,
          song: data.preview,
          title: data.title_short,
          isPlayed: false,
          isDownloaded: false
        })
      })
      console.log(musicArray);
      setMusicData(musicArray);
    }
    
    getMusicData()

    return () => {

    }


}, [])

  function handleChange(event){
    setFormData({[event.target.name]: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    setMusicSearched(true)
  }

  useEffect(() => {
    async function getMusicData(){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '508af0ffaemsh56f037494935f2ep1d647djsn51aeb521beb8',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q='${formData.name}`, options)
      const result = await res.json()
      const musicArray = []
      result.data.forEach(data => {
        musicArray.push({
          id: data.id,
          album: data.album,
          artist: data.artist,
          song: data.preview,
          title: data.title_short,
          isPlayed: false,
          isDownloaded: false
        })
      })
      setMusicSearchData(musicArray);
    }
    
    getMusicData()

    return () => {

    }


}, [formData.name])

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

  function openInitialPage(){
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
        {!musicSearched && <div className='px-5 lg:px-2.5 overflow-y-scroll h-screen w-full full lg:sixty-five'>
          <nav className='py-9 flex items-center justify-between'>
            <form className="bg-dark-grey py-3 px-5 flex items-center rounded-md space-x-5 w-3/4" onSubmit={handleSubmit}>
              <img src={searchIcon} alt="" />
              <input
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  placeholder="Search artists, songs, podcasts..."
                  onChange={handleChange}
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
          <MusicSearch musicData={musicSearchData} songClick={searchedSongClick} name={formData.name} handleDownloadClick={handleDownloadClick} reload={openInitialPage} />}
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
