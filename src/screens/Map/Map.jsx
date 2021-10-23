import React, {useState} from 'react';

//img
import hospital from "../assets/img/hospital.png"
import vaccine from "../assets/img/vaccine.png"
import covid from "../assets/img/covid.png"
import lockdown from "../assets/img/lockdown.png"
import market from "../assets/img/market.png"
import supermarket from "../assets/img/supermarket.png"

//Screen
import ReactMapGL, {Marker} from 'react-map-gl';

//Constant
import Common from '../../constants/common';

export default function MapScreen() {
    /**
     * defined state
     */
    const [viewport, setViewport] = useState(Common.VIEW_PORT);

    /**
     * defined property
     */
    const mapStyle = Common.MAP_STYLE;
    const mapboxApiAccessToken = Common.MAP_BOX_API_ACCESS_TOKEN;

    const data = [
        {
            id: 1,
            name: 'name 1',
            latitude: 10.8619585399423,
            longitude: 106.74362380706191,
            icon: covid
        },
        {
            id: 2,
            name: 'name 2',
            latitude: 11.8619585399423,
            longitude: 109.74362380706191,
            icon: hospital
        },
        {
            id: 3,
            name: 'name 3',
            latitude: 12.8619585399423,
            longitude: 103.74362380706191,
            icon: lockdown
        },
        {
            id: 4,
            name: 'name 1',
            latitude: 13.8619585399423,
            longitude: 104.74362380706191,
            icon: market
        },
        {
            id: 5,
            name: 'name 2',
            latitude: 14.8619585399423,
            longitude: 102.74362380706191,
            icon: vaccine
        },
        {
            id: 6,
            name: 'name 3',
            latitude: 15.8619585399423,
            longitude: 119.74362380706191,
            icon: supermarket
        }
    ]

    /**
     * render template
     */
    return (
        <ReactMapGL
            {...viewport}
            mapStyle = {mapStyle}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapboxApiAccessToken={mapboxApiAccessToken}
        >
            {data.map((item) =>(
                <Marker
                longitude={item.longitude}
                latitude={item.latitude}
                offsetLeft={-20}
                offsetTop={-30}
            >
                <img crossOrigin="anonymous"  
                    style={{width:"30px", height:"30px", cursor: 'pointer'}} 
                    src={item.icon} alt="" 
                    onClick={()=>alert(`${item.name}`)}
                />
            </Marker>
            ))}
        </ReactMapGL>
    );
}