import React from "react";

//Packet
import { Button, Modal } from "reactstrap";

//Constant
import Constants from "../../constants/constants";

//Api
import coordinatesApi from "../api/coordinatesApi";

function ModalChangeStatus(props) {

    /**
     * get property
     */
    const { modal, toggle, data, type} = props;

    /**
     * call API change status coordinates
     */
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

    /**
     * render template
     */
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