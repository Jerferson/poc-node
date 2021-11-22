import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { PgCustomer, PgTransaction } from '@/infra/postgres/entities'

@Entity({ name: 'orders' })
export class PgOrder {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ name: 'customer_id', nullable: true })
  customerId?: string

  @OneToMany(type => PgTransaction, order => PgOrder)
  @JoinColumn({ name: 'order_id' })
  transactions?: PgTransaction[]

  @ManyToOne(type => PgCustomer, orders => PgOrder, { eager: true, nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer?: PgCustomer
}
