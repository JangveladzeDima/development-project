export interface IDesigner {
    ID: number,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    salt: string,
    birthday: Date,
    address: string,
    phone: number,
    isFree: boolean,
    rating: number,
    avatarID: number,
    user: number
}