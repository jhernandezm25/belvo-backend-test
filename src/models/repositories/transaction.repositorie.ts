import { Transaction, TransactionModel } from '../transaction'
import ITransaction from '../interfaces/transaction.interface'

class TransactionRepositorie implements ITransaction {
  async getAllTransactions(): Promise<Transaction[]> {
    return await TransactionModel.find({})
  }
  async getUserSummaryByCategory(userEmail: string): Promise<any> {
    const pipeline: any[] = [
      { $match: { user_email: userEmail } },
      {
        $group: {
          _id: '$type',
          categories: {
            $push: {
              category: '$category',
              amount: '$amount',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          type: '$_id',
          categories: 1,
        },
      },
    ]

    const transactions = await TransactionModel.aggregate(pipeline)
    const summary: any = { inflow: {}, outflow: {} }

    transactions.forEach((transaction) => {
      const type = transaction.type
      transaction.categories.forEach(
        (category: { category: string; amount: number }) => {
          const categoryName = category.category
          const amount = category.amount.toFixed(2)

          if (type === 'inflow') {
            if (!summary.inflow[categoryName]) {
              summary.inflow[categoryName] = '0.00'
            }
            summary.inflow[categoryName] = (
              parseFloat(summary.inflow[categoryName]) + parseFloat(amount)
            ).toFixed(2)
          } else if (type === 'outflow') {
            if (!summary.outflow[categoryName]) {
              summary.outflow[categoryName] = '0.00'
            }
            summary.outflow[categoryName] = (
              parseFloat(summary.outflow[categoryName]) + parseFloat(amount)
            ).toFixed(2)
          }
        },
      )
    })

    return summary
  }
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

  async userExists(userEmail: string): Promise<boolean> {
    const count = await TransactionModel.countDocuments({
      user_email: userEmail,
    })
    return count > 0
  }
}

export default TransactionRepositorie
