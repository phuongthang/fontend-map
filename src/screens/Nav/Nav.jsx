import React from 'react';

//Component
import { Navbar } from 'react-bootstrap';
import OffCanvasComponent from '../OffCanvas/OffCanvas';

export default function NavComponent(props) {
    /**
     * get property
     */
    const {showMarker, setShowMarker} = props;

    /**
     * render template
     */
    return (
        <Navbar bg="light" expand="lg" className="nav-box">
            <Navbar.Brand>
                <OffCanvasComponent setShowMarker = {setShowMarker} showMarker={showMarker}/>
            </Navbar.Brand>
        </Navbar>
    )
}