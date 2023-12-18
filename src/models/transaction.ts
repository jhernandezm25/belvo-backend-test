import mongoose, { Schema, Document } from 'mongoose'

export interface Transaction {
  reference: string
  date: Date
  amount: number
  type: 'inflow' | 'outflow'
  category: string
  user_email: string
}

export interface TransactionDocument extends Transaction, Document {}

const TransactionSchema: Schema = new Schema({
  reference: {
    type: String,
    index: {
      unique: true,
      sparse: true,
    },
    required: true,
  },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['inflow', 'outflow'], required: true },
  category: { type: String, required: true },
  user_email: { type: String, required: true },
})

export const TransactionModel = mongoose.model<TransactionDocument>(
  'Transaction',
  TransactionSchema,
)
