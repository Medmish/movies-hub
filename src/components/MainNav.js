import * as React from 'react';
import { useEffect } from 'react';
import {  useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SimpleBottomNavigation() {
   
    const [value, setValue] = React.useState(0);
    const navigate=useNavigate();

    useEffect(()=>{
      if (value===0) navigate("/")
      else if(value===1) navigate("/movies");
      else if(value===2) navigate("/series");
      else if(value===3) navigate("/watchlist");
      
    },[value]);

  return (
    <Box sx={{ 
        width:"100%",
        position:"fixed",
        bottom:0,
        zIndex:100,
     }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ backgroundColor:"black" ,opacity:0.7 }}
      >
        <BottomNavigationAction style={{color: value === 0 ? "#a4aeeb" : "white"}} label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{color: value === 1 ? "#a4aeeb" : "white"}} label="Movies" icon={<MovieCreationIcon />} />
                <BottomNavigationAction style={{color: value === 2 ? "#a4aeeb" : "white"}} label="T.V series" icon={<TvIcon />} />
                <BottomNavigationAction style={{color: value === 3 ? "#a4aeeb" : "white"}} label="WatchList" icon={<FavoriteIcon/>} />

      </BottomNavigation>
    </Box>
  );
}