import React, { useState, useEffect } from 'react';

//img
import hospitalicon from "../assets/img/hospital.png"
import vaccineicon from "../assets/img/vaccine.png"
import covidicon from "../assets/img/covid.png"
import lockdownicon from "../assets/img/lockdown.png"
import marketicon from "../assets/img/market.png"
import supermarketicon from "../assets/img/supermarket.png"

//Screen
import ReactMapGL, { Marker } from 'react-map-gl';
import Header from '../Header/Header';

//Constant
import Common from '../../constants/common';
import Constants from '../../constants/constants';

//Api
import coordinatesApi from '../api/coordinatesApi';
import addressApi from '../api/addressApi';

//Component
import ModalInfomation from './../Modal/ModalInfomation';
import ModalCreatePointInMapComponent from '../Modal/ModalCreatePointInMap';

export default function MapScreen() {
    /**
     * defined state
     */
    const [viewport, setViewport] = useState(Common.VIEW_PORT);
    const [covid, setCovid] = useState();
    const [lockdown, setLockdown] = useState();
    const [vaccine, setVaccine] = useState();
    const [hospital, setHospital] = useState();
    const [market, setMarket] = useState();
    const [supermarket, setSuperMarket] = useState();
    const [modalInfomation, setModalInfomation] = useState(false);
    const [modalCreatePoint, setModalCreatePoint] = useState(false);
    const [modalData, setModalData] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [address, setAddress] = useState();
    const [showMarker, setShowMarker] = useState({
        covid: true,
        lockdown: true,
        vaccine: true,
        hospital: true,
        market: true,
        supermarket: true,
        all: true

    })

    /**
     * defined property
     */
    const mapStyle = Common.MAP_STYLE;
    const mapboxApiAccessToken = Common.MAP_BOX_API_ACCESS_TOKEN;

    /**
     * displayModal
     */
    const toggleModalInfomation = () => {
        setModalInfomation(!modalInfomation);
    }

    const toggleModalCreatePoint = () => {
        setModalCreatePoint(!modalCreatePoint);
    }

    /**
     * open modal detail coordinates
     */
    const _onClickModal = (data) => {
        setModalData(data);
        toggleModalInfomation();
    }

    /**
     * get coordinates by onClick
     */
    const _onClick = async(e) => {
        await getAddressFromCoordinates(e.lngLat[0], e.lngLat[1]);
        toggleModalCreatePoint();
    }

    /**
     * call API get adrress by coordinates
     */
    const getAddressFromCoordinates = (longitude, latitude) => {
        addressApi.getAddressFromCoordinatesApi(longitude, latitude).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setAddress(response.data.features[0].place_name);
                    setLongitude(longitude);
                    setLatitude(latitude);
                }
            }
            return () => mounted = false;
        }, (error) => {
            let mounted = true;
            return () => mounted = false;
        });
    }


    /**
     * init data
     */
    useEffect(() => {
        const getListCoordinates = () => {
            coordinatesApi.getListCoordinates().then((response) => {
                let mounted = true;
                if (mounted) {
                    if (response.status === Constants.HTTP_STATUS.OK) {
                        setCovid(response.data.covids);
                        setHospital(response.data.hospitals);
                        setLockdown(response.data.lockdowns);
                        setSuperMarket(response.data.supermarkets);
                        setVaccine(response.data.vaccines);
                        setMarket(response.data.markets);
                    }
                }
                return () => mounted = false;
            }, (error) => {
                let mounted = true;
                return () => mounted = false;
            });
        }

        getListCoordinates();
    }, [])

    /**
     * render template
     */
    return (
        <>
            <Header setShowMarker={setShowMarker} showMarker={showMarker} />
            <ReactMapGL
                {...viewport}
                mapStyle={mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapboxApiAccessToken={mapboxApiAccessToken}
                onClick={(e)=>_onClick(e)}
            >
                {
                    showMarker.all &&
                    <>
                        {showMarker.covid && covid && covid.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={covidicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                        {showMarker.lockdown && lockdown && lockdown.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={lockdownicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                        {showMarker.market && market && market.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={marketicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                        {showMarker.supermarket && supermarket && supermarket.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={supermarketicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                        {showMarker.vaccine && vaccine && vaccine.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={vaccineicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                        {showMarker.hospital && hospital && hospital.map((item) => (
                            <Marker
                                longitude={+item.longitude}
                                latitude={+item.latitude}
                                offsetLeft={-20}
                                offsetTop={-30}
                                key={item.id}
                            >
                                <img crossOrigin="anonymous"
                                    style={{ width: "30px", height: "30px", cursor: 'pointer' }}
                                    src={hospitalicon} alt=""
                                    onClick={() => _onClickModal(item)}
                                />
                            </Marker>
                        ))}
                    </>
                }
            </ReactMapGL>
            {modalInfomation && <ModalInfomation modal={modalInfomation} toggle={toggleModalInfomation} data={modalData} />}
            {modalCreatePoint && <ModalCreatePointInMapComponent modal={modalCreatePoint} toggle={toggleModalCreatePoint} longitude = {longitude} latitude={latitude} address = {address}/>}
        </>
    );
}