import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddress1628972879040 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cep',
            type: 'varchar'
          },
          {  
            name: 'road',
            type: 'varchar'
          },
          {  
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'varchar'
          }
        ],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('address');
    }

}