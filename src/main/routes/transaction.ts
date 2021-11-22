import { makeTransactionController } from '@/main/factories/controllers'
import { adaptExpressRoute as adapt } from '@/infra/http'

import { Express } from 'express'

export default (router: Express): void => {
  const controller = makeTransactionController()

  router.post('/transactions', adapt(controller))
}
