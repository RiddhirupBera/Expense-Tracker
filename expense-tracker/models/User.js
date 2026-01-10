import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    username : {
        type : String,
        required : [true, 'Name is required']
    },
    password : {
        type : Number,
        required : [true, 'Amount is required']
    }
})

const User = models.User || model('User',UserSchema);
export default User;