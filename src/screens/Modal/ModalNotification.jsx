import React from "react";
import { Button, Modal } from "reactstrap";

function ModalNotification(props){
    const {modal, toggle, address, longitude, latitude } = props;
    return(
        <>
            <Modal 
            isOpen={modal}
            className="modal-notification">
                <div className="text-center">
                    <p>Lấy thông tin thành công !</p>
                    <p>Địa chỉ: {address} </p>
                    <p>Tọa độ: [{latitude} : {longitude}]</p>
                </div>

                <div className="text-center box-modal-action">
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalNotification;