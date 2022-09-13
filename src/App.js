import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";
import MovieInfoComponent from "./Components/MovieInfoComponent";

const API_KEY = '5bacd24a';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margrin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeOutId, setTimeOutId] = useState();
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async(searchString) => {
    const res = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    setMoviesList(res.data.Search);
  }

  const onTextChange = (e) => {
    clearTimeout(timeOutId);
    setSearchQuery(e.target.value)
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    setTimeOutId(timeout);
  }

  const handleReloadThePage = () => {
    window.location.reload(); 
  }
  
  return (
    <Container>
      <Header>
        <AppName onClick={handleReloadThePage}>
          <MovieImage src="https://i.ibb.co/tqZwQX8/movie-icon.png" />
          Movies Search
        </AppName>
        <SearchBox>
          <SearchIcon src="https://i.ibb.co/wcm7w85/search-icon.png" />
          <SearchInput placeholder="Search Movie Name" value={searchQuery} onChange={onTextChange}/>
        </SearchBox> 
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
      <MovieListContainer>
        {
          moviesList?.length ? moviesList.map((movie, index) => (
            <MovieComponent key={index} movie={movie} setSelectedMovie={setSelectedMovie} />
          )) : <Placeholder src='https://i.ibb.co/tqZwQX8/movie-icon.png'/>
        }
      </MovieListContainer>
    </Container>
  );
}

export default App;
