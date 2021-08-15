import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Category from "./Category";


@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @OneToOne(() => Category)
  @JoinColumn({name: 'address_id'})
  category: Category;

  @Column()
  category_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column('int')
  minimal_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
