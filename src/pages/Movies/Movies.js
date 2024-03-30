import axios from "axios";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useEffect, useState } from "react";
import useGenres from "../../hooks/useGenres";

const  Movies=({searchTerm})=>{
    
    const[page,setPage]=useState(1)
    const[content,setContent]=useState([]);
    const[numOfPages,setNumOfPages]=useState(0);
    const[selectedGenres,setSelectedGenres]=useState([])
    const[genres,setGenres]=useState([])
    const genreforURL=useGenres(selectedGenres)
    // const [searchTerm, setSearchTerm] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    const API_KEY='5a38c9aabebe47b32defbed338d1260f'
    const fetchMovies=async()=>{
       const {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreforURL}`)
       
       setContent(data.results)
       setNumOfPages(data.total_pages)
       
    }

    const fetchSearchResults = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`);

      setContent(data.results);
      setNumOfPages(data.total_pages);
  };

  useEffect(() => {
      window.scroll(0, 0);
      if (searchTerm.trim() === '') {
          fetchMovies();
      } else {
          fetchSearchResults();
      }
  }, [genreforURL, page, searchTerm]);
    // useEffect(() => {
    //     window.scroll(0, 0);
    //     fetchMovies();
    //     // eslint-disable-next-line
    //   }, [genreforURL, page]);
    
      return (
        <div>
          <span className="pageTitle">Discover Movies</span>
          <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
          />
          <div className="trending">
          {/* {(searchTerm.trim() === '' ? content : searchResults).map((c) => ( */}
             {content &&
              content.map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="movie"
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
    
    export default Movies;
