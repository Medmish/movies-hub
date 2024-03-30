import React, { useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const removeFromWatchlist = (id) => {
        const updatedWatchlist = watchlist.filter(item => item.id !== id);
        setWatchlist(updatedWatchlist);
        // Update local storage
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    useEffect(() => {
        const watchlistFromStorage = JSON.parse(localStorage.getItem('watchlist') || []);
        setWatchlist(watchlistFromStorage );
        
    }, []);

   
    return (
        <div>
            <span className="pageTitle">My Watchlist</span>
            <div className="trending">
                {watchlist.map((item) => (
                    <SingleContent
                        key={item.id}
                        id={item.id}
                        poster={item.poster}
                        title={item.title}
                        date={item.date}
                        media_type={item.media_type}
                        vote_average={item.vote_average}
                        removeFromWatchlist={removeFromWatchlist}
                        isWatchlistPage={true}
                     
                       

                    />
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
