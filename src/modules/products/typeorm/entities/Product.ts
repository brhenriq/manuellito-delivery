import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Category from "./Category";


@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @Column("int")
  minimal_quantity: number;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
