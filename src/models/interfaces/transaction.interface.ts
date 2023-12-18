import { Transaction } from '../transaction'

interface ITransaction {
  createMany(
    transactionData: Array<Transaction>,
  ): Promise<Array<Transaction | null>>
  createOne(transactionData: Transaction): Promise<Transaction | null>
  getTransactionSummary(): Promise<any[]>
  getUserSummaryByCategory(userEmail: string): Promise<any>
  userExists(userEmail: string): Promise<boolean>
  getAllTransactions(): Promise<Transaction[]>
}

export default ITransaction
