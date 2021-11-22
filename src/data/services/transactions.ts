import { Transactions } from '@/domain/features'
import { LoadTransactionByIdRepository, LoadTransactionRepository } from '@/data/contracts/repos'

export class TransactionsService implements Transactions {
  constructor (
    private readonly transactionRepo: LoadTransactionRepository & LoadTransactionByIdRepository
  ) { }

  async perform (params: Transactions.Params): Promise<Transactions.Result> {
    if (params.filter.id !== undefined && params.filter.id !== null) {
      return this.transactionRepo.loadById({ id: params.filter.id })
    }

    return this.transactionRepo.load({ data: params.filter.data })
  }
}
