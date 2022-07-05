const { default: axios } = require('axios');
const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { infoApi, allDogs } = require('./callApi');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', async(req, res) => {
    const { name } = req.query; //recibo la raza por query
    const totalDogs=await allDogs(); //obtengo todos los perros
    if(name) {
        let dogName = await totalDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())); //filtro por nombre

        dogName.length ? //Si tengo algo
        res.status(200).send(dogName) : //envio el resultado
        res.status(404).send('Sorry, that breed is not available. Try again ❤')
    } else {
        res.status(200).send(totalDogs); //envio todos los perros
    }
})

router.get('/dogs/:id', (req, res) => {
    const { id } = req.params;
    allDogs()
    .then(dogs => {
        if(id) {
            let raza = dogs.filter(d => d.id == id);
            raza.length
            ? res.status(200).json(raza)
            : res.status(404).send('raza no existente');
        };
    });
})


router.get('/temperament', async(req, res) => {
    var tempsEnds = [] //va a contener los temperamentos por separado (en la API viene como string)
    const apiTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const temperaments = apiTemperament.data.map(t => t.temperament);//agarro lo que este en temperament en la api
    let tempOr = temperaments.map(e => e && e.split(', '));//separo por comas, por que en la api vienen como un string
    let tempArray = tempOr.flat().sort();//.flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada./.sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
    tempArray.map(e => {//mapeo los elementos del array
        if(e !== undefined) { //si el elemento no es undefined
            let tempTrim = e.trim();//trim() elimina espacios en blanco al inicio y al final de un string
            tempsEnds.push(tempTrim);//agrego el elemento a un array
        }
    });
    let finalArrayTemps = tempsEnds.filter((item, index) => {
        return tempsEnds.indexOf(item) === index;//elimino los elementos repetidos
    })

    for(let i = 0; i < finalArrayTemps.length; i++) {
        Temperament.findOrCreate({
            where: { name: finalArrayTemps[i] }
        })
    }

    const allTemps = await Temperament.findAll();
    res.status(200).json(allTemps);
})

module.exports = router;