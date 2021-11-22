import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { PgGatewayCustomer, PgTransaction } from '@/infra/postgres/entities'

@Entity({ name: 'payment_methods' })
export class PgPaymentMethod {
  @PrimaryGeneratedColumn()
  id!: string

  @OneToMany(type => PgTransaction, paymentMethod => PgPaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  transactions?: PgTransaction[]

  @ManyToOne(type => PgGatewayCustomer, paymentMethods => PgPaymentMethod, { eager: true, nullable: true })
  @JoinColumn({ name: 'gateway_customer_id' })
  gatewayTransaction?: PgGatewayCustomer
}
