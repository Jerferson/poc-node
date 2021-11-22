import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { PgPaymentMethod } from '@/infra/postgres/entities'

@Entity({ name: 'payments' })
export class PgTransaction {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ name: 'order_id' })
  orderId?: string

  // @ManyToOne(type => PgOrder, transactions => PgTransaction, { eager: true, nullable: true })
  // @JoinColumn({ name: 'order_id' })
  // order?: PgOrder

  @ManyToOne(type => PgPaymentMethod, transactions => PgTransaction, { eager: true, nullable: true })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod?: PgPaymentMethod

  @Column()
  status?: string

  @Column({ name: 'transaction_id' })
  transactionId?: string

  @Column({ name: 'amount', type: 'float', nullable: true })
  gmv?: number = 0

  @Column({ name: 'amount_captured', type: 'float', nullable: true })
  amountCaptured?: number = 0

  @Column({ name: 'authorized_at', nullable: true })
  authorizedDate?: Date

  // @Column({ name: 'created_at', nullable: true })
  // createdDate?: string
}
