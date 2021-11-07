import React from 'react';

//icon
import roads from "../assets/img/roads.png";
import roadback from "../assets/img/roadback.png";
import satellite from "../assets/img/satellite.png";

//Component
import { Navbar } from 'react-bootstrap';
import OffCanvasComponent from '../OffCanvas/OffCanvas';

export default function NavComponent(props) {
    /**
     * get property
     */
    const { showMarker, setShowMarker, setMapStyle, mapStyle, twoPoint, setTwoPoint } = props;

    const _onClickSetMapStyle = (mapStyle) => {
        setMapStyle(mapStyle);
    }
    /**
     * render template
     */
    return (
        <Navbar bg="light" expand="lg" className="nav-box d-flex justify-content-between">
            <Navbar.Brand>
                <OffCanvasComponent setShowMarker={setShowMarker} showMarker={showMarker} twoPoint = {twoPoint} setTwoPoint = {setTwoPoint} />
            </Navbar.Brand>
            <Navbar.Brand>
                <ul className="d-flex">
                    <li>
                        <label onClick={() => _onClickSetMapStyle('mapbox://styles/mapbox/streets-v11')}>
                            <span className={`${mapStyle === 'mapbox://styles/mapbox/streets-v11' ? '' : 'active'}`}></span>
                            <div className="icon-box image-container">
                                <img crossOrigin="anonymous" className="image-content" src={satellite} alt="" />
                            </div>
                        </label>
                    </li>
                    <li>
                        <label onClick={() => _onClickSetMapStyle('mapbox://styles/mapbox/dark-v10')}>
                            <span className={`${mapStyle === 'mapbox://styles/mapbox/dark-v10' ? '' : 'active'}`}></span>
                            <div className="icon-box image-container">
                                <img crossOrigin="anonymous" className="image-content" src={roads} alt="" />
                            </div>
                        </label>
                    </li>
                    <li>
                        <label onClick={() => _onClickSetMapStyle('mapbox://styles/mapbox/light-v10')}>
                            <span className={`${mapStyle === 'mapbox://styles/mapbox/light-v10' ? '' : 'active'}`}></span>
                            <div className="icon-box image-container">
                                <img crossOrigin="anonymous" className="image-content" src={roadback} alt="" />
                            </div>
                        </label>
                    </li>
                </ul>
            </Navbar.Brand>
        </Navbar>
    )
}