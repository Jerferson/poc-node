import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { PgOrder } from '@/infra/postgres/entities'

@Entity({ name: 'customers' })
export class PgCustomer {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ name: 'first_name', nullable: true })
  firstName?: string

  @Column({ name: 'last_name', nullable: true })
  lastName?: string

  @OneToMany(type => PgOrder, customer => PgCustomer)
  @JoinColumn({ name: 'customer_id' })
  orders?: PgOrder[]
}
