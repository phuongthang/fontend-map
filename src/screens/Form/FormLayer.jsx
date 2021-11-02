import React from 'react';
//icon
import hospital from "../assets/img/hospital.png"
import vaccine from "../assets/img/vaccine.png"
import covid from "../assets/img/covid.png"
import lockdown from "../assets/img/lockdown.png"
import market from "../assets/img/market.png"
import supermarket from "../assets/img/supermarket.png"

export default function FormLayerComponent(props) {

    /**
     * get property
     */
    const { showMarker, setShowMarker } = props;

    /**
     * event control change state
     */
    const _onClickChangeState = (name, value) => {
        setShowMarker((prevState) => ({
            ...prevState,
            [name]: !value,
        }));
    }

    /**
     * render template
     */
    return (
        <>
            <ul>
                <div className="box-title">
                    <h5>Thông tin dịch bệnh</h5>
                </div>
                <li onClick={() => _onClickChangeState("covid", showMarker.covid)}>
                    <label className="d-flex">
                        <span className={`${showMarker.covid ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={covid} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Ổ dịch</label>
                    </label>
                </li>
                <li onClick={() => _onClickChangeState("lockdown", showMarker.lockdown)}>
                    <label className="d-flex">
                        <span className={`${showMarker.lockdown ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={lockdown} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Vùng phong tỏa</label>
                    </label>
                </li>
                <div className="box-title">
                    <h5>Cơ sở y tế</h5>
                </div>
                <li onClick={() => _onClickChangeState("vaccine", showMarker.vaccine)}>
                    <label className="d-flex">
                        <span className={`${showMarker.vaccine ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={vaccine} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Điểm tiêm chủng</label>
                    </label>
                </li>
                <li onClick={() => _onClickChangeState("hospital", showMarker.hospital)}>
                    <label className="d-flex">
                        <span className={`${showMarker.hospital ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={hospital} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Điểm xét nghiệm</label>
                    </label>
                </li>
                <div className="box-title">
                    <h5>Dịch vụ thiết yếu</h5>
                </div>
                <li onClick={() => _onClickChangeState("market", showMarker.market)} >
                    <label className="d-flex">
                        <span className={`${showMarker.market ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={market} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Chợ</label>
                    </label>
                </li>
                <li onClick={() => _onClickChangeState("supermarket", showMarker.supermarket)} >
                    <label className="d-flex">
                        <span className={`${showMarker.supermarket ? '' : 'active'}`}></span>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={supermarket} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Siêu thị</label>
                    </label>
                </li>
                <hr />
            </ul>
        </>
    )
}