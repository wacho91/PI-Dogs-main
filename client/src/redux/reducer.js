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

        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }

        case 'DETAIL_DOG':  
            return {
                ...state,
                details: action.payload
            }

        case 'CLEAN_DOG':
            return {
                ...state,
                details: []
            }

        case 'CREATE_BREED':
            return{
                ...state
            }

        case 'DELETE_DOG':
            return{
                ...state,
            }

        // case 'ORDER_BY':
        //     let orderSort;
        //     if(action.payload === 'asc'){
        //         orderSort = state.dogs.sort(function(a, b) {
        //             if (a.name.toLowerCase() > b.name.toLowerCase()) {
        //                 return 1;
        //             }
        //             if (b.name.toLowerCase() > a.name.toLowerCase()) {
        //                 return -1;
        //             }
        //                 return 0;
        //         })
        //     }else if(action.payload === 'desc'){
        //         orderSort = state.dogs.sort(function(a, b) {
        //             if (a.name.toLowerCase() > b.name.toLowerCase()) {
        //                 return -1;
        //             }
        //             if (b.name.toLowerCase() > a.name.toLowerCase()) {
        //                 return 1;
        //             }
        //                 return 0;
        //         })
        //     }else if(action.paylod === 'min') {
        //         orderSort = state.dogs.sort(function(a, b){
        //             if (!a.weight_min || !a.weight_max) { //para que me ponga al final todos los que no tienen weight
        //                 return 1
        //             }
        //             if ((a.weight_min + a.weight_max) > (b.weight_min + b.weight_max)){
        //                 return 1;
        //             }   
        //             if ((b.weight_min + b.weight_max) > (a.weight_min + a.weight_max)){
        //                 return -1;
        //             }
        //                 return 0
        //         })
        //     }else {
        //         orderSort = state.dogs.sort(function(a, b) {
        //             if ((a.weight_min + a.weight_max) > (b.weight_min + b.weight_max)){
        //                 return -1;
        //             }
        //             if ((b.weight_min + b.weight_max) > (a.weight_min + a.weight_max)){
        //                 return 1;
        //             }
        //             return 0
        //         })
        //     }return {
        //         ...state,
        //         dogs: orderSort
        //     }    

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