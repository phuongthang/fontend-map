import React from "react";
import { Button, Modal } from "reactstrap";
import Common from './../../constants/common';

function ModalInfomation(props){
    const {modal, toggle, data } = props;
    return(
        <>
            <Modal 
            isOpen={modal}
            className="modal-infomation">
                <div>
                    <h4 className="text-center">Thông tin</h4>
                    <p>Đối tượng: {data.name} </p>
                    <p>Tọa độ: [{data.latitude} : {data.longitude}]</p>
                    <p>Địa chỉ: {data.address}</p>
                    <p>Chú thích: {data.note}</p>
                </div>
                <div className="box-img text-center">
                    <img src={Common.URL_IMG + data.img} alt="" />
                </div>

                <div className="text-center box-modal-action">
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalInfomation;