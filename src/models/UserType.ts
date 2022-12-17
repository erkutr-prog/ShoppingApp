export interface IUser {
    address: address,
    id: Number,
    email: string,
    username: string,
    password: string,
    name: UserName,
    phone: string,
    __v: Number,
}

export type address = {
    geolocation: geolocation,
    city: string,
    street: string,
    number: Number,
    zipcode: string,
}

export type geolocation = {
    lat: string,
    long: string,
}

export type UserName = {
    firstname: string,
    lastname: string,
}