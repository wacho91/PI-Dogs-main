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
            

        default: 
            return state;

    }
}

export default rootReducer;