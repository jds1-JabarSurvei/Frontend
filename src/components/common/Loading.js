import React from 'react';
import {
    Spinner,
} from 'react-bootstrap';

const Loading = () => {
    return (
        <div className="center-page">
            <Spinner
                animation="grow"
                variant="warning"
            />
        </div>

    );
}

export default Loading;