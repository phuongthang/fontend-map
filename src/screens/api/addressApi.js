import axiosClient from '../api/axiosClients';
const addressApi = {
    getProvinceApi() {
        const url = `/address/province`;
        return axiosClient.get(url);
    },
    getDistrictApi(id) {
        const url = `/address/district/${id}`;
        return axiosClient.get(url);
    },
    getWardApi(id) {
        const url = `/address/ward/${id}`;
        return axiosClient.get(url);
    },
    getStreetApi(id) {
        const url = `/address/street/${id}`;
        return axiosClient.get(url);
    },

    getCoordinatesApi(address) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGh1b25ndGhhbmciLCJhIjoiY2t2M3E0OHVvMDM1MjJ2bzhraXlpbzdmMyJ9.CjQAhrUY-8P6UcT9Sr7JMQ`;
        return axiosClient.get(url);
    },

    getDistanceApi(pointA, pointB, method) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/${method}/${pointA.longitude},${pointA.latitude};${pointB.longitude},${pointB.latitude}?access_token=pk.eyJ1IjoicGh1b25ndGhhbmciLCJhIjoiY2t2M3E0OHVvMDM1MjJ2bzhraXlpbzdmMyJ9.CjQAhrUY-8P6UcT9Sr7JMQ`;
        return axiosClient.get(url);
    },
};

export default addressApi;