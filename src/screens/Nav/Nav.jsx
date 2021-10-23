import React from 'react';
import { Navbar } from 'react-bootstrap';
import OffCanvasComponent from '../OffCanvas/OffCanvas';

export default function NavComponent() {
    return (
        <Navbar bg="light" expand="lg" className="nav-box">
            <Navbar.Brand>
                <OffCanvasComponent/>
            </Navbar.Brand>
        </Navbar>
    )
}