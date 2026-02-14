import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : [true, 'Username is required']
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    borrowedExpenses : [{
        expenseId : {
            type : Schema.Types.ObjectId,
        },
        expenseName : {
            type : String,
        },
        amount : {
            type : Number,
        },
        lender : {
            type : String,
        },
        isPaid : {
            type : Boolean,
            default : false
        },
        paidAt : {
            type : Date
        }
    }],
    lendedExpenses : [{
        expenseId : {
            type : Schema.Types.ObjectId,
        },
        expenseName : {
            type : String,
        },
        amount : {
            type : Number,
        },
        borrowers: [{
            username: {
                type: String,
                required: [true, 'Borrower username is required'],
                trim: true
            },
            amount: {
                type: Number,
                required: [true, 'Borrower amount is required'],
                min: 0
            },
            isPaid: {
                type: Boolean,
                default: false
            },
            paidAt: {
                type: Date
            }
        }]
    }]
})

const User = models.User || model('User',UserSchema);
export default User;