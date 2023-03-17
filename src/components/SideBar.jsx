import { HiDownload } from "react-icons/hi"
import { BsCheckLg } from "react-icons/bs"
import { BiDotsVerticalRounded } from "react-icons/bi"

export default function SideBar(props){
    const musicElements = props.musicData.map(music => {
        return (
            <div key={music.id} className="px-4 flex items-center justify-between hover:bg-hover-grey py-2">
                <div className="flex items-center space-x-2">
                    <img src={music.album.cover_small} className='w-8 h-8 object-cover rounded' alt="" />
                    <div className="flex flex-col text-grey text-dot whitespace-nowrap overflow-hidden w-24">
                        <span className="text-xs font-semibold font-lato">{music.title}</span>
                        <span className="small">{music.artist.name}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    {!props.isDownloaded ? 
                    <HiDownload 
                        className="text-grey text-xl cursor-pointer" 
                        onClick={() => {props.handleDownloadClick(music.id, music.song, music.title)}} /> 
                    : 
                    <BsCheckLg className="text-grey text-xl" />}
                    <BiDotsVerticalRounded className="text-grey text-xl" />
                </div>
            </div>
        )
    })
    return(
        <div className="w-1/5 py-9 bg-black overflow-y-scroll h-screen overflow-hidden hidden lg:block twenty">
            <h3 className="font-poppins font-bold text-2xl text-grey px-4 mb-6">Hotlist</h3>
            <span className="font-poppins text-grey font-medium px-4">Trending Songs</span>
            <div className="overflow-y-scroll mt-5 space-y-3">
                {musicElements}
            </div>
        </div>
    )
}