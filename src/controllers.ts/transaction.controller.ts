import { Request, Response } from 'express'
import TransactionRepositorie from '../models/repositories/transaction.repositorie'
import { Transaction } from '../models/transaction'

class TransactionController {
  constructor(private transactionRepositorie: TransactionRepositorie) {}

  createMany = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactions: Array<Transaction> = req.body as Transaction[]
      const savedTransactions =
        await this.transactionRepositorie.createMany(transactions)
      res.status(200).json({ data: savedTransactions })
    } catch (error: any) {
      const statusCode = error instanceof Error ? 500 : 400
      res.status(statusCode).json({ message: error.message })
    }
  }

  createOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactions: Transaction = req.body as Transaction
      const savedTransactions =
        await this.transactionRepositorie.createOne(transactions)
      res.status(200).json({ data: savedTransactions })
    } catch (error: any) {
      const statusCode = error instanceof Error ? 500 : 400
      res.status(statusCode).json({ message: error.message })
    }
  }

  getSummary = async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await this.transactionRepositorie.getTransactionSummary()
      res.status(200).json(summary)
    } catch (error: any) {
      const statusCode = error instanceof Error ? 500 : 400
      res.status(statusCode).json({ message: error.message })
    }
  }
}

export default TransactionController
