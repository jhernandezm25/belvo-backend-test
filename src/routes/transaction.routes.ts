import { Router } from 'express'
import TransactionRepositorie from '../models/repositories/transaction.repositorie'
import TransactionController from '../controllers/transaction.controller'

const router = Router()

const transactionRepository: TransactionRepositorie =
  new TransactionRepositorie()
const transactionController: TransactionController = new TransactionController(
  transactionRepository,
)

router.post('/createOne', transactionController.createOne)
router.post('/createMany', transactionController.createMany)
router.get('/', (req, res) => {
  const groupByType = req.query.group_by === 'type'
  if (groupByType) {
    transactionController.getSummary(req, res)
  } else {
    res.status(400).send('Invalid query parameter')
  }
})
router.get(
  '/:userEmail/summary',
  transactionController.getUserSummaryByCategory,
)
router.get('/all', transactionController.getAllTransactions)

export default router
