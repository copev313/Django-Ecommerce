import React from 'react';
import { Spinner } from 'react-bootstrap';


function GrowingLoader() {

    return (
        <Spinner
            animation="grow"
            role="status"
            variant="info"
            style={{
                height:'150px',
                width:'150px',
                margin:'auto',
                display:'block'
            }}
        >
            <span className="sr-only">Loading . . . </span>
        </Spinner>
    )
}


export default GrowingLoader;
