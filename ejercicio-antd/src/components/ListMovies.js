import {useState, useEffect } from "react";
import {Card, Row, Col, Button, Modal, Image, Rate} from 'antd';

const ListMovies = ({movies}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState(null);
    const [dataMovie, setDataMovie] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        if (id) {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
          );
          const data = await response.json();
          console.log("data", data);
          setDataMovie(data);
        }
      };
  
      getData();
    }, [id]);

    const handleClose = () => {
        setIsModalVisible(false);
      };

    const handleViewMore = (movieId) => {
        console.log("movieId", movieId);
        setId(movieId);
        setIsModalVisible(true);
      };

    return (
    <>
    <Row style={{ margin: '0 10%'}}>
    {movies.map((movie) => (
        <Col span={8}>
            <Card
            style={{ width: 300 }}
            cover={
            <img
                alt="Not Found Image"
                src={movie.Poster}
            />
            }
            actions={[
                <Button
                  type="link"
                  onClick={() => handleViewMore(movie.imdbID)}
                >
                  Ver más
                </Button>
            ]}
            >
            <Card.Meta
                title={movie.Title}
                description={movie.Year}
            />
            </Card>
        </Col>
	))}
    </Row>
    {dataMovie ?     
    <Row>
    <Modal
        title={dataMovie.Title} 
        visible={isModalVisible} 
        onCancel={handleClose}
        onOk={handleClose}
        >
        {<Row>
            <Col span={12} >
            <p ><strong>Titulo original: </strong>{dataMovie.Title}</p>
            <p ><strong>Fecha de estreno: </strong>{dataMovie.Released}</p>
            <p ><strong>Idioma/s: </strong> {dataMovie.Language}</p>
            <p ><strong>Genero/s: </strong> {dataMovie.Genre}</p>
            <p ><strong>Ciudad deorigen: </strong>{dataMovie.Country}</p>
            <p ><strong>Director/es: </strong>{dataMovie.Director}</p>
            <p ><strong>Escritor/es" </strong>{dataMovie.Writer}</p>
            <p ><strong>Actor/es: </strong>{dataMovie.Actors}</p>
            <p ><strong>Raiting: </strong><Rate disabled defaultValue={dataMovie.imdbRating} /></p>
            </Col>
            <Col span={12}>
                <Image
                height="fit-content"
                src={dataMovie.Poster}
                />
            </Col>
        </Row>}
    </Modal>
    </Row>  : ("")
    }
    </>
    )
}
export default ListMovies;