import '../styles/App.css';
import {useState, useEffect } from "react";
import {Input,Col,Row} from 'antd';
import ListMovies from './ListMovies';
function App() {

  const [movies, setMovies] = useState([]);
  const [element, setElement] = useState("avengers");

  useEffect(() => {
      const getData = async () => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=e23801d0&s=${element}`
        );
        const data = await response.json();
        console.log("Data", data);
        const results = data.Search; 
        console.log("Search",results);
        setMovies( data.Search);
        console.log("SetMovies",movies);
      };
    getData();

  }, [element]);
  
  const onSearch = () =>{
    setElement(document.querySelector("#movie").value);
    console.log("movie",element);
    document.querySelector("#movie").value="";
  }

  const search = {
    display: 'inline-flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }

  return (
    <>
    <Row>
      <Col span={24} style={search}>
        <Input.Search id="movie" placeholder="Ingrese frase o palabra: "  enterButton onSearch={onSearch} onPressEnter={onSearch} style={{width:250}}/>
      </Col>
    </Row>
    <br></br>
    {element !="" ? <ListMovies movies={movies}/>: ("NO HAY RESULTADOS")}
    </>
  );
}

export default App;
