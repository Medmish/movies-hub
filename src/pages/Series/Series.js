import axios from "axios";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useEffect, useState } from "react";
import useGenres from "../../hooks/useGenres";

const Series=({searchTerm})=>{
    
    const[page,setPage]=useState(1)
    const[content,setContent]=useState([]);
    const[numOfPages,setNumOfPages]=useState();
    const[selectedGenres,setSelectedGenres]=useState([])
    const[genres,setGenres]=useState([])
    const genreforURL=useGenres(selectedGenres)

    const API_KEY='5a38c9aabebe47b32defbed338d1260f'
    const fetchSeries=async()=>{
       const {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreforURL}`)
       
       setContent(data.results)
       setNumOfPages(data.total_pages)
       
    }
    const fetchSearchResults = async () => {
      try {
          const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${page}`);
          setContent(data.results);
          setNumOfPages(data.total_pages);
      } catch (error) {
          console.error('Error fetching search results for TV series:', error);
      }
  };
  
    useEffect(() => {
      window.scroll(0, 0);  
      if (searchTerm.trim() === '') {
          fetchSeries();
      } else {
          fetchSearchResults();
      }
  }, [genreforURL, page, searchTerm]);
    
      return (
        <div>
          <span className="pageTitle">Discover T.V Series</span>
          <Genres
            type="tv"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
          />
          <div className="trending">
            {content &&
              content.map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="tv"
                  vote_average={c.vote_average}
                />
              ))}
          </div>
          {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
          )}
        </div>
      );
    };
    
    export default Series;
