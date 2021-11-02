import React, {useState} from 'react';
//icon
import create from "../assets/img/create.png";
import view from "../assets/img/view.png";
import unview from "../assets/img/unview.png";
import list from "../assets/img/list.png";
import road from "../assets/img/road.png";

//Component
import ModalCreateComponent from "../Modal/ModalCreate";
import ModalListComponent from "../Modal/ModalList";
import ModalCaculatorRoadComponent from '../Modal/ModalCaculatorRoad';

export default function FormCURDComponent(props) {
    /**
     * get property
     */
    const { showMarker, setShowMarker } = props;

    /**
     * get defined state
     */
    const [modalCreate, setModalCreate] = useState(false);
    const [modalList, setModalList] = useState(false);
    const [modalCaculator, setModalCaculator] = useState(false);

    /**
     * event control open modal create
     */
    const toggleModalCreate = () => {
        setModalCreate(!modalCreate);
    }

    /**
     * event control open modal list
     */
    const toggleModalList = () => {
        setModalList(!modalList);
    }

    /**
     * event control open modal caculator distance
     */
    const toggleModalCaculator = () => {
        setModalCaculator(!modalCaculator);
    }

    /**
     * event change state marker
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
                    <label onClick={() => _onClickChangeState("all", showMarker.all)}>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={showMarker.all ? view : unview} alt="" />
                        </div>
                    </label>
                </li>
                <li>
                    <label onClick={toggleModalCaculator}>
                        <div className="icon-box image-container">
                            <img crossOrigin="anonymous" className="image-content" src={road} alt="" />
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
            {
                modalCaculator && <ModalCaculatorRoadComponent modal = {modalCaculator} toggle = {toggleModalCaculator}/>
            }
        </>
    )
}