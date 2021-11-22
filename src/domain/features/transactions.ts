export interface Transactions {
  perform: (params: Transactions.Params) => Promise<Transactions.Result>
}

export namespace Transactions {
  export type Params = {
    filter: {
      id?: string
      data?: string
    }
  }

  export type Result = Transaction[]

  export type Transaction = {
    id: string
    gateway?: string
    orderId?: string
    transactionId?: string
    status?: string
    gmv?: number
    amountCaptured?: number
    authorizedDate?: Date
  }
}
