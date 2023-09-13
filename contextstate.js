import React, { useContext } from 'react';


export const initialState = {
    loading: true,
    user: {
        email: "",
        password: "",
        token: "",
    },
    plato:
    {
id:"",
title: "",
image:"", 
imageType:""
    },
    menu:[]
};

export const ActionTypes = {
    SetLoading: "SET_LOADING",
    SetUser: "SET_USER",
    SetEmail: "SET_EMAIL",
    SetPassword: "SET_PASSWORD",
    SetToken: "SET_TOKEN",
    SetPlato: "SET_PLATO",
    SetId: "SET_ID",
    SetImage: "SET_IMAGE",
    SetImageType: "SET_IMAGE_TYPE",
    SetTitle:"SET_TITLE"

    
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
            case ActionTypes.SetId:
                return {
                    ...state,
                    plato: {
                        ...state.plato,
                        id: action.value,
                    }
                };
            case ActionTypes.SetImage:
                return {
                    ...state,
                    plato: {
                        ...state.plato,
                        image: action.value,
                    }
                };
            case ActionTypes.SetImageType:
                return {
                    ...state,
                    plato: {
                        ...state.plato,
                        imageType: action.value,
                    }
                };
            case ActionTypes.SetTitle:
                return {
                    ...state,
                    plato: {
                        ...state.plato,
                        title: action.value,
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
