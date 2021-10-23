import React from 'react';
import hospital from "../assets/img/hospital.png"
import vaccine from "../assets/img/vaccine.png"
import covid from "../assets/img/covid.png"
import lockdown from "../assets/img/lockdown.png"
import market from "../assets/img/market.png"
import supermarket from "../assets/img/supermarket.png"

export default function FormComponent() {
    return (
        <>
            <ul>
                <div className="box-title">
                    <h5>Thông tin dịch bệnh</h5>
                </div>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={covid} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Ổ dịch</label>
                    </label>
                </li>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={lockdown} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Vùng phong tỏa</label>
                    </label>
                </li>
                <div className="box-title">
                    <h5>Cơ sở y tế</h5>
                </div>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={vaccine} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Điểm tiêm chủng</label>
                    </label>
                </li>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={hospital} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Điểm xét nghiệm</label>
                    </label>
                </li>
                <div className="box-title">
                    <h5>Dịch vụ thiết yếu</h5>
                </div>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={market} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Chợ</label>
                    </label>
                </li>
                <li>
                    <label className="d-flex">
                        <input type="checkbox" name="" />
                        <div class="icon-box image-container">
                            <img crossOrigin="anonymous" class="image-content" src={supermarket} alt="" />
                        </div>
                        <label htmlFor="" className="mx-3 label-feature">Siêu thị</label>
                    </label>
                </li>
                <hr />
            </ul>
        </>
    )
}