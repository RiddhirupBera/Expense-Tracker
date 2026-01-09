import {Schema, model, models} from 'mongoose';

const ExpenseSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    amount : {
        type : Number,
        required : [true, 'Amount is required']
    },
    category : {
        type : String,
        required : [true, 'Category is required']
    },
    date : {
        type : String,
        required : [true, 'Date is required']
    },
})

const Expense = models.Expense || model('Expense',ExpenseSchema);
export default Expense;