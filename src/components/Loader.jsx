import { useEffect } from 'react'
import '../index.css'
import Logo from '../assets/logo.png'



export default function Loader(props) {
    useEffect(() => {
        setTimeout(() => {
            props.setInitial(true)
        }, 4000)
    }, [])

    return(
        <div className='bg-mid-black w-full h-screen flex items-center justify-center animate'>
            <img src={Logo} alt="" />
        </div>
    )
}


