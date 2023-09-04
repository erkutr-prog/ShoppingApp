export interface FirebaseUserType {
    displayName: string;
    email: string;
    phoneNumber: string;
    password: string;
    secondPassword: string;
}

export type UserActions = {
    type: 'setMail' | 'setPassword' | 'setName' | 'setPhoneNumber' | 'setSecondPassword',
    payload: string
}