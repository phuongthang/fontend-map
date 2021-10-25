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
};

export default coordinatesApi;