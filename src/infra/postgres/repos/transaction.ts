
import { LoadTransactionByIdRepository, LoadTransactionRepository, Transaction } from '@/data/contracts/repos'
import { PgTransaction } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadTransactionRepository.Params
type LoadResult = LoadTransactionRepository.Result
type LoadByIdParams = LoadTransactionByIdRepository.Params
type LoadByIdResult = LoadTransactionByIdRepository.Result

export class PgTransactionRepository implements LoadTransactionRepository, LoadTransactionByIdRepository {
  async load (params: LoadParams): Promise<LoadResult> {
    const transactions: Transaction[] = []
    const pgTransactionRepo = getRepository(PgTransaction)
    const pgTransactions = await pgTransactionRepo.find()

    pgTransactions.forEach(element => {
      transactions.push(this.transformData(element))
    })

    return transactions
  }

  async loadById (params: LoadByIdParams): Promise<LoadByIdResult> {
    const pgTransactionRepo = getRepository(PgTransaction)
    const pgTransactions = await pgTransactionRepo.findOne({ id: params.id })
    if (pgTransactions === undefined) {
      return []
    }

    return [this.transformData(pgTransactions)]
  }

  private transformData (pgTransaction: PgTransaction): Transaction {
    return {
      id: pgTransaction.id,
      gateway: pgTransaction.paymentMethod?.gatewayTransaction?.gateway,
      orderId: pgTransaction.orderId,
      transactionId: pgTransaction.transactionId,
      status: pgTransaction.status,
      gmv: pgTransaction.gmv,
      amountCaptured: pgTransaction.amountCaptured,
      authorizedDate: pgTransaction.authorizedDate
    }
  }
}
