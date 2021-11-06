import React, { useState, useEffect } from 'react';

//API
import coordinatesApi from './../api/coordinatesApi';

//Constants
import Constants from './../../constants/constants';
import Common from './../../constants/common';

export default function ModalUpdatePointInMapComponent(props) {
    /**
     * get property
     */
    const { toggle, data } = props;

    /**
     * defined state
     */
    const [hasFile, setHasFile] = useState(false);
    const [infomationObject, setInfomationObject] = useState({
        type: 0,
        img: '',
        note: '',
        address: '',
        longitude: '',
        latitude: ''
    });

    /**
     * register coordinates
     */
     const updateCoordinates = () => {
        const form = new FormData();
        form.append("id", data.id);
        form.append("type", parseInt(data.type,10));
        form.append("note", infomationObject.note);
        if (hasFile === true) {
            form.append("img", infomationObject.img);
        }
        coordinatesApi.updateCoordinates(form).then((response) => {
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

    useEffect(()=>{
        if(data){
            setInfomationObject((prevState) => ({
                ...prevState,
                type: parseInt(data.type, 10),
                address: data.address,
                note: data.note,
                longitude: data.longitude,
                latitude: data.latitude
            }));
        }
    },[data]);

    /**
     * render template
     */
    return (
        <>
        <div className="modal-layout">
            <div className="modal-content">
                <form>
                    <div className="text-center mb-5">
                        <h5>CHỈNH SỬA MỘT ĐIỂM TRÊN BẢN ĐỒ</h5>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p>Đối tượng: {Common.MAPPING_TYPE_CODE[infomationObject.type]}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <small htmlFor="address">Địa chỉ:</small>
                                <input type="text" disabled={true} value={infomationObject.address} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Longitude:</small>
                                <input type="text" disabled={true} value={infomationObject.longitude} className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Latitude:</small>
                                <input type="text" disabled={true} value={infomationObject.latitude} className="form-control" />
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
                        <button onClick={updateCoordinates} className="btn btn-sm btn-primary" type="button">Chỉnh sửa</button>
                        <button className="btn btn-sm btn-danger" type="button" onClick={toggle}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}