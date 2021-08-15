import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./Address";


@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;
  
  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({name: 'address_id'})
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
