import axios from 'axios';

export const getDogs = () => dispatch => {
    return fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(json => dispatch({
            type: 'GET_DOGS',
            payload: json
        }))
}

// export function getDogs() {
//     return async function (dispatch) {
//       var json = await axios.get('http://localhost:3001/dogs');
//       return dispatch({
//         type: 'GET_DOGS',
//         payload: json.data,
//       });
//     };
//   }

export const getTemperaments = () => dispatch => {
    return fetch('http://localhost:3001/temperament')
        .then(res => res.json())
        .then(json => dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json
        }))
}

// export const getTemperaments = () => async dispatch => {
//     const temperaments = await axios.get('http://localhost:3001/temperament')
//     return dispatch({
//         type: 'GET_TEMPERAMENTS',
//         payload: temperaments.data
//     })
// }


export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

// export function orderBy(payload) {
//     return {
//         type: 'ORDER_BY',
//         payload
//     }
// }

export function filterByTemt(payload) {
    return {
        type: 'FILTER_BY_TEMT',
        payload
    }
}


export const getDogsByName = name => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: 'GET_DOGS_BY_NAME',
            payload: response.data,
        });
    } catch (error) {
        dispatch({type:'GET_DOGS_BY_NAME', payload: []});
        console.log(error);
    }
};

export const getDogById = id => async dispatch => {
    return fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(json => dispatch({
            type: 'DETAIL_DOG',
            payload: json
        }))
}

// export function getDogById(id) {
//     return async function (dispatch) {
//         var json = await axios.get(`http://localhost:3001/dogs/${id}`);
//         return dispatch({
//             type: 'DETAIL_DOG',
//             payload: json.data,
//         });
//     }
// }

export function createDog(data) {
    return async function (dispatch) {
        try{
            const results = await axios.post('http://localhost:3001/dog',data);
            dispatch( {
                type: 'CREATE_BREED',
                payload: results.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
}

export function cleanDog(payload) {
    return {
        type: 'CLEAN_DOG',
        payload
    }
}

export function deleteDog(id) {
    return async function (dispatch) {
        try{
            const results = await axios.delete(`http://localhost:3001/delete/${id}`);
            return dispatch({
                type: 'DELETE_DOG',
                payload: results.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
}