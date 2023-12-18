import { Router } from 'express'
import TransactionRepositorie from '../models/repositories/transaction.repositorie'
import TransactionController from '../controllers.ts/transaction.controller'

const router = Router()

const transactionRepository: TransactionRepositorie =
  new TransactionRepositorie()
const transactionController: TransactionController = new TransactionController(
  transactionRepository,
)

router.post('/createOne', transactionController.createOne)
router.post('/createMany', transactionController.createMany)

export default router
