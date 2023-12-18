import { Transaction, TransactionModel } from '../transaction'
import ITransaction from '../interfaces/transaction.interface'

class TransactionRepositorie implements ITransaction {
  createMany(transactionData: Transaction[]): Promise<(Transaction | null)[]> {
    return TransactionModel.insertMany(transactionData)
  }
  createOne(transactionData: Transaction): Promise<Transaction | null> {
    return TransactionModel.create(transactionData)
  }
}

export default TransactionRepositorie
