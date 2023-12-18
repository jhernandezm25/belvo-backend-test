import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { TransactionModel } from '../../../models/transaction'
import TransactionRepositorie from '../../../models/repositories/transaction.repositorie'

describe('TransactionRepositorie', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('getAllTransactions should return an array of transactions', async () => {
    const findStub = sinon.stub(TransactionModel, 'find').resolves([])

    const repository = new TransactionRepositorie()
    const result = await repository.getAllTransactions()

    expect(findStub.calledOnce).to.be.true
    expect(result).to.be.an('array')
  })

  it('getUserSummaryByCategory should return user summary by category, empty array', async () => {
    const userEmail = 'test@example.com'
    const aggregateStub = sinon.stub(TransactionModel, 'aggregate').resolves([])

    const repository = new TransactionRepositorie()
    const result = await repository.getUserSummaryByCategory(userEmail)

    expect(aggregateStub.calledOnce).to.be.true
    expect(result).to.be.an('object')
  })

  it('getTransactionSummary should return transaction summary', async () => {
    const aggregateStub = sinon.stub(TransactionModel, 'aggregate').resolves([])

    const repository = new TransactionRepositorie()
    const result = await repository.getTransactionSummary()

    expect(aggregateStub.calledOnce).to.be.true
    expect(result).to.be.an('array')
  })

  it('getUserSummaryByCategory should calculate user summary by category', async () => {
    const userEmail = 'test@example.com'
    const transactionMock = {
      type: 'inflow',
      categories: [
        { category: 'category1', amount: 10 },
        { category: 'category2', amount: 20 },
      ],
    }

    const aggregateStub = sinon
      .stub(TransactionModel, 'aggregate')
      .resolves([transactionMock])

    const repository = new TransactionRepositorie()
    const result = await repository.getUserSummaryByCategory(userEmail)

    expect(aggregateStub).not.to.be.null

    expect(result).to.deep.equal({
      inflow: {
        category1: '10.00',
        category2: '20.00',
      },
      outflow: {},
    })
  })

  it('getUserSummaryByCategory should calculate user summary by category outlfow', async () => {
    const userEmail = 'test@example.com'
    const transactionMock = {
      type: 'outflow',
      categories: [
        { category: 'category1', amount: 10 },
        { category: 'category2', amount: 20 },
      ],
    }

    const aggregateStub = sinon
      .stub(TransactionModel, 'aggregate')
      .resolves([transactionMock])

    const repository = new TransactionRepositorie()
    const result = await repository.getUserSummaryByCategory(userEmail)

    expect(aggregateStub).not.to.be.null

    expect(result).to.deep.equal({
      outflow: {
        category1: '10.00',
        category2: '20.00',
      },
      inflow: {},
    })
  })

  it('createMany should insert multiple transactions', async () => {
    const insertManyStub = sinon
      .stub(TransactionModel, 'insertMany')
      .resolves([])

    const repository = new TransactionRepositorie()
    const transactions: any = [
      {
        reference: '000052',
        date: '2020-01-10' as unknown as Date,
        amount: 2500.72,
        type: 'inflow',
        category: 'salary',
        user_email: 'janedoe@email.com',
      },
    ]

    const result = await repository.createMany(transactions)

    expect(insertManyStub.calledOnceWith(transactions)).to.be.true
    expect(result).to.be.an('array')
  })
  it('createOne should insert a single transaction', async () => {
    const createStub = sinon
      .stub(TransactionModel, 'create')
      .resolves({} as unknown as any)

    const repository = new TransactionRepositorie()
    const transactionData: any = {
      reference: '000052',
      date: '2020-01-10' as unknown as Date,
      amount: 2500.72,
      type: 'inflow',
      category: 'salary',
      user_email: 'janedoe@email.com',
    }

    const result = await repository.createOne(transactionData)

    expect(createStub.calledOnceWith(transactionData)).to.be.true
    expect(result).to.be.an('object')
  })

  it('userExists should return true if user exists', async () => {
    const countDocumentsStub = sinon
      .stub(TransactionModel, 'countDocuments')
      .resolves(1)

    const repository = new TransactionRepositorie()
    const userEmail = 'test@example.com'

    const result = await repository.userExists(userEmail)

    expect(countDocumentsStub.calledOnceWith({ user_email: userEmail })).to.be
      .true
    expect(result).to.be.true
  })

  it('userExists should return false if user does not exist', async () => {
    const countDocumentsStub = sinon
      .stub(TransactionModel, 'countDocuments')
      .resolves(0)

    const repository = new TransactionRepositorie()
    const userEmail = 'test@example.com'

    const result = await repository.userExists(userEmail)

    expect(countDocumentsStub.calledOnceWith({ user_email: userEmail })).to.be
      .true
    expect(result).to.be.false
  })
})
