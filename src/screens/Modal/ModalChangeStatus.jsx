import React from "react";
import { Button, Modal } from "reactstrap";
import Constants from "../../constants/constants";
import coordinatesApi from "../api/coordinatesApi";

function ModalChangeStatus(props) {
    const { modal, toggle, data, type} = props;

    const apiChangeStatusCoordinates = () => {
        let flag = 1;
        if(data.delete_flag){
            flag = 0;
        }

        let params = {
            id: data.id, 
            type: parseInt(type,10), 
            status: flag
        }
        coordinatesApi.changeStatusCoordinates(params).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    window.location.reload();
                }
            }
            return () => mounted = false;
        }, (error) => {
            let mounted = true;
            return () => mounted = false;
        });
    }
    return (
        <>
            <Modal
                isOpen={modal}
                className="modal-submit">
                <div className="text-center">
                    <p>Bạn có chắc muốn thay đổi trạng thái của điểm này ??</p>
                </div>

                <div className="text-center box-modal-action">
                    <Button type="button" className="btn btn-sm btn-success" onClick={apiChangeStatusCoordinates}>Thay đổi</Button>
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalChangeStatus;