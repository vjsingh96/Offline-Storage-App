
const INITIAL_STATE = {
    countries :[],
    country : null
};
const firstForm = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COUNTRIES':
        return { ...state, countries: action.payload };

        case 'COUNTRY':
        return {...state,country : action.payload}
        default: {
            return state // We return the default state here
        }
    }
}

export default firstForm;