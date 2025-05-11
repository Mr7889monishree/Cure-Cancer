//creating constant to hook the icons in the sidebar and other components
import {records,screening,user,apps} from  "../assets"

//array of navigation links like what all are in navbar as array of objects
//for the sidebar creating these to easily access in the component side
export const navLinks=[
    {
        name:'dashboard',
        imageUrl:apps,
        link:'/', //when i click on the icon where it should go that is link
    },
    {
        name:'records',
        imageUrl:records,
        link:'/medical-records',
    },
    {
        name:'screening',
        imageUrl:screening,
        link:'/screening-schedules',
    },
    {
        name:'profile',
        imageUrl:user,
        link:'/profile'
    }

]
