import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = ({ searchTerm }) => {
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY='5a38c9aabebe47b32defbed338d1260f'
   
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`);

                setSearchResults(data.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchTerm.trim() !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div>
            <span className="pageTitle">Search Results</span>
            <div className="trending">
                {searchResults.map((result) => (
                    <SingleContent
                        key={result.id}
                        id={result.id}
                        poster={result.poster_path}
                        title={result.title || result.name}
                        date={result.first_air_date || result.release_date}
                        media_type={result.media_type}
                        vote_average={result.vote_average}
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;