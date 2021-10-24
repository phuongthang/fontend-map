import React, {useState} from 'react';
import create from "../assets/img/create.png";
import update from "../assets/img/update.png";
import trash from "../assets/img/trash.png";
import list from "../assets/img/list.png";
import ModalCreateComponent from "../Modal/ModalCreate";

export default function FormCURDComponent() {
    const [modalCreate, setModalCreate] = useState(false);
    const toggleModalCreate = () => {
        setModalCreate(!modalCreate);
    }
    return (
        <>
            <ul className="d-flex">
                <div className="box-title">
                    <h5>Cập nhật thông tin</h5>
                </div>
                <li>
                    <label>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={list} alt="" />
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={toggleModalCreate}>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={create} alt="" />
                        </div>
                    </label>
                </li>
                <li>
                    <label>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={update} alt="" />
                        </div>
                    </label>
                </li>
                <li>
                    <label>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={trash} alt="" />
                        </div>
                    </label>
                </li>
            </ul>
            {
                modalCreate && <ModalCreateComponent modal={modalCreate} toggle = {toggleModalCreate}/>
            }
        </>
    )
}