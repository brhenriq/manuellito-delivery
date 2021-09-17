import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "@modules/users/typeorm/entities/User";
import OrdersProducts from "./OrdersProducts";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @Column()
  status: string;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
