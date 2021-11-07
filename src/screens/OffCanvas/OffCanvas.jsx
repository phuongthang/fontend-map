import React, { useState } from 'react';

//Component
import { Offcanvas } from 'react-bootstrap';
import FormCURDComponent from '../Form/FormCURD';
import FormLayerComponent from '../Form/FormLayer';

//icon
import menu from "../assets/img/menu.png"


export default function OffCanvasComponent(props) {
    /**
     * get property
     */
    const {showMarker, setShowMarker, twoPoint, setTwoPoint } = props;

    /**
     * defined state
     */
    const [showCanvas, setShowCanvas] = useState(true);

    /**
     * envent control open canvas
     */
    const _onClose = () => setShowCanvas(false);
    const _onToggle = () => setShowCanvas((status) => !status);

    /**
     * option canvas
     */
    const options = {
        scroll: false,
        backdrop: false,
    }

    /**
     * render template
     */
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
                    <FormCURDComponent setShowMarker = {setShowMarker} showMarker={showMarker} twoPoint = {twoPoint} setTwoPoint = {setTwoPoint}/>
                    <hr/>
                    <FormLayerComponent setShowMarker = {setShowMarker} showMarker={showMarker}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}