import * as mongoose from 'mongoose'

export interface IUserModel extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
   name:{
       type: String
   },
   email: {
       type: String,
       unique: true
   },
   password: {
       type: String,
       select: false
   } 
})

export const User = mongoose.model<IUserModel>('User', userSchema)

// const users = [
//     { id: '1', name: 'Tony Stark', email: 'stark@marvel.com' },
//     { id: '2', name: 'Peter Parker', email: 'peter@marvel.com' },
//     { id: '3', name: 'Bruce Banner', email: 'bruce@marvel.com' }
// ]

// export class User {
//     //Utilizado para testes
//     static findAll(): Promise<any[]>{
//         return Promise.resolve(users)
//     }

//     static findById(id: string): Promise<any>{
//         return new Promise(resolve => {
//             const filtered = users.filter(user => user.id === id)
//             let user = filtered.length > 0 ? filtered[0] : null
//             resolve(user)
//         })
//     }
// }