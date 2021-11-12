import React, {useState} from "react";

//Packet
import { Button, Modal } from "reactstrap";

//Constant
import Common from './../../constants/common';

//Component
import ModalUpdatePointInMapComponent from "./ModalUpdate";

function ModalInfomation(props){
    /**
     * get property
     */
    const {modal, toggle, data } = props;

    let ikey = sessionStorage.getItem('ikey');

    /**
     * defined state
     */
    const [modalUpdatePoint, setModalUpdatePoint] = useState(false);

    /**
     * displayModal
     */
     const toggleModalUpdate = () => {
        setModalUpdatePoint(!modalUpdatePoint);
    }

    console.log(data);

    /**
     * render template
     */
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
                    {
                        ikey && 
                    <Button onClick={toggleModalUpdate} className="btn btn-sm btn-success">Chỉnh sửa</Button>
                    }
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>

            {
                modalUpdatePoint && <ModalUpdatePointInMapComponent modal = {modal} toggle = {toggle} data = {data}/>
            }
        </>
    );
}
export default ModalInfomation;