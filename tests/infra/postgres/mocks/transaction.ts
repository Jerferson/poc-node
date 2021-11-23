import { PgTransaction } from '@/infra/postgres/entities/transaction'
import { Transaction } from '@/data/contracts/repos'

import { getRepository } from 'typeorm'
import faker from 'faker'

export const maketransaction = async (): Promise<Transaction> => {
  const pgTransactionRepo = getRepository(PgTransaction)
  const amount = faker.datatype.float()
  return pgTransactionRepo.save({
    // gateway: 'Pagar.me',
    orderId: faker.datatype.uuid(),
    // orderCapture: faker.datatype.uuid(),
    authorizedDate: faker.date.past(),
    transactionId: faker.datatype.uuid(),
    amountCaptured: amount,
    gmv: amount,
    status: faker.random.word()
  })
}
