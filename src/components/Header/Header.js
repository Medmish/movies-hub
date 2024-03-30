
import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';

function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        onSearch(searchTerm);
       
    };

    return (  
        <div className='header'>
            <span onClick={() => window.scroll(0,0)} className='header-title'>🎬 Movie Hub</span>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder='Search ...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button ><SearchIcon /></button>
            </div>
        </div>
    );
}

export default Header;
