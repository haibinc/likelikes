export interface userPassForms{
    email: string,
    password: string,
    salt: string,
    emailMessage:string,
    passwordMessage:string,
    successMessage:string,
}

export type Action =  {type: 'SET_FIELD'; field: string; value: string }

export const changeForm = (state:userPassForms, action: Action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        default:
            return state;
    }
}