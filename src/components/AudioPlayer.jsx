import { useState } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaVolumeDown, FaRandom } from "react-icons/fa";
import { BsRepeat } from "react-icons/bs"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import prevIcon from '../assets/icons/prev-icon.png'
import nextIcon from '../assets/icons/next-icon.png'

export default function AudioPlayer(props){
    const [volume, setVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [track, setTrack] = useState(props.data)
    const [random, setRandom] = useState(false)
    const [isRepeating, setIsRepeating] = useState(false)
    

    function playRandom(){
        setRandom(true)
    }

    function pauseRandom(){
        setRandom(false)
    }

    function repeatSong(){
        setIsRepeating(prevState => !prevState)
    }

    function handleNext() {
        props.setIsPlaying(true)
        if(props.currentTrackIndex < track.length && random == false){
            props.setCurrentTrackIndex(props.currentTrackIndex + 1)
        } else if(props.currentTrackIndex < track.length && random == true){
            props.setCurrentTrackIndex(parseInt(Math.random() * track.length))
        } else {
            props.setCurrentTrackIndex(0)
        }
    }

    function handlePrev() {
        props.setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? track.length - 1 : prevIndex - 1
        );
    }

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        props.audioRef.current.volume = event.target.value;
    };

    const volumeMute = () => {
        setVolume(0)
    }

    const handleSeek = (event) => {
        const currentTime = parseFloat(event.target.value);
        setCurrentTime(currentTime)
        props.audioRef.current.currentTime = currentTime;
    };

    
        const handleTimeUpdate = () => {
        setCurrentTime(props.audioRef.current.currentTime);
    };

    return(
        <div className="absolute flex items-center justify-between space-x-3 md:border-t-2 md:border-solid border-none md:border-t-mid-grey bg-light-black bottom-0 w-full py-3 px-2 sm:px-4 md:py-5 lg:px-11">
            <audio
                ref={props.audioRef}
                src={track[props.currentTrackIndex].song}
                onEnded={handleNext}
                autoPlay={props.isPlaying}
                volume={volume}
                onTimeUpdate={handleTimeUpdate}
                loop={isRepeating}
            />
            <div className='flex items-center space-x-2'>
                <img src={track[props.currentTrackIndex].album.cover_medium} className='rounded-lg w-14 h-14 xl:w-20 xl:h-20' alt="" />
                <div className='flex flex-col text-grey font-lato text-dot whitespace-nowrap overflow-hidden w-16 sm:w-28'>
                    <span className='font-extrabold text-sm xl:text-base'>{track[props.currentTrackIndex].title}</span>
                    <span className='text-xs xl:text-sm font-medium'>{track[props.currentTrackIndex].artist.name}</span>
                </div>
            </div>
            <div className='space-y-5 flex flex-col items-center'>
                <div class="flex items-center space-x-5 md:space-x-16">
                    <div className='cursor-pointer' onClick={!random ? playRandom : pauseRandom}>
                        <FaRandom className='text-grey text-sm sm:text-lg lg:text-2xl' style={random ? {color: '#A22E20'} : ''}/>
                    </div>
                    <div className='cursor-pointer' onClick={handlePrev}>
                        <BiSkipPrevious className='text-grey text-xl lg:text-5xl' />
                    </div>
                    {<div className='cursor-pointer bg-grey rounded-full p-1.5 sm:p-3 lg:p-5'>
                        {props.isPlaying ? 
                            <FaPause className='text-red text-xs' onClick={props.handlePause}/>
                            :
                            <FaPlay className='text-red text-xs' onClick={props.handlePlay}/>
                        }
                    </div>}
                    <div className='cursor-pointer' onClick={handleNext}>
                        <BiSkipNext className='text-grey text-xl lg:text-5xl' />
                    </div>
                    <div className='cursor-pointer' onClick={repeatSong}>
                        <BsRepeat className='text-grey text-sm sm:text-lg lg:text-2xl' style={isRepeating ? {color: '#A22E20'} : ''} />
                    </div>
                </div>
                <div class='flex items-center text-grey font-poppins space-x-2 '>
                    <div class="hidden md:block current-time">00:{parseInt(currentTime)}</div>
                    <div className='absolute top-0 right-0 w-full  md:relative'>
                        <div className='relative bg-grey rounded  seek-slider'>
                            <input 
                                type="range" 
                                min={0}
                                max={props.audioRef.current?.duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className='w-full absolute rounded cursor-grab active:cursor-grabbing'
                            />
                            <div className='absolute top-0 left-0 h-full bg-red' style={{width: (currentTime * 10) / (props.audioRef.current?.duration / 10)  + '%'}}></div>
                            <div className='w-3 h-3 bg-red absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block' style={{left: (currentTime * 10) / (props.audioRef.current?.duration / 10)  + '%'}}></div>
                        </div>
                    </div>
                    
                    <div class=" hidden md:block total-duration">00:{parseInt(props.audioRef.current?.duration)}</div>
                </div>
            </div>
            <div className='items-center self-start space-x-2 text-grey cursor-pointer hidden md:flex'>
                {volume > 0 ? <FaVolumeUp onClick={volumeMute} /> : <FaVolumeMute />}
                <div className='relative  bg-grey rounded volume-slider'>
                    <input 
                        type="range" 
                        min={0} 
                        max={1} 
                        step={0.1}
                        value={volume}
                        onChange={handleVolumeChange} 
                        className='w-full absolute rounded cursor-grab active:cursor-grabbing' 
                    />
                    <div className='absolute top-0 left-0 h-full w-2/5 bg-red' style={{width: volume * 100 + '%'}}></div>
                    <div className='w-3 h-3 bg-red absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' style={{left: volume * 100 + '%'}}></div>
                </div>
            </div>
        </div>
    )
}