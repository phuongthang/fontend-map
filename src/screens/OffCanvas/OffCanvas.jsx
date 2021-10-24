import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import FormCURDComponent from '../Form/FormCURD';
import FormLayerComponent from '../Form/FormLayer';

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
            <Button variant="primary" onClick={_onToggle}>
                Off
            </Button>
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