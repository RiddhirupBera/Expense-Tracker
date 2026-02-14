import {Schema, model, models} from 'mongoose';
import mongoose from 'mongoose';

const SplitSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: [true, 'Expense name is required']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0
  },
  paidBy: {
    type: String,
    required: [true, 'Paid by is required'],
    trim: true
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
    }
  }]
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

const Split = models.Split || model('Split', SplitSchema);
export default Split;