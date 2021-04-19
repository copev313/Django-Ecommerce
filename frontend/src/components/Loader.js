import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner
            animation="border"
            role="status"
            variant="success"
            style={{
                height:'150px',
                width:'150px',
                margin:'auto',
                display:'block'
            }}
        >
            <span className="sr-only">
                Loading . . . 
            </span>

        </Spinner>
    )
}

export default Loader
