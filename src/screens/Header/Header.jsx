import React from 'react';
import NavComponent from '../Nav/Nav';

export default function Header(props) {
    const {showMarker, setShowMarker } = props;
    return (
        <NavComponent setShowMarker = {setShowMarker} showMarker={showMarker}/>
    )
}