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

export const getTemperaments = () => async dispatch => {
    const temperaments = await axios.get('http://localhost:3001/temperament')
    return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: temperaments.data
    })
}

// export function getTemperaments() {
//     return async function (dispatch) {
//       var temp = await axios.get('http://localhost:3001/temperament');
//       return dispatch({
//         type: 'GET_TEMPERAMENTS',
//         payload: temp.data,
//       });
//     };
// }