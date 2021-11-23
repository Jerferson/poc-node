import { mock, MockProxy } from 'jest-mock-extended'
import { TransactionsService } from '@/data/services/transactions'
import { LoadTransactionByIdRepository, LoadTransactionRepository, Transaction } from '@/data/contracts/repos'
import faker from 'faker'

describe('Transactions', () => {
  let transactionRepo: MockProxy<LoadTransactionRepository & LoadTransactionByIdRepository>
  let sut: TransactionsService

  beforeAll(() => {
    transactionRepo = mock()
    transactionRepo.load.mockResolvedValue([
      {
        id: '1',
        orderId: faker.datatype.uuid(),
        // orderCapture: faker.datatype.uuid(),
        authorizedDate: faker.date.past(),
        transactionId: faker.datatype.uuid(),
        amountCaptured: faker.datatype.float(),
        gmv: faker.datatype.float(),
        status: faker.random.word()
      }, {
        id: '2',
        orderId: faker.datatype.uuid(),
        // orderCapture: faker.datatype.uuid(),
        authorizedDate: faker.date.past(),
        transactionId: faker.datatype.uuid(),
        amountCaptured: faker.datatype.float(),
        gmv: faker.datatype.float(),
        status: faker.random.word()
      }
    ] as Transaction[])
    transactionRepo.loadById.mockResolvedValue([])
    sut = new TransactionsService(transactionRepo)
  })
  it('shoul call LoadTransactionRepo with correct params', async () => {
    await sut.perform({ filter: { data: 'any_data' } })

    expect(transactionRepo.load).toHaveBeenCalledWith({ data: 'any_data' })
    expect(transactionRepo.load).toHaveReturnedTimes(1)
    expect(transactionRepo.loadById).toHaveReturnedTimes(0)
  })

  it('shoul call LoadTransactionByIdRepo with correct params', async () => {
    await sut.perform({ filter: { id: 'any' } })

    expect(transactionRepo.loadById).toHaveBeenCalledWith({ id: 'any' })
    expect(transactionRepo.loadById).toHaveReturnedTimes(1)
    expect(transactionRepo.load).toHaveReturnedTimes(0)
  })

  it('shoul return transactions if LoadTransactionRepo success', async () => {
    const result = await sut.perform({ filter: { data: 'any' } })

    expect(result.length).toEqual(2)
  })

  it('shoul rethrow if LoadTransactionByIdRepository throws', async () => {
    const errorMessage = faker.random.word()
    transactionRepo.loadById.mockRejectedValueOnce(new Error(errorMessage))

    const promise = sut.perform({ filter: { id: 'any' } })

    await expect(promise).rejects.toThrowError(errorMessage)
  })

  it('shoul rethrow if LoadTransactionRepository throws', async () => {
    const errorMessage = faker.random.word()
    transactionRepo.load.mockRejectedValueOnce(new Error(errorMessage))

    const promise = sut.perform({ filter: { data: 'any_data' } })

    await expect(promise).rejects.toThrowError(errorMessage)
  })
})
