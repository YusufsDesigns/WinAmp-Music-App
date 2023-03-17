import { AiFillPlayCircle } from "react-icons/ai"
import heartIcon from '../assets/icons/heart-icon.png'
import checkIcon from '../assets/icons/check-icon.png'
import musicIcon from '../assets/icons/music-icon.png'
import youtubeIcon from '../assets/icons/youtube-icon.png'

export default function MusicCards(props){
    const musicCards = props.musicData.map(music => {
        return (
            <div key={music.id} className='flex flex-col font-lato text-grey cursor-pointer' onClick={() => {props.songClick(music.id)}}>
                <div className='w-36 md:w-52 flex-shrink-0 overlay relative'>
                    <img src={music.album.cover_medium} className='max-w-full h-auto rounded-lg' alt="" />
                    <AiFillPlayCircle className='text-3xl text-grey overlay-icon' />
                </div>
                <span className='text-sm md:font-bold md:text-2xl'>{music.title}</span>
                <span className='text-sm text-mid-grey'>{music.artist.name}</span>
            </div>
        )
    })

    const artistCards = props.musicData.map(artist => {
        return (
            <div key={artist.id} className='flex flex-col items-center space-y-2'>
                <div className='w-32 md:w-52 flex-shrink-0'>
                    <img src={artist.artist.picture_medium} className='max-w-full h-auto rounded-full' alt="" />
                </div>
                <span className='font-poppins text-grey text-center text-sm lg:text-lg'>{artist.artist.name}</span>
            </div>
        )
    })

    const albumCards = props.musicData.map(album => {
        return (
            <div key={album.id} className='flex flex-col items-center space-y-2'>
                <div className='w-32 md:w-52 flex-shrink-0'>
                    <img src={album.album.cover_medium} className='max-w-full h-auto rounded-lg' alt="" />
                </div>
                <span className='font-poppins text-grey text-center text-sm lg:text-lg'>{album.album.title}</span>
            </div>
        )
    })

    return(
        <>
            <div className='flex flex-col justify-between w-full p-7 text-grey rounded-lg mb-4 bg'>
                <div className='flex justify-between items-center'>
                    <span className='font-lato'>TOP ARTISTS</span>
                    <img src={heartIcon} alt="" />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center space-x-3 mb-3'>
                        <span className='font-poppins text-4xl font-semibold'>AYRA STARR</span>
                        <img src={checkIcon} alt="" />
                    </div>
                    <div className='flex items-center space-x-3 mb-7'>
                        <img src={musicIcon} alt="" />
                        <span className='font-lato'>1.5million monthly  listeners</span>
                    </div>
                    <div className='flex items-center p-3 space-x-3 bg-white text-black rounded-lg'>
                        <img src={youtubeIcon} alt="" />
                        <span>Listen Now</span>
                    </div>
                </div>
            </div>
            <div className='space-y-2 mb-4'>
                <span className='font-poppins font-bold text-2xl text-grey'>Songs</span>
                <div className='flex flex-nowrap overflow-x-scroll space-x-5'>
                    {musicCards}
                </div>
            </div>
            <div className='space-y-2 mb-4 lg:hidden'>
                <span className='font-poppins font-bold text-2xl text-grey'>Albums</span>
                <div className='flex flex-nowrap overflow-x-scroll space-x-5'>
                    {albumCards}
                </div>
            </div>
            <div className='space-y-2 mb-4'>
                <span className='font-poppins font-bold text-2xl text-grey'>Artists</span>
                <div className='flex flex-nowrap overflow-x-scroll space-x-5'>
                    {artistCards}
                </div>
            </div>
        </>
    )
}