import { Transaction, TransactionModel } from '../transaction'
import ITransaction from '../interfaces/transaction.interface'

class TransactionRepositorie implements ITransaction {
  async getTransactionSummary(): Promise<any> {
    const pipeline: any[] = [
      {
        $group: {
          _id: '$user_email',
          total_inflow: {
            $sum: { $cond: [{ $eq: ['$type', 'inflow'] }, '$amount', 0] },
          },
          total_outflow: {
            $sum: { $cond: [{ $eq: ['$type', 'outflow'] }, '$amount', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          user_email: '$_id',
          total_inflow: 1,
          total_outflow: 1,
        },
      },
    ]

    pipeline.push({
      $project: {
        user_email: 1,
        total_inflow: { $toString: '$total_inflow' },
        total_outflow: { $toString: '$total_outflow' },
      },
    })

    const transactions = await TransactionModel.aggregate(pipeline)
    return transactions
  }

  async createMany(
    transactionData: Transaction[],
  ): Promise<(Transaction | null)[]> {
    return TransactionModel.insertMany(transactionData)
  }

  async createOne(transactionData: Transaction): Promise<Transaction | null> {
    return TransactionModel.create(transactionData)
  }
}

export default TransactionRepositorie
