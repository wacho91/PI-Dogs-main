const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;


const infoApi = async() => {
    let dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const apiInfo = dataApi.data.map(d => {
        return {
            id: d.id,
            name: d.name,
            weight_min: parseInt(d.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(d.weight.metric.slice(4).trim()),
            height_min: parseInt(d.height.metric.slice(0, 2).trim()),
            height_max: parseInt(d.height.metric.slice(4).trim()),
            life_span: d.life_span,
            image: d.image.url,
            temperament: d.temperament
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