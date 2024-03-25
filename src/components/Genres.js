import axios from "axios";
import { Chip } from "@mui/material";
import { useEffect } from "react";
const API_KEY='5a38c9aabebe47b32defbed338d1260f';


const Genres=({
    selectedGenres,
    setSelectedGenres,
    genres,
    type,
    setPage,
    setGenres
})=>{

    const handleAdd=(genre)=>{
        setSelectedGenres( [...selectedGenres, genre]);
        setGenres(genres.filter((g)=>g.id !== genre.id))
        setPage(1);
    }
    const handleRemove =(genre)=>{
        setSelectedGenres(selectedGenres.filter((selected)=> selected.id !== genre.id))
        setGenres([...genres,genre]);
        setPage(1);
    }

    const fetchGenres=async () => {
        try{
      const {data} =await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`)
      setGenres(data.genres);
        }catch(error){
            console.error("errror",error)
        }

    }
    
    useEffect(()=>{
        fetchGenres();

        return()=>{
          setGenres([])
        }
    },[])


    return <div style={{padding:"6px 0"}}>
        {selectedGenres && selectedGenres.map((genre)=>(
            <Chip 
                label={genre.name}
                key={genre.id}
                style={{margin:2}}
                onDelete={()=>handleRemove(genre)}
                color="primary"
                clickable
               
             />
        ))}
        {genres && genres.map((genre)=>(
            <Chip 
                label={genre.name}
                key={genre.id}
                style={{margin:2}}
                clickable
                color="primary"
                variant="outlined"
                 onClick={()=> handleAdd(genre)}
             />
        ))}
    </div>
}
export default Genres