import {BrowserRouter, Route} from "react-router-dom"
import { Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from "./components/MainNav"
import { Container, Switch } from "@mui/material";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Search from "./pages/Search/Search";
import Series from "./pages/Series/Series";
import React ,{useState}from 'react'
import Watchlist from "./pages/Watchlist/Watchlist";
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
   <BrowserRouter> 

   <Header  onSearch={handleSearch} />

    <div className="app">
      <Container>
      <Routes>
            <Route path="/" element={<Trending searchTerm={searchTerm}/>} exact /> 
            <Route path="/movies" element={<Movies searchTerm={searchTerm}/>}/>
            <Route path="/series" element={<Series searchTerm={searchTerm}/>}/>
            <Route path="/watchlist" element={<Watchlist />}/>
      </Routes>
      </Container>
    </div>

    <SimpleBottomNavigation />
    </ BrowserRouter>
  );
}

export default App;
