import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import Carousel from "./Carousel/Carousel"
import './ContentModal.css';
import { img_500,unavailable,unavailableLandscape} from "../../config/config"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useState ,useEffect} from 'react';
// import { unavailable } from '../../config/config';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display:"flex",
  alignItems:"center",
  transform: 'translate(-50%, -50%)',
  width: "75%",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  border: '2px solid',
  boxShadow: 10,
  color:"white",
  p: 4,
};

export default function ContentModal({children,media_type,id, }) {
    const API_KEY='5a38c9aabebe47b32defbed338d1260f'
  const [open, setOpen] = React.useState(false);
  const [content,setContent]=useState();
  const [video,setVideo]=useState();

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  
  const fetchData=async()=>{
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setContent(data); // Use optional chaining to handle potential absence of results
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    // const {data} =await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`)
    // setContent(data)  
    

  const fetchVideo=async()=>{ 
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);  // Use optional chaining to handle potential absence of results
      } catch (error) {
        console.error('Error fetching video:', error);
        // Optionally display a message or disable the trailer button
      }
    };
         
useEffect(()=>{
    fetchData()
    fetchVideo()
},[])

  return (
    <>
      <div onClick={handleOpen} className='media'>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
           {content && (
            <Box sx={style}>
            <div className='ContentModal'>
             <img 
                alt={content.name || content.title} 
                className='ContentModal_portrait'
                src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable}>
            </img>
                
                <img 
                alt={content.name || content.title} 
                className='ContentModal_landscape'
                src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:  unavailable}>
               </img>

               <div className='ContentModal_about'>
                <div className='ContentModal_title'>
                    {content.name || content.title} (
                        {(content.first_air_date || 
                            content.release_date||
                             "-----").substring(0,4)}
                    )
                </div>
                 <div className='ContentModal_description'>
                    {content.overview}
                 </div>
                 <div>
                    <Carousel media_type={media_type} id={id}/>
                 </div>
                 <Button
                   variant='contained'
                   startIcon={<YouTubeIcon />}
                   color="secondary"
                   href={`https://www.youtube.com/watch?v=${video}`}
                    >Watch the Trailer
                </Button>
             </div>
                
            </div>
          </Box> )}
         </Fade>
      </Modal>
    </>
  );
}
