import React, { useState } from 'react'
import { navLinks } from '../Constants'
import {sun} from '../assets'; //for light and dark mode change 
import { useNavigate,Link} from 'react-router-dom';
import { IconHeartHandshake } from '@tabler/icons-react';

{/**Sidebar Component Page */}
//For each icon styles and functionality of look
const Icon = ({ name, imageUrl, isActive, handleClick }) => {
  return (
    <div 
      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 
      ${isActive === name ? 'bg-[#2c2f32]' : 'hover:bg-[#242424]'}`}
      onClick={handleClick}>
      <img 
        src={imageUrl} 
        alt={name} 
        className={`h-8 w-8 transition-all duration-300 ${isActive !== name ? 'opacity-70' : ''}`} 
      />
    </div>
  );
};



const Sidebar=()=>{
  const navigate = useNavigate()//managing active navigation item
  const [isActive,setIsActive] = useState("dashboard") //by default will have dashboard only in the start of the app
  return(
    <div className="sticky top-12 flex h-[92vh] flex-col  items-center justify-between">
      {/**link to navigate to home page**/}
      <Link to='/'><div className="rounded-[10px] bg-[#2c2f32] p-3">
      <IconHeartHandshake size={40} color="#1ec070"/>
      </div>
      </Link>
      {/**main navigation area for the sidebar */}
      <div className='mt-10 flex w-[80px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-6'>
  <div className='flex flex-col items-center justify-start gap-10 mt-2.5'>
    {/** map function to loop through all navLinks **/}
    {navLinks.map((link) => (
      <Icon 
        key={link.name} // makes each icon unique like index in loop
        {...link}
        isActive={isActive}
        handleClick={() => {
          setIsActive(link.name);
          navigate(link.link); // navigate to the corresponding link that's in navLink in index.js file
        }}
      />
    ))}
  </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imageUrl={sun}/>

      </div>
    </div>
  )
}

export default Sidebar