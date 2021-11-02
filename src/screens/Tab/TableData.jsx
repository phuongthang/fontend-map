import React , {useState} from "react";

//icon
import view from "../assets/img/view.png";
import unview from "../assets/img/unview.png";

//Component
import ModalChangeStatus from "../Modal/ModalChangeStatus";

function TableData(props) {

    /**
     * get property
     */
    const { data, type } = props;

    /**
     * defined state
     */
    const [dataItem, setDataItem] = useState();
    const [modalChangeStatus, setModalChangeStatus] = useState(false);

    /**
     * event open modal change status
     */
    const toggleModalChangeStatus = (item) => {
        setDataItem(item);
        setModalChangeStatus(!modalChangeStatus);
    }

    /**
     * render template
     */
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.map((item) => (
                            <tr className="text-center" key={item.id}>
                                <th scope="row">{data.indexOf(item) + 1}</th>
                                <td>{item.address}</td>
                                <td>{item.latitude}</td>
                                <td>{item.longitude}</td>
                                <td><img onClick={()=>toggleModalChangeStatus(item)} crossOrigin="anonymous" className="image-content" src={item.delete_flag ? unview  : view} alt="" /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                modalChangeStatus && <ModalChangeStatus modal= {modalChangeStatus} toggle = {toggleModalChangeStatus} data = {dataItem} type ={type}/>
            }
        </>
    );
}
export default TableData;