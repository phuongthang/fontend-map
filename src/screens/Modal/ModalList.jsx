import React, {useState, useEffect} from "react";
//Packet
import { Button, Modal } from "reactstrap";

//Api
import coordinatesApi from "../api/coordinatesApi";

//Component
import TableData from "../Tab/TableData";

//Constants
import Common from './../../constants/common';
import Constants from './../../constants/constants';

function ModalListComponent(props) {
    /**
     * get property
     */
    const { modal, toggle } = props;

    /**
     * defined state
     */
    const [typeTab, setTypeTab] = useState(Common.TYPE.COVID);
    const [allData, setAllData] = useState();
    const [data, setData] = useState();

    /**
     * open select tab
     */
    const _onClickSetTypeTab = (typeTab) => {
        setData(allData[Common.MAPPING_TYPE[typeTab]]);
        setTypeTab(typeTab);
    }

    /**
     * init data
     */
     useEffect(() => {
        const getListCoordinates = () => {
            coordinatesApi.getAllCoordinates().then((response) => {
                let mounted = true;
                if (mounted) {
                    if (response.status === Constants.HTTP_STATUS.OK) {
                        setAllData(response.data);
                        setData(response.data.covids);
                    }
                }
                return () => mounted = false;
            }, (error) => {
                let mounted = true;
                return () => mounted = false;
            });
        }

        getListCoordinates();
    }, [])

    /**
     * render template
     */
    return (
        <>
            <Modal
                isOpen={modal}
                className="modal-list">
                <div class="layout">
                    <div className="tab">
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.COVID)}} 
                            className={`tab-item ${typeTab === Common.TYPE.COVID ? 'active' : '' }`}>
                            <span>Vùng dịch</span>
                        </div>
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.LOCKDOWN)}} 
                            className={`tab-item ${typeTab === Common.TYPE.LOCKDOWN ? 'active' : '' }`}>
                            <span>Khu cách ly</span>
                        </div>
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.VACCINE)}} 
                            className={`tab-item ${typeTab === Common.TYPE.VACCINE ? 'active' : '' }`}>
                            <span>Điểm tiêm chủng</span>
                        </div>
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.HOSPITAL)}} 
                            className={`tab-item ${typeTab === Common.TYPE.HOSPITAL ? 'active' : '' }`}>
                            <span>Điểm xét nghiệm</span>
                        </div>
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.MARKET)}} 
                            className={`tab-item ${typeTab === Common.TYPE.MARKET ? 'active' : '' }`}>
                            <span>Chợ</span>
                        </div>
                        <div onClick={()=>{_onClickSetTypeTab(Common.TYPE.SUPERMARKET)}} 
                            className={`tab-item ${typeTab === Common.TYPE.SUPERMARKET ? 'active' : '' }`}>
                            <span>Siêu thị</span>
                        </div>
                    </div>
                    <div className="content mt-5">
                        <TableData data = {data} type={typeTab}/>
                    </div>
                </div>

                <div className="text-center box-modal-action">
                    <Button onClick={toggle} className="btn btn-sm btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalListComponent;