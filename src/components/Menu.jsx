import Logo from '../assets/logo.png'
import radioIcon from '../assets/icons/radio-icon.png'
import podcastIcon from '../assets/icons/podcast-icon.png'
import playlistIcon from '../assets/icons/playlist-icon.png'
import heartIcon from '../assets/icons/heart-icon.png'
import libraryIcon from '../assets/icons/library-icon.png'
import addIcon from '../assets/icons/add-icon.png'
import logoutIcon from '../assets/icons/logout-icon.png'

export default function Menu(props){
    return(
        <div className='flex flex-col space-y-12 overflow-y-scroll py-8 text-grey font-poppins lg:opacity-60 absolute bg-mid-black top-0 left-0 full z-10 lg:relative lg:fifteen' style={props.menu ? {display: 'flex'} : {display: "none"}}>
            <img src={Logo} className='w-9 h-14 self-center' alt="" />
            <div className='space-y-4'>
                <span className='text-grey text-base font-medium px-10'>MENU</span>
                <ul className='space-y-4'>
                    <li className='flex space-x-3 items-center py-2 px-10 current'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className='text-base font-normal'>Home</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={radioIcon} alt="" />
                        <span className='text-base font-normal'>Explore</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={podcastIcon} alt="" />
                        <span className='text-base font-normal'>Podcasts</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={playlistIcon} alt="" />
                        <span className='text-base font-normal'>Playlist</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={heartIcon} alt="" />
                        <span className='text-base font-normal'>Favourites</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={libraryIcon} alt="" />
                        <span className='text-base font-normal'>Library</span>
                    </li>
                </ul>
            </div>
            <div className='space-y-4'>
                <span className='text-grey text-base font-medium px-10'>PLAYLIST</span>
                <ul className='space-y-4'>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={playlistIcon} alt="" />
                        <span className='text-base font-normal'>Traffic Vibez</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={playlistIcon} alt="" />
                        <span className='text-base font-normal'>Work</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={playlistIcon} alt="" />
                        <span className='text-base font-normal'>Soft Gbedu</span>
                    </li>
                    <li className='flex space-x-3 items-center px-10'>
                        <img src={addIcon} alt="" />
                        <span className='text-base font-normal'>Add playlist</span>
                    </li>
                </ul>
            </div>
            <div className='flex space-x-3 items-center px-10'>
                <img src={logoutIcon} alt="" />
                <span className='text-base font-normal'>Logout</span>
            </div>
        </div>
    )
}