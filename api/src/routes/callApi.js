const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;


const infoApi = async() => {
    let dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const apiInfo = dataApi.data.map(response => {
        return {
            id: response.id,
            name: response.name,
            weight_min: parseInt(response.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(response.weight.metric.slice(4).trim()),
            height_min: parseInt(response.height.metric.slice(0, 2).trim()),
            height_max: parseInt(response.height.metric.slice(4).trim()),
            life_span: response.life_span,
            image: response.image.url,
            temperament: response.temperament
        }
    });
    return apiInfo;
}

const infoDb = async() => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
}

const allDogs = async() => {
    const apiInfo = await infoApi();
    const dbInfo = await infoDb();
    const info = [...apiInfo, ...dbInfo];
    return info;
}

module.exports = {
    allDogs,
    infoDb,
    infoApi
}