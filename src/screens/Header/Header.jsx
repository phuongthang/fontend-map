import React from 'react';

//Component
import NavComponent from '../Nav/Nav';

export default function Header(props) {
    /**
     * defined state
     */
    const {showMarker, setShowMarker, setMapStyle, mapStyle, twoPoint, setTwoPoint } = props;

    /**
     * render template
     */
    return (
        <NavComponent setShowMarker = {setShowMarker} showMarker={showMarker} mapStyle = {mapStyle} setMapStyle = {setMapStyle} twoPoint = {twoPoint} setTwoPoint = {setTwoPoint}/>
    )
}