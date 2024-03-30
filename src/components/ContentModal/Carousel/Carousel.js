import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { img_300 } from '../../../config/config';
import 'react-alice-carousel/lib/alice-carousel.css';
import { unavailable,noPicture } from '../../../config/config';
import "./Carousel.css"
const handleDragStart = (e) => e.preventDefault();

const Carousel= ({media_type,id}) => {
   const [credits,setCredits] = useState();
 
   const items =credits?.map((c)=>(
    <div className='carouselItem'>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}`: unavailable}
        alt={c?.name}
        onDragStart={handleDragStart}
        className='carouselItem_img'
      ></img>
      <b className='carousel_txt'>{c?.name}</b>
    </div>
   ))
   const responsive = {
    0:{
      items:3,
    },
    512:{
      items:5,
    },
    1024:{
      items:7,
    },
   }

  const fetchCredits=async ()=>{
    const API_KEY='5a38c9aabebe47b32defbed338d1260f'
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    setCredits(data.cast)
  }
  useEffect(() => {
    fetchCredits()
  }, [])
  
  return (
    <AliceCarousel 
      autoPlay 
      responsive={responsive} 
      infinite 
      disableButtonsControls 
      disableDotsControls
      mouseTracking items={items} />
  );
}
export default Carousel