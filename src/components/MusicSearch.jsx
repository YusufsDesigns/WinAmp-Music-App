import { HiDownload } from "react-icons/hi"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AiFillCloseCircle } from "react-icons/ai"

export default function MusicSearch(props){
    const musicElement = props.musicData.map(music => {
        return(
            <div key={music.id} onClick={() => {props.songClick(music.id)}} className='px-3 sm:px-10 flex items-center justify-between cursor-pointer py-2 hover:bg-hover-grey'>
                <div className="flex items-center">
                    <img src={music.album.cover_small} alt="" className=" rounded-md" />
                    <div className="text-grey text-sm font-poppins ml-4 flex flex-col">
                        <span className='font-semibold'>{music.title}</span>
                        <span className='font-light'>{music.artist.name}</span>
                    </div>
                </div>
                <div className="flex items-center md:space-x-36 lg:space-x-80">
                    <span className="text-grey text-sm font-poppins hidden md:block">{music.album.title}</span>
                    <div className="space-x-2 flex items-center">
                        <HiDownload className="text-xl text-grey" 
                        onClick={props.handleDownloadClick(music.id, music.song, music.title)}
                        />
                        <BiDotsVerticalRounded className="text-xl text-grey"  />
                    </div>
                </div>
            </div>
            
        )
    })

    return(
        <div className="h-screen overflow-y-scroll bg-gradient-8 relative w-full lg:eightyFive">
            <img src={props.musicData[1].artist.picture_xl} className='h-80 w-full object-cover' alt="" />
            <div className="space-y-5 py-10">
                {musicElement}
            </div>
            <AiFillCloseCircle className="absolute top-3 right-3 text-4xl text-grey cursor-pointer" onClick= {props.reload} />
        </div>
    )
}