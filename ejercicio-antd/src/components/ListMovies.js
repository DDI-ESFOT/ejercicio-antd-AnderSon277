import React from 'react'
import {Card,Row, Col} from 'antd';
import LearMore from './LearMore';

const ListMovies = ({movies}) => {
    
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
            <LearMore/>
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
    </>
    )
}
export default ListMovies;