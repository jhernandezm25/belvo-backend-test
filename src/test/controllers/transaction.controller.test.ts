import { expect } from 'chai'
import { SinonStub, stub } from 'sinon'
import TransactionController from '../../controllers/transaction.controller'
import 'mocha'
import { Transaction } from '../../models/transaction'

describe('TransactionController', () => {
  let createManyStub: SinonStub

  beforeEach(() => {
    createManyStub = stub().resolves([]) // Mock para createMany
  })

  describe('createMany', () => {
    it('should handle successful creation of multiple transactions', async () => {
      const transactions: Transaction[] = []

      const transactionRepositorieMock = {
        createMany: createManyStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        getTransactionSummary: stub(),
        createOne: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { body: transactions }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.createMany(req, res)

      expect(createManyStub.calledOnceWith(transactions)).to.be.true

      expect(res.status.calledOnceWith(200)).to.be.true
      expect(res.json.calledOnceWith({ data: [] })).to.be.true
    })

    it('should handle error during creation of multiple transactions', async () => {
      const transactions: Transaction[] = []

      createManyStub.rejects(new Error('Some error'))

      const transactionRepositorieMock = {
        createMany: createManyStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        getTransactionSummary: stub(),
        createOne: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { body: transactions }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.createMany(req, res)

      expect(createManyStub.calledOnceWith(transactions)).to.be.true

      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.json.calledOnceWith({ message: 'Some error' })).to.be.true
    })
  })
})
