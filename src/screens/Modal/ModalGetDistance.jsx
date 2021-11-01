import React, {useState} from "react";
import { Button, Modal } from "reactstrap";
import Common from './../../constants/common';
import addressApi from "../api/addressApi";
import Constants from "../../constants/constants";

function ModalGetDistanceComponent(props) {
    const { modal, toggle, pointA, pointB } = props;
    const [method, setMethod] = useState();
    const [distance, setDistance] = useState();

    const callApiGetDistance = (method) => {
        addressApi.getDistanceApi(pointA, pointB, method).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setDistance((response.data.routes[0].distance)/1000);
                setMethod(method);
            }
        }, (error) => {
            //
        });
    }
    return (
        <>
            <Modal
                isOpen={modal}
                className="modal-get-distance">
                <h5 className="text-center">TÍNH KHOẢNG CÁCH HAI ĐIỂM</h5>
                <div className="row">
                    <div className="col-6">
                        <h5>Thông tin điểm A</h5>
                        <p>Địa chỉ: {pointA.address} </p>
                        <p>Tọa độ: [{pointA.longitude} : {pointA.latitude}]</p>
                    </div>
                    <div className="col-6">
                        <h5>Thông tin điểm B</h5>
                        <p>Địa chỉ: {pointB.address} </p>
                        <p>Tọa độ: [{pointB.longitude} : {pointB.latitude}]</p>
                    </div>
                </div>
                <div className="row">
                    <p>Phương thức: {method ? method : ''}</p>
                    <p>Khoảng cách: {distance ? distance + 'km' : '0 km'}</p>
                </div>

                <div className="text-center box-modal-action">
                    <button onClick={()=>callApiGetDistance('driving-traffic')} className="btn btn-sm btn-primary" type="button">Driving Traffic</button>
                    <button onClick={()=>callApiGetDistance('driving')} className="btn btn-sm btn-secondary" type="button">Driving</button>
                    <button onClick={()=>callApiGetDistance('walking')} className="btn btn-sm btn-info" type="button">Walking</button>
                    <button onClick={()=>callApiGetDistance('cycling')} className="btn btn-sm btn-success" type="button">Cycling</button>
                    <button className="btn btn-sm btn-danger" type="button" onClick={toggle}>Hủy</button>
                </div>
            </Modal>
        </>
    );
}
export default ModalGetDistanceComponent;