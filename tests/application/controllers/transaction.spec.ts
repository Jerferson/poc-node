import { Transactions } from '@/domain/features/transactions'
import { TransactionController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('TransactionController', () => {
  let sut: TransactionController
  let transactions: MockProxy<Transactions>
  const transactionData = {
    id: faker.datatype.uuid(),
    gateway: 'Pagar.me',
    orderId: faker.datatype.uuid(),
    orderCapture: faker.datatype.uuid(),
    catchValue: 10.51,
    status: faker.random.word()
  }

  beforeAll(() => {
    transactions = mock()
    transactions.perform.mockResolvedValue([transactionData])
  })

  beforeEach(() => {
    sut = new TransactionController(transactions)
  })

  it('should call  Tansactionwith correct params', async () => {
    await sut.handle({ filter: { id: 'any_id' } })

    expect(transactions.perform).toHaveBeenCalledWith({ filter: { id: 'any_id' } })
    expect(transactions.perform).toHaveReturnedTimes(1)
  })

  it('should return 200 if Transaction success', async () => {
    const httpResponse = await sut.handle({ filter: { id: 'any_id' } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        transactions: [transactionData]
      }
    })
    expect(transactions.perform).toHaveReturnedTimes(1)
  })

  it('should return 500 if Transaction throws', async () => {
    const errorMessage = new Error(faker.random.word())
    transactions.perform.mockRejectedValueOnce(errorMessage)

    const httpResponse = await sut.handle({ filter: { id: 'any_id' } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(errorMessage)
    })
  })
})
