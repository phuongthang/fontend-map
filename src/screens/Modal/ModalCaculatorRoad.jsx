import React, { useState, useEffect } from 'react';
import Constants from '../../constants/constants';
import addressApi from '../api/addressApi';
import ModalNotification from './ModalNotification';
import ModalSubmit from './ModalSubmit';
import ModalGetDistanceComponent from './ModalGetDistance';

export default function ModalCaculatorRoadComponent(props) {
    const { toggle } = props;
    const [viewProvincePointA, setViewProvincePointA] = useState();
    const [viewDistrictPointA, setViewDistrictPointA] = useState();
    const [viewWardPointA, setViewWardPointA] = useState();
    const [viewStreetPointA, setViewStreetPointA] = useState();
    const [viewProvincePointB, setViewProvincePointB] = useState();
    const [viewDistrictPointB, setViewDistrictPointB] = useState();
    const [viewWardPointB, setViewWardPointB] = useState();
    const [viewStreetPointB, setViewStreetPointB] = useState();
    const [modalGetDistance, setModalGetDistance] = useState(false);

    const toggleModalGetDistance = () => {
        setModalGetDistance(!modalGetDistance);
    }

    const [pointA, setpointA] = useState({
        province: 0,
        district: 0,
        ward: 0,
        street: 0,
        address: '',
        longitude: '',
        latitude: ''
    })

    const [pointB, setpointB] = useState({
        province: 0,
        district: 0,
        ward: 0,
        street: 0,
        address: '',
        longitude: '',
        latitude: ''
    })


    const _onChangeSelectBoxPointA = (e) => {
        const fieldName = e.target.name;
        const fieldValueArray = e.target.value.split('!');
        const fieldIdpointA = fieldValueArray[0];
        const fieldValuepointA = fieldValueArray[1];
        setpointA((prevState) => ({
            ...prevState,
            [fieldName]: {
                id: fieldIdpointA,
                value: fieldValuepointA
            },
        }));
    }

    const _onChangeSelectBoxPointB = (e) => {
        const fieldName = e.target.name;
        const fieldValueArray = e.target.value.split('!');
        const fieldIdpointB = fieldValueArray[0];
        const fieldValuepointB = fieldValueArray[1];
        setpointB((prevState) => ({
            ...prevState,
            [fieldName]: {
                id: fieldIdpointB,
                value: fieldValuepointB
            },
        }));
    }

    const getCoordinatesFromAddress = (point) => {
        let address = `Đường ${point?.street?.value} ${point?.ward?.value} ${point?.district?.value} thành phố ${point?.province?.value}`;
        return address;
    }

    const getCoordinatesFromApi = (address, setValue) => {
        addressApi.getCoordinatesApi(address).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setValue((prevState) => ({
                    ...prevState,
                    address: address,
                    longitude: response.data.features[0].center[0],
                    latitude: response.data.features[0].center[1]
                }));
            }
        }, (error) => {
            //
        });

    }

    const getInforPoint = async () => {
        let addressPointA = getCoordinatesFromAddress(pointA);
        let addressPointB = getCoordinatesFromAddress(pointB);
        await getCoordinatesFromApi(addressPointA, setpointA);
        await getCoordinatesFromApi(addressPointB, setpointB);

        toggleModalGetDistance();

    }
    const getProvinceApi = () => {
        addressApi.getProvinceApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setViewProvincePointA(response.data.province.map(item => (
                    <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                )));
                setViewProvincePointB(response.data.province.map(item => (
                    <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                )));
            }
        }, (error) => {
            //
        });
    }

    useEffect(() => {
        if (pointA.province !== 0) {
            addressApi.getDistrictApi(pointA.province?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewDistrictPointA(response.data.district.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [pointA.province]);
    useEffect(() => {
        if (pointB.province !== 0) {
            addressApi.getDistrictApi(pointB.province?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewDistrictPointB(response.data.district.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [pointB.province]);

    useEffect(() => {
        if (pointA.district !== 0) {
            addressApi.getWardApi(pointA.district?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewWardPointA(response.data.ward.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
            addressApi.getStreetApi(pointA.district?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewStreetPointA(response.data.street.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [pointA.district]);

    useEffect(() => {
        if (pointB.district !== 0) {
            addressApi.getWardApi(pointB.district?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewWardPointB(response.data.ward.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
            addressApi.getStreetApi(pointB.district?.id).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setViewStreetPointB(response.data.street.map(item => (
                        <option key={item.id} value={`${item.id}!${item._name}`}>{item._name}</option>
                    )));
                }
            }, (error) => {
                //
            })
        }
    }, [pointB.district]);

    useEffect(() => {
        getProvinceApi();
    }, []);
    return (
        <>
            <div className="modal-caculator">
                <div className="modal-content">
                    <form>
                        <div className="text-center mb-2">
                            <h5>TÍNH KHOẢNG CÁCH GIỮA HAI ĐIỂM</h5>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h5 className="text-center">ĐIỂM A</h5>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Thành phố:</small>
                                            <select className="form-control" name="province" id="province" onChange={_onChangeSelectBoxPointA}>
                                                <option defaultValue>Chọn Thành phố</option>
                                                {viewProvincePointA}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Quận/Huyện:</small>
                                            <select className="form-control" name="district" id="district" onChange={_onChangeSelectBoxPointA}>
                                                <option defaultValue>Chọn Quận/Huyện</option>
                                                {viewDistrictPointA}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Thị trấn/Xã:</small>
                                            <select className="form-control" name="ward" id="ward" onChange={_onChangeSelectBoxPointA}>
                                                <option defaultValue>Chọn Thị trấn/Xã</option>
                                                {viewWardPointA}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Đường:</small>
                                            <select className="form-control" name="street" id="street" onChange={_onChangeSelectBoxPointA}>
                                                <option defaultValue>Chọn Đường</option>
                                                {viewStreetPointA}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <h5 className="text-center">ĐIỂM B</h5>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Thành phố:</small>
                                            <select className="form-control" name="province" id="province" onChange={_onChangeSelectBoxPointB}>
                                                <option defaultValue>Chọn Thành phố</option>
                                                {viewProvincePointB}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Quận/Huyện:</small>
                                            <select className="form-control" name="district" id="district" onChange={_onChangeSelectBoxPointB}>
                                                <option defaultValue>Chọn Quận/Huyện</option>
                                                {viewDistrictPointB}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Thị trấn/Xã:</small>
                                            <select className="form-control" name="ward" id="ward" onChange={_onChangeSelectBoxPointB}>
                                                <option defaultValue>Chọn Thị trấn/Xã</option>
                                                {viewWardPointB}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <small htmlFor="province">Đường:</small>
                                            <select className="form-control" name="street" id="street" onChange={_onChangeSelectBoxPointB}>
                                                <option defaultValue>Chọn Đường</option>
                                                {viewStreetPointB}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group-button d-flex text-center">
                            <button onClick = {getInforPoint} className="btn btn-sm btn-info" type="button">Lấy thông tin</button>
                            <button className="btn btn-sm btn-danger" type="button" onClick={toggle}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                modalGetDistance && <ModalGetDistanceComponent modal = {modalGetDistance} toggle = {toggleModalGetDistance} pointA = {pointA} pointB = {pointB}/>
            }
        </>
    )
}