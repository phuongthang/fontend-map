import React, { useState, useEffect } from 'react';
import Constants from '../../constants/constants';
import addressApi from '../api/addressApi';
import ModalNotification from './ModalNotification';

export default function ModalCreateComponent(props) {
    const { toggle, modal } = props;
    const [viewProvince, setViewProvince] = useState();
    const [viewDistrict, setViewDistrict] = useState();
    const [viewWard, setViewWard] = useState();
    const [viewStreet, setViewStreet] = useState();
    const [address, setAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [modalNotification, setModalNotification] = useState(false);
    const toggleModalNotification = () => {
        setModalNotification(!modalNotification);
    }
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
    });


    const _onChange = (e) => {
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

    const getCoordinatesFromAddress = () => {
        let address = `Đường ${identification.street} ${identification.ward} ${identification.district} thành phố ${identification.province}`;
        setAddress(address);
        getCoordinatesFromApi(address);
    }

    const getCoordinatesFromApi = (address) => {
        addressApi.getCoordinatesApi(address).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setLongitude(response.data.features[0].center[0]);
                setLatitude(response.data.features[0].center[1]);
                toggleModalNotification();
            }
        }, (error) => {
            //
        });

    }
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

    useEffect(() => {
        getProvinceApi();
    }, []);
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
                            <input className="form-check-input" defaultChecked type="radio" name="type" id="covid" value="1" />
                            <label className="form-check-label" for="covid">Ổ dịch</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="lockdown" value="2" />
                            <label className="form-check-label" for="lockdown">Vùng phong tỏa</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="vaccine" value="3" />
                            <label className="form-check-label" for="vaccine">Điểm tiêm chủng</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="hospital" value="4" />
                            <label className="form-check-label" for="hospital">Điểm xét nghiệm</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="supermarket" value="5" />
                            <label className="form-check-label" for="supermarket">Siêu thị</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="market" value="6" />
                            <label className="form-check-label" for="market">Chợ</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small for="province">Thành phố:</small>
                                <select className="form-control" name="province" id="province" onChange={_onChange}>
                                    <option defaultValue>Chọn Thành phố</option>
                                    {viewProvince}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small for="province">Quận/Huyện:</small>
                                <select className="form-control" name="district" id="district" onChange={_onChange}>
                                    <option defaultValue>Chọn Quận/Huyện</option>
                                    {viewDistrict}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small for="province">Thị trấn/Xã:</small>
                                <select className="form-control" name="ward" id="ward" onChange={_onChange}>
                                    <option defaultValue>Chọn Thị trấn/Xã</option>
                                    {viewWard}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <small for="province">Đường:</small>
                                <select className="form-control" name="street" id="street" onChange={_onChange}>
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
                                <label for="province">Ảnh:</label>
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label for="province">Ghi chú:</label>
                                <input type="textarea" row="4" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="group-button d-flex text-center">
                        <button className="btn btn-sm btn-primary" type="submit">Đăng kí</button>
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
        </>
    )
}