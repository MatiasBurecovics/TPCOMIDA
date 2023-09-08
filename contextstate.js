import React, { useContext } from 'react';


export const initialState = {
    loading: true,
    user: {
        email: "",
        password: "",
        token: "",
    },
};

export const ActionTypes = {
    SetLoading: "SET_LOADING",
    SetUser: "SET_USER",
    SetEmail: "SET_EMAIL",
    SetPassword: "SET_PASSWORD",
    SetToken: "SET_TOKEN",

    
};


export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SetLoading:
            return {
                ...state,
                loading: action.value,
            };
        case ActionTypes.SetUser:
            return {
                ...state,
                user: action.value,
            };
        case ActionTypes.SetEmail:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.value,
                }
            };
        case ActionTypes.SetPassword:
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.value,
                }
            };
        case ActionTypes.SetToken:
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.value,
                }
            };
    }
}

export const initialContext = {
    contextState: initialState,
    setContextState: () => { },
};

const Cont = React.createContext(initialContext);

export function ContextProvider({ children, initial = initialState }) {
    const [state, dispatch] = React.useReducer(reducer, initial);

    const contextState = state;
    const setContextState = dispatch;

    return <Cont.Provider value={{ contextState, setContextState }}>{children}</Cont.Provider>

}

export const useContextState = () => useContext(Cont);
