import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column } from 'typeorm'
import { PgPaymentMethod } from '@/infra/postgres/entities'

@Entity({ name: 'gateway_customers' })
export class PgGatewayCustomer {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ name: 'gateway' })
  gateway?: string

  @OneToMany(type => PgPaymentMethod, gatewaCustomer => PgGatewayCustomer)
  @JoinColumn({ name: 'gateway_customer_id' })
  paymentMethods?: PgPaymentMethod[]
}
