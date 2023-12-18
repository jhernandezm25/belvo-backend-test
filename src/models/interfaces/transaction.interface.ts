import { Transaction } from '../transaction'

interface ITransaction {
  createMany(
    transactionData: Array<Transaction>,
  ): Promise<Array<Transaction | null>>
  createOne(transactionData: Transaction): Promise<Transaction | null>
  getTransactionSummary(): Promise<any[]>
}

export default ITransaction
