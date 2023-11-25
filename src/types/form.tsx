export interface userPassForms{
    email: string,
    password: string,
    salt: string,
    emailMessage:string,
    passwordMessage:string,
    successMessage:string,
}

export interface pictureForm{
    id: number,
    file_name: string,
    file_type: string,
    picTitle: string,
    pictDescription: string,
    data: string,
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