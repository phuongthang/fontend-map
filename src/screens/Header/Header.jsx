import React from 'react';

//Component
import NavComponent from '../Nav/Nav';

export default function Header(props) {
    /**
     * defined state
     */
    const {showMarker, setShowMarker } = props;

    /**
     * render template
     */
    return (
        <NavComponent setShowMarker = {setShowMarker} showMarker={showMarker}/>
    )
}