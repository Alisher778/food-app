const initialState = {};

const admin = (state = initialState, action) => {
    const {data} = action;
    switch(action.type) {
        case "FETCH_ADMIN" :
            return {...state, 
                admin: data.authenticated,
                authLinks: data.authUrls,
                isLogged: data.isLogged,
                userId: data.userId,
                userName: data.userName,
                userToken: data.userToken,
            }
       default:
       return state;
    }
    
}

export default admin;
