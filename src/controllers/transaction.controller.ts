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
      res.status(500).json({ message: error.message })
    }
  }

  createOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactions: Transaction = req.body as Transaction
      const savedTransactions =
        await this.transactionRepositorie.createOne(transactions)
      res.status(200).json({ data: savedTransactions })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  getAllTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await this.transactionRepositorie.getAllTransactions()
      res.status(200).json(summary)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  getSummary = async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await this.transactionRepositorie.getTransactionSummary()
      res.status(200).json(summary)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  getUserSummaryByCategory = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const userEmail = req.params.userEmail
      const userExists = await this.transactionRepositorie.userExists(userEmail)
      if (!userExists) {
        res.status(404).send('User not found')
        return
      }
      const summary =
        await this.transactionRepositorie.getUserSummaryByCategory(userEmail)
      res.status(200).json(summary)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default TransactionController
