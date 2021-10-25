import React from "react";
import { Button, Modal } from "reactstrap";
import Constants from "../../constants/constants";
import coordinatesApi from "../api/coordinatesApi";

function ModalSubmit(props) {
    const { modal, toggle, data, hasFile, address, longitude, latitude } = props;

    const registerCoordinates = () => {
        const form = new FormData();
        form.append("type", parseInt(data.type,10));
        form.append("address", address);
        form.append("longitude", longitude);
        form.append("latitude", latitude);
        form.append("note", data.note);
        if (hasFile === true) {
            form.append("img", data.img);
        }
        coordinatesApi.registerCoordinates(form).then((response) => {
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
                    <p>Bạn có chắc muốn đăng kí điểm này ?</p>
                </div>

                <div className="text-center box-modal-action">
                    <Button className="btn btn-sm btn-success" onClick={registerCoordinates}>Đăng kí</Button>
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalSubmit;