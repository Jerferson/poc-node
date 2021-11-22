import { Transactions } from '@/domain/features'
import { HttpResponse, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  filter: {
    id: string
    data: any
  }
}

export class TransactionController extends Controller {
  constructor (private readonly transactions: Transactions) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.transactions.perform({ filter: httpRequest?.filter })
    return ok({ transactions: result })
  }
}
