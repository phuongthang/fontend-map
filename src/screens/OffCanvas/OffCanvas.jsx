import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import FormCURDComponent from '../Form/FormCURD';
import FormLayerComponent from '../Form/FormLayer';
import menu from "../assets/img/menu.png"


export default function OffCanvasComponent() {
    const [showCanvas, setShowCanvas] = useState(true);

    const _onClose = () => setShowCanvas(false);
    const _onToggle = () => setShowCanvas((status) => !status);
    const options = {
        scroll: false,
        backdrop: false,
    }
    return (
        <>
            <div style={{cursor:'pointer'}} className="image-container px-5" onClick={_onToggle}>
                <img className="image-content" src={menu} alt="" />
            </div>
            <Offcanvas show={showCanvas} onHide={_onClose} {...options}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>LỚP DỮ LIỆU TRÊN BẢN ĐỒ</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FormCURDComponent/>
                    <hr/>
                    <FormLayerComponent/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}