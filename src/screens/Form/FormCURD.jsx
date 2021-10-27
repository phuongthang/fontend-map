import React, {useState} from 'react';
import create from "../assets/img/create.png";
import update from "../assets/img/update.png";
import view from "../assets/img/view.png";
import unview from "../assets/img/unview.png";
import list from "../assets/img/list.png";
import ModalCreateComponent from "../Modal/ModalCreate";
import ModalListComponent from "../Modal/ModalList";

export default function FormCURDComponent(props) {
    const { showMarker, setShowMarker } = props;
    const [modalCreate, setModalCreate] = useState(false);
    const toggleModalCreate = () => {
        setModalCreate(!modalCreate);
    }

    const [modalList, setModalList] = useState(false);
    const toggleModalList = () => {
        setModalList(!modalList);
    }

    const _onClickChangeState = (name, value) => {
        setShowMarker((prevState) => ({
            ...prevState,
            [name]: !value,
        }));
    }
    return (
        <>
            <ul className="d-flex">
                <div className="box-title">
                    <h5>Cập nhật thông tin</h5>
                </div>
                <li>
                    <label onClick={toggleModalList}>
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
                    <label onClick={()=>window.location.reload()}>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={update} alt="" />
                        </div>
                    </label>
                </li>
                <li onClick={() => _onClickChangeState("all", showMarker.all)}>
                    <label>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={showMarker.all ? view : unview} alt="" />
                        </div>
                    </label>
                </li>
            </ul>
            {
                modalCreate && <ModalCreateComponent modal={modalCreate} toggle = {toggleModalCreate}/>
            }
            {
                modalList && <ModalListComponent modal={modalList} toggle = {toggleModalList}/>
            }
        </>
    )
}