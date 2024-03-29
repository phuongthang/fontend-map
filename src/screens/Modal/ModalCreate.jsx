import React, { useState, useEffect } from 'react';

//Constant
import Constants from '../../constants/constants';

//API
import addressApi from '../api/addressApi';

//Component
import ModalNotification from './ModalNotification';
import ModalSubmit from './ModalSubmit';

export default function ModalCreateComponent(props) {
    /**
     * get property
     */
    const { toggle } = props;

    /**
     * defined state
     */
    const [viewProvince, setViewProvince] = useState();
    const [viewDistrict, setViewDistrict] = useState();
    const [viewWard, setViewWard] = useState();
    const [viewStreet, setViewStreet] = useState();
    const [address, setAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [modalNotification, setModalNotification] = useState(false);
    const [modalSubmit, setModalSubmit] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
    const [hasFile, setHasFile] = useState(false);
    const [identification, setIdentification] = useState({
        province: '',
        district: '',
        ward: '',
        street: '',
    })
    const [infomationObject, setInfomationObject] = useState({
        province: 0,
        district: 0,
        ward: 0,
        street: 0,
        type: 1,
        img: '',
        note: ''
    });


    /**
     * event control open modal notification
     */
    const toggleModalNotification = () => {
        setModalNotification(!modalNotification);
    }

    /**
     * event control open modal submit
     */
    const toggleModalSubmit = () => {
        setModalSubmit(!modalSubmit);
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
     * event on change select box
     */
    const _onChangeSelectBox = (e) => {
        const fieldName = e.target.name;
        const fieldValueArray = e.target.value.split('!');
        const fieldValue = fieldValueArray[0];
        const fieldIdentification = fieldValueArray[1];
        setInfomationObject((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
        setIdentification((prevState) => ({
            ...prevState,
            [fieldName]: fieldIdentification,
        }));
    }

    /**
     * event get coordinates
     */
    const getCoordinatesFromAddress = () => {
        let address = `Đường ${identification.street} ${identification.ward} ${identification.district} thành phố ${identification.province}`;
        setAddress(address);
        getCoordinatesFromApi(address);
    }

    /**
     * event get coordinates from api
     */
    const getCoordinatesFromApi = (address) => {
        addressApi.getCoordinatesApi(address).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setLongitude(response.data.features[0].center[0]);
                setLatitude(response.data.features[0].center[1]);
                setDisableBtn(false);
                toggleModalNotification();
            }
        }, (error) => {
            //
        });

    }

    /**
     * get province
     */
    const getProvinceApi = () => {
        addressApi.getProvinceApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setViewProvince(response.data.province.map(item => (
                    <option key={item.id} value={`${item.id }!${item._name}`}>{item._name}</option>
                )));
            }
        }, (error) => {
            //
        });
    }

    /**
     * get district
     */
    useEffect(() => {
        if (infomationObject.province !== 0) {
            addressApi.getDistrictApi(infomationObject.province).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewDistrict(response.data.district.map(item => (
                        <option key={item.id} value={`${item.id }!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [infomationObject.province])

    /**
     * get ward, street
     */
    useEffect(() => {
        if (infomationObject.district !== 0) {
            addressApi.getWardApi(infomationObject.district).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewWard(response.data.ward.map(item => (
                        <option key={item.id} value={`${item.id }!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
            addressApi.getStreetApi(infomationObject.district).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewStreet(response.data.street.map(item => (
                        <option key={item.id} value={`${item.id }!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [infomationObject.district]);

    /**
     * get province
     */
    useEffect(() => {
        getProvinceApi();
    }, []);

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
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Thành phố:</small>
                                <select className="form-control" name="province" id="province" onChange={_onChangeSelectBox}>
                                    <option defaultValue>Chọn Thành phố</option>
                                    {viewProvince}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Quận/Huyện:</small>
                                <select className="form-control" name="district" id="district" onChange={_onChangeSelectBox}>
                                    <option defaultValue>Chọn Quận/Huyện</option>
                                    {viewDistrict}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Thị trấn/Xã:</small>
                                <select className="form-control" name="ward" id="ward" onChange={_onChangeSelectBox}>
                                    <option defaultValue>Chọn Thị trấn/Xã</option>
                                    {viewWard}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small htmlFor="province">Đường:</small>
                                <select className="form-control" name="street" id="street" onChange={_onChangeSelectBox}>
                                    <option defaultValue>Chọn Đường</option>
                                    {viewStreet}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-sm btn-primary" type="button" onClick={getCoordinatesFromAddress}>Lấy tọa độ</button>
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
                                <input type="textarea" autoComplete="off" name="note" row="4" className="form-control" onChange={_onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="group-button d-flex text-center">
                        <button disabled={disableBtn} onClick={toggleModalSubmit} className="btn btn-sm btn-primary" type="button">Đăng kí</button>
                        <button className="btn btn-sm btn-danger" type="button" onClick={toggle}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
        {modalNotification && <ModalNotification 
            modal = {modalNotification} 
            toggle = {toggleModalNotification} 
            longitude = {longitude}
            latitude = {latitude}
            address = {address}/> }
        {modalSubmit && <ModalSubmit
            modal = {modalSubmit} 
            toggle = {toggleModalSubmit}
            data = {infomationObject}
            hasFile = {hasFile}
            address = {address}
            longitude = {longitude}
            latitude = {latitude}
            /> }
        </>
    )
}