const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'ORDER_BY_NAME':
            const sortedName = action.payload === 'asc' ?
            state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedName
            }

        case 'ORDER_BY_WEIGHT':
            const orderByWeight = action.payload === 'min' ?
            state.dogs.sort(function(a, b) {
                if (!a.weight_min || !a.weight_max) { //para que me ponga al final todos los que no tienen weight
                    return 1
                }
                if ((a.weight_min + a.weight_max) > (b.weight_min + b.weight_max)){
                    return 1;
                }
                if ((b.weight_min + b.weight_max) > (a.weight_min + a.weight_max)){
                    return -1;
                }
                return 0
            }) :
            state.dogs.sort(function(a, b) {
                if ((a.weight_min + a.weight_max) > (b.weight_min + b.weight_max)){
                    return -1;
                }
                if ((b.weight_min + b.weight_max) > (a.weight_min + a.weight_max)){
                    return 1;
                }
                return 0
            });
            return{
                ...state,
                dogs: orderByWeight
            }
            
        case 'FILTER_BY_TEMT':
            // let allTemp = state.allDogs;
            // let tempFilter = action.payload === 'all' ? allTemp
            // : allTemp.filter(dog => dog.temperament.includes(action.payload) || dog.temperament.map(e => e.name).includes(action.payload))
            // return {
            //     ...state,
            //     dogs: tempFilter
            // }

            const { allDogs } = state;
            const temperament = action.payload === 'All' ? allDogs : allDogs.filter(d => d.temperament?.includes(action.payload) || d.temperaments?.find(t => t.name === action.payload));
            return {
                ...state,
                dogs: temperament
            }

            
        default: 
            return state;

    }
}

export default rootReducer;