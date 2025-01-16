import { MdHome } from 'react-icons/md'
import { BiSolidMovie } from 'react-icons/bi'
import { PiTelevision } from 'react-icons/pi'
import { IoSearchOutline } from 'react-icons/io5'

export const navigation = [
    {
        label: 'TV Shows',
        href: 'tv',
        icon: <PiTelevision/>
    },
    {
        label: 'Movies',
        href: 'movie',
        icon: <BiSolidMovie/>
    },
]
 export const mobileNavigation = [
    {
        label: 'Home',
        href: '/',
        icon: <MdHome/>
    },
    ...navigation,
    {
        label:'Search',
        href: '/search',
        icon: <IoSearchOutline/>
    }
]