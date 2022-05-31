export interface ICompanyUpdate {
    address?: string
    identificationCode?: string
    phoneNumber?: string
    dataOfEstablishment?: Date
    rating?: number
    password?: string
    logo?: Express.Multer.File
    salt?: string
}