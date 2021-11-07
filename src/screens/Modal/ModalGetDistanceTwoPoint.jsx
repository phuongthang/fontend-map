import React, { useState, useEffect } from "react";

//Packet
import { Modal } from "reactstrap";

//Api
import addressApi from "../api/addressApi";

//Constant
import Constants from "../../constants/constants";

function ModalGetDistanceTwoPointComponent(props) {

    /**
     * get property
     */
    const { modal, toggle, marker, setMarker } = props;

    

    /**
     * defined state
     */
    const [method, setMethod] = useState();
    const [distance, setDistance] = useState();
    const [address, setAddress] = useState([]);

    /**
     * call api get distance
     */
    const callApiGetDistance = (method) => {
        addressApi.getDistanceApi(marker[0], marker[1], method).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setDistance((response.data.routes[0].distance) / 1000);
                setMethod(method);
            }
        }, (error) => {
            //
        });
    }

    /**
     * close modal
     */
     const _close = () => {
        setMarker([]);
        toggle();
    }


    /**
     * call API get adrress by coordinates
     */
    useEffect(() => {
        const getAddressFromCoordinates = (longitude, latitude) => {
            addressApi.getAddressFromCoordinatesApi(longitude, latitude).then((response) => {
                let mounted = true;
                if (mounted) {
                    if (response.status === Constants.HTTP_STATUS.OK) {
                        setAddress((prevState) => ([
                            ...prevState,
                            response.data.features[0].place_name
                        ]));
                    }
                }
                return () => mounted = false;
            }, (error) => {
                let mounted = true;
                return () => mounted = false;
            });
        }

        if(marker){
            marker.forEach((item)=>{
                getAddressFromCoordinates(item.longitude, item.latitude);
            })
        }
    }, [marker]);

    /**
     * render template
     */
    return (
        <>
            <Modal
                isOpen={modal}
                className="modal-get-distance">
                <h5 className="text-center">TÍNH KHOẢNG CÁCH HAI ĐIỂM</h5>
                <div className="row">
                    <div className="col-6">
                        <h5>Thông tin điểm A</h5>
                        <p>Địa chỉ: {address[0]} </p>
                        <p>Tọa độ: [{marker[0].longitude} : {marker[0].latitude}]</p>
                    </div>
                    <div className="col-6">
                        <h5>Thông tin điểm B</h5>
                        <p>Địa chỉ: {address[1]} </p>
                        <p>Tọa độ: [{marker[1].longitude} : {marker[1].latitude}]</p>
                    </div>
                </div>
                <div className="row">
                    <p>Phương thức: {method ? method : ''}</p>
                    <p>Khoảng cách: {distance ? distance + 'km' : '0 km'}</p>
                </div>

                <div className="text-center box-modal-action">
                    <button onClick={() => callApiGetDistance('driving-traffic')} className="btn btn-sm btn-primary" type="button">Driving Traffic</button>
                    <button onClick={() => callApiGetDistance('driving')} className="btn btn-sm btn-secondary" type="button">Driving</button>
                    <button onClick={() => callApiGetDistance('walking')} className="btn btn-sm btn-info" type="button">Walking</button>
                    <button onClick={() => callApiGetDistance('cycling')} className="btn btn-sm btn-success" type="button">Cycling</button>
                    <button className="btn btn-sm btn-danger" type="button" onClick={_close}>Hủy</button>
                </div>
            </Modal>
        </>
    );
}
export default ModalGetDistanceTwoPointComponent;