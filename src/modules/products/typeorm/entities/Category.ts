import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Product)
  product: Product;
}

export default Category;
