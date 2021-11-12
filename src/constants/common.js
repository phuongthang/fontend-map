const common = {
    MAP_STYLE: 'mapbox://styles/mapbox/streets-v11',
    VIEW_PORT: {
        width: "100vw",
        height: "100vh",
        latitude: 10.8619585399423,
        longitude: 106.74362380706191,
        zoom: 12
    },
    MAP_BOX_API_ACCESS_TOKEN: 'pk.eyJ1IjoicGh1b25ndGhhbmciLCJhIjoiY2t2M3E0OHVvMDM1MjJ2bzhraXlpbzdmMyJ9.CjQAhrUY-8P6UcT9Sr7JMQ',
    TYPE:{
        COVID: 1,
        LOCKDOWN: 2,
        VACCINE: 3,
        HOSPITAL: 4,
        MARKET:5,
        SUPERMARKET:6,

    },
    MAPPING_TYPE: {
        1 : 'covids',
        2: 'lockdowns',
        3: 'vaccines',
        4: 'hospitals',
        5: 'markets',
        6: 'supermarkets'
    },

    MAPPING_TYPE_CODE: {
        1: 'Ổ Dịch',
        2: 'Khu phong tỏa',
        3: 'Điểm tiêm chủng',
        4: 'Điểm xét nghiệm',
        5: 'Chợ',
        6: 'Siêu thị'
    },
    URL_IMG: 'http://127.0.0.1:8000'
}

export default common;