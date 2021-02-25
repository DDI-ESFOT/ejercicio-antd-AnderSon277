import React from 'react'
import { Result, Button } from 'antd';

const NotFound=()=>{
    return (
        <>
        <Result
            status="404"
            title="404"
            subTitle="Lo sentimos no encontramos la pelicula, intenta denuevo"
        />
        </>
    )
}
export default  NotFound;