const initialState = {
    authLinks: [{url: "/sign-up", title: "Sign Up", btnId: 'sign-up-btn'}, {url: "/sign-in", title: "Sign In", btnId: 'sign-in-btn'}],
    authenticated: false,
    isLogged: false,
    userId: null,
    userName: null,
    userToken: null
}

const verefiyToken = (state = initialState, action) => {
    const {data} = action;
    switch(action.type) {
        case "VERIFY_TOKEN" :
            return {...state, 
                authenticated: data.authenticated,
                authLinks: data.authUrls,
                isLogged: data.isLogged,
                userId: data.userId,
                userName: data.userName,
                userToken: data.userToken,
            }
        case "SIGN_UP":
            return {...state, 
                authenticated: data.authenticated,
                authLinks: data.authUrls,
                isLogged: data.isLogged,
                userId: data.userId,
                userName: data.userName,
                userToken: data.userToken,
            }
        case "SIGN_IN":
            return {...state, 
                authenticated: data.authenticated,
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

export default verefiyToken;
