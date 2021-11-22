import { TransactionController } from '@/application/controllers'
import { TransactionsService } from '@/data/services'
import { PgTransactionRepository } from '@/infra/postgres/repos'

export const makeTransactionController = (): TransactionController => {
  const pgTransactionLoad = new PgTransactionRepository()
  const transactionService = new TransactionsService(pgTransactionLoad)
  return new TransactionController(transactionService)
}
