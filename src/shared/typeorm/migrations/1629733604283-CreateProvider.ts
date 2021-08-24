import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProvider1629733604283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'providers',
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
          name: 'password',
          type: 'varchar'
        },
        {  
          name: 'cpf',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()'
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('providers');
  }

}
