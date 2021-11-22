import { Transactions } from '@/domain/features'

type LoadParams = LoadTransactionRepository.Params
type LoadResult = LoadTransactionRepository.Result
type LoadByIdParams = LoadTransactionByIdRepository.Params
type LoadByIdResult = LoadTransactionByIdRepository.Result

export interface LoadTransactionRepository {
  load: (params: LoadParams) => Promise<LoadResult>
}

export namespace LoadTransactionRepository {
  export type Params = {
    data?: string
  }

  export type Result = Transaction[]
}

export interface LoadTransactionByIdRepository {
  loadById: (params: LoadByIdParams) => Promise<LoadByIdResult>
}

export namespace LoadTransactionByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = Transaction[]

}

export type Transaction = Transactions.Transaction
