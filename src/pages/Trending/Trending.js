import axios from "axios";
import './Trending.css'
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useEffect, useState } from "react";
const API_KEY='5a38c9aabebe47b32defbed338d1260f';
const Trending = ({searchTerm}) => {
    const[page,setPage]=useState(1);
    const [content,setContent] =useState([])
    const fetchTrending =async()=>{
        // const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`);
        setContent(data.results);
       
    };
    const fetchSearchResults = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}&page=${page}`);
            setContent(data.results);
            // setNumOfPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching search results for Trending:', error);
        }
    };
  
    useEffect(() => {
        window.scroll(0, 0);
        if (searchTerm.trim() === '') {
           setPage(1);
            fetchTrending();
        } else {
            fetchSearchResults();
        }
    }, [page, searchTerm]);
    

    return(
     <div>
      <span className='pageTitle'>Trending</span>
      <div className="trending">
          {
            content && content.map((c)=>
                <SingleContent 
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={c.media_type}
                  vote_average={c.vote_average}
                  />
            )
          }
      </div>
      <CustomPagination setPage={setPage} />
     </div>
    );
};
export default Trending