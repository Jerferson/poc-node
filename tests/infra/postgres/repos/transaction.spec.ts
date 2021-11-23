import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import { PgCustomer, PgGatewayCustomer, PgOrder, PgPaymentMethod, PgTransaction } from '@/infra/postgres/entities'
import { makeFakeDb, maketransaction } from '../mocks'
import { PgTransactionRepository } from '@/infra/postgres/repos'

describe('PgTransaction', () => {
  let sut: PgTransactionRepository
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgTransaction, PgOrder, PgCustomer, PgGatewayCustomer, PgPaymentMethod])
    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgTransactionRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })
  describe('load', () => {
    it('should return transaction list', async () => {
      await maketransaction()
      const transactionData = await maketransaction()

      const result = await sut.load({})

      expect(result[1]).toEqual(transactionData)
      expect(result.length).toBe(2)
    })

    it('should return empty transaction list if not has transactions', async () => {
      const result = await sut.load({})

      expect(result.length).toBe(0)
    })
  })

  describe('loadById', () => {
    it('should return especific transaction when has id', async () => {
      await maketransaction()
      const transactionData = await maketransaction()
      await maketransaction()

      const result = await sut.loadById({ id: transactionData.id.toString() })

      expect(result[0]).toEqual(transactionData)
      expect(result.length).toBe(1)
    })

    it('should return empty transaction when unknown id', async () => {
      await maketransaction()
      await maketransaction()

      const result = await sut.loadById({ id: '100' })

      expect(result.length).toBe(0)
    })
  })
})
