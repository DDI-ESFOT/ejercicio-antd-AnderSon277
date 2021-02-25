import '../styles/App.css';
import {useState, useEffect } from "react";
import {Input,Col,Row} from 'antd';
import ListMovies from './ListMovies';


function App() {

  const [movies, setMovies] = useState([]);
  const [element, setElement] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      if(search){
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${search}`
        );
        const data = await response.json();
        console.log("Data", data);
        setMovies( data.Search);
        console.log("SetMovies",movies);
      }
    };

    getData();

  }, [search]);

  
  
  const onSearch = (value) =>{
    
    setSearch(value);
    console.log("movie",element);
    setElement("");
  }

  const searchStyle = {
    display: 'inline-flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }

  return (
    <>
    <Row>
      <Col span={24} style={searchStyle}>
        <Input.Search id="movie" placeholder="Ingrese frase o palabra: " value={element} defaultValue={element} onChange={(e)=>{console.log('e', e.target.value );setElement(e.target.value)}} enterButton onSearch={onSearch} style={{width:250}}/>
      </Col>
    </Row>
    <br></br>
    {movies ? <ListMovies movies={movies}/>: ("NO HAY RESULTADOS PARA MOSTRAR")}
    </>
  );
}

export default App;
