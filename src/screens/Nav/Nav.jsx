import React from 'react';
import { Navbar } from 'react-bootstrap';
import OffCanvasComponent from '../OffCanvas/OffCanvas';

export default function NavComponent(props) {
    const {showMarker, setShowMarker} = props;
    return (
        <Navbar bg="light" expand="lg" className="nav-box">
            <Navbar.Brand>
                <OffCanvasComponent setShowMarker = {setShowMarker} showMarker={showMarker}/>
            </Navbar.Brand>
        </Navbar>
    )
}