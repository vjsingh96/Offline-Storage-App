
const INITIAL_STATE = {
    imageUri: null
};
const selectImage = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IMAGE':
            return { ...state, imageUri: action.payload };

        default: {
            return state // We return the default state here
        }
    }
}

export default selectImage;