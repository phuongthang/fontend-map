import axiosClient from '../api/axiosClients';
const coordinatesApi = {
    registerCoordinates(params) {
        const url = `/coordinates/create`;
        return axiosClient.post(url,params);
    },

    getListCoordinates() {
        const url = `/coordinates/list`;
        return axiosClient.get(url);
    },

    getAllCoordinates() {
        const url = `/coordinates/all`;
        return axiosClient.get(url);
    },

    changeStatusCoordinates(params) {
        const url = `/coordinates/change`;
        return axiosClient.post(url, params);
    },
};

export default coordinatesApi;