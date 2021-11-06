import React, { useState } from 'react';

//API
import coordinatesApi from './../api/coordinatesApi';

//Constants
import Constants from './../../constants/constants';

export default function ModalCreatePointInMapComponent(props) {
    /**
     * get property
     */
    const { toggle, longitude, latitude, address } = props;

    /**
     * defined state
     */
    const [hasFile, setHasFile] = useState(false);
    const [infomationObject, setInfomationObject] = useState({
        type: 1,
        img: '',
        note: ''
    });


    /**
     * register coordinates
     */
     const registerCoordinates = () => {
        const form = new FormData();
        form.append("type", parseInt(infomationObject.type,10));
        form.append("address", address);
        form.append("longitude", longitude);
        form.append("latitude", latitude);
        form.append("note", infomationObject.note);
        if (hasFile === true) {
            form.append("img", infomationObject.img);
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

    /**
     * event change file
     */
    const _onChangeFile = (e) => {
        setInfomationObject((prevState) => ({
            ...prevState,
            img: e.target.files[0],
        }));
        setHasFile(true);
    }

    /**
     * event on change object
     */
    const _onChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setInfomationObject((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }

    /**
     * render template
     */
    return (
        <>
        <div className="modal-layout">
            <div className="modal-content">
                <form>
                    <div className="text-center mb-5">
                        <h5>TẠO ĐIỂM MỚI TRÊN BẢN ĐỒ</h5>
                    </div>
                    <div className="form-check-feature d-flex justify-content-center">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" defaultChecked type="radio" name="type" id="covid" value="1" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="covid">Ổ dịch</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="lockdown" value="2" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="lockdown">Vùng phong tỏa</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="vaccine" value="3" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="vaccine">Điểm tiêm chủng</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="hospital" value="4" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="hospital">Điểm xét nghiệm</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="market" value="5" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="market">Chợ</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="supermarket" value="6" onChange={_onChange} />
                            <label className="form-check-label" htmlFor="supermarket">Siêu thị</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <small htmlFor="address">Địa chỉ:</small>
                                <input type="text" disabled={true} value={address} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Longitude:</small>
                                <input type="text" disabled={true} value={longitude} className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Latitude:</small>
                                <input type="text" disabled={true} value={latitude} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="img">Ảnh:</label>
                                <input type="file" name="img" className="form-control" onChange={_onChangeFile} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="note">Ghi chú:</label>
                                <input type="textarea" name="note" value={infomationObject.note} row="4" className="form-control" onChange={_onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="group-button d-flex text-center">
                        <button  onClick={registerCoordinates} className="btn btn-sm btn-primary" type="button">Đăng kí</button>
                        <button className="btn btn-sm btn-danger" type="button" onClick={toggle}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}