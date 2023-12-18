import { expect } from 'chai'
import { SinonStub, stub } from 'sinon'
import TransactionController from '../../controllers/transaction.controller'
import 'mocha'
import { Transaction } from '../../models/transaction'

describe('TransactionController', () => {
  let createManyStub: SinonStub
  let createOneStub: SinonStub
  let getTransactionSummaryStub: SinonStub
  let userExistsStub: SinonStub
  let getUserSummaryByCategoryStub: SinonStub

  beforeEach(() => {
    createManyStub = stub().resolves([])
    createOneStub = stub().resolves({})
    getTransactionSummaryStub = stub().resolves([])
    userExistsStub = stub()
    getUserSummaryByCategoryStub = stub().resolves({})
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

  describe('createOne', () => {
    it('should handle successful creation of a transaction', async () => {
      const transaction: Transaction = {
        reference: '000056',
        date: '2020-01-04' as unknown as Date,
        amount: 55.13,
        type: 'inflow',
        category: 'other',
        user_email: 'johndoe@email.com',
      } // Datos de prueba

      const transactionRepositorieMock = {
        createOne: createOneStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        getTransactionSummary: stub(),
        createMany: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { body: transaction }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.createOne(req, res)

      expect(createOneStub.calledOnceWith(transaction)).to.be.true
      expect(res.status.calledOnceWith(200)).to.be.true
      expect(res.json.calledOnceWith({ data: {} })).to.be.true
    })

    it('should handle error during creation of a transaction', async () => {
      const transaction: Transaction = {
        reference: '000056',
        date: '2020-01-04' as unknown as Date,
        amount: 55.13,
        type: 'inflow',
        category: 'other',
        user_email: 'johndoe@email.com',
      }

      createOneStub.rejects(new Error('Some error'))

      const transactionRepositorieMock = {
        createOne: createOneStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        getTransactionSummary: stub(),
        createMany: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { body: transaction }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.createOne(req, res)

      expect(createOneStub.calledOnceWith(transaction)).to.be.true
      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.json.calledOnceWith({ message: 'Some error' })).to.be.true
    })
  })

  describe('getSummary', () => {
    it('should handle successful retrieval of transaction summary', async () => {
      const transactionSummary: any[] = [] // Datos de prueba

      const transactionRepositorieMock = {
        getTransactionSummary: getTransactionSummaryStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        createMany: stub(),
        createOne: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = {}
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.getSummary(req, res)

      expect(getTransactionSummaryStub.calledOnce).to.be.true
      expect(res.status.calledOnceWith(200)).to.be.true
      expect(res.json.calledOnceWith(transactionSummary)).to.be.true
    })

    it('should handle error during retrieval of transaction summary', async () => {
      getTransactionSummaryStub.rejects(new Error('Some error'))

      const transactionRepositorieMock = {
        getTransactionSummary: getTransactionSummaryStub,
        getAllTransactions: stub(),
        getUserSummaryByCategory: stub(),
        createMany: stub(),
        createOne: stub(),
        userExists: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = {}
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.getSummary(req, res)

      expect(getTransactionSummaryStub.calledOnce).to.be.true
      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.json.calledOnceWith({ message: 'Some error' })).to.be.true
    })
  })

  describe('getUserSummaryByCategory', () => {
    it('should handle successful retrieval of user summary by category', async () => {
      const userEmail = 'test@example.com'
      const userExists = true
      const userSummary: any = {} // Datos de prueba

      // Mock del método userExists para que devuelva true
      userExistsStub.resolves(userExists)

      const transactionRepositorieMock = {
        userExists: userExistsStub,
        getUserSummaryByCategory: getUserSummaryByCategoryStub,
        getAllTransactions: stub(),
        getTransactionSummary: stub(),
        createMany: stub(),
        createOne: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { params: { userEmail } }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.getUserSummaryByCategory(req, res)

      // Verificar que se llamó a userExists con el correo electrónico del usuario
      expect(userExistsStub.calledOnceWith(userEmail)).to.be.true

      // Verificar que, dado que el usuario existe, se llamó a getUserSummaryByCategory con el mismo correo electrónico
      expect(getUserSummaryByCategoryStub.calledOnceWith(userEmail)).to.be.true

      // Verificar que se llamó a res.status con el código 200 y res.json con los datos esperados
      expect(res.status.calledOnceWith(200)).to.be.true
      expect(res.json.calledOnceWith(userSummary)).to.be.true
    })

    it('should handle user not found', async () => {
      const userEmail = 'nonexistent@example.com'
      const userExists = false

      // Mock del método userExists para que devuelva false
      userExistsStub.resolves(userExists)

      const transactionRepositorieMock = {
        userExists: userExistsStub,
        getUserSummaryByCategory: getUserSummaryByCategoryStub,
        getAllTransactions: stub(),
        getTransactionSummary: stub(),
        createMany: stub(),
        createOne: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { params: { userEmail } }
      const res: any = {
        status: stub().returnsThis(),
        send: stub(),
      }

      await controller.getUserSummaryByCategory(req, res)

      // Verificar que se llamó a userExists con el correo electrónico del usuario
      expect(userExistsStub.calledOnceWith(userEmail)).to.be.true

      // Verificar que, dado que el usuario no existe, se llamó a res.status con el código 404 y res.send con el mensaje esperado
      expect(res.status.calledOnceWith(404)).to.be.true
      expect(res.send.calledOnceWith('User not found')).to.be.true
    })

    it('should handle error during retrieval of user summary by category', async () => {
      const userEmail = 'test@example.com'
      const userExists = true

      // Mock del método userExists para que devuelva true
      userExistsStub.resolves(userExists)

      // Mock del método getUserSummaryByCategory para que lance un error
      getUserSummaryByCategoryStub.rejects(new Error('Some error'))

      const transactionRepositorieMock = {
        userExists: userExistsStub,
        getUserSummaryByCategory: getUserSummaryByCategoryStub,
        getAllTransactions: stub(),
        getTransactionSummary: stub(),
        createMany: stub(),
        createOne: stub(),
      }

      const controller = new TransactionController(transactionRepositorieMock)
      const req: any = { params: { userEmail } }
      const res: any = {
        status: stub().returnsThis(),
        json: stub(),
      }

      await controller.getUserSummaryByCategory(req, res)

      // Verificar que se llamó a userExists con el correo electrónico del usuario
      expect(userExistsStub.calledOnceWith(userEmail)).to.be.true

      // Verificar que, dado que el usuario existe, se llamó a getUserSummaryByCategory con el mismo correo electrónico
      expect(getUserSummaryByCategoryStub.calledOnceWith(userEmail)).to.be.true

      // Verificar que se llamó a res.status con el código 500 y res.json con el mensaje de error
      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.json.calledOnceWith({ message: 'Some error' })).to.be.true
    })
  })
})
