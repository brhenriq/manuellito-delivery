import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUser1628977375549 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {  
            name: 'last_name',
            type: 'varchar'
          },
          {  
            name: 'CPF',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'phone_number',
            type: 'varchar'
          },
          {
            name: 'address_id',
            type: 'uuid'
          }
        ],
      }));
        
        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}