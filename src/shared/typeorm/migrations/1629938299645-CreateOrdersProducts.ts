import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrdersProducts1629938299645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "orders_products",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
                generationStrategy: "uuid",
                default: "uuid_generate_v4()",
              },
              {
                name: "price",
                type: "decimal",
                precision: 10,
                scale: 2,
              },
              {
                name: "quantity",
                type: "int",
              },
              {
                name: "order_id",
                type: "uuid",
                isNullable: true,
              },
              {
                name: "product_id",
                type: "uuid",
                isNullable: true,
              },
              {
                name: "created_at",
                type: "timestamp with time zone",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp with time zone",
                default: "now()",
              },
            ],
          })
        );

        await queryRunner.createForeignKey(
          "orders_products",
          new TableForeignKey({
            name: "OrdersPrductsOrder",
            columnNames: ["order_id"],
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          })
        );

         await queryRunner.createForeignKey(
           "orders_products",
           new TableForeignKey({
             name: "OrdersPrductsProduct",
             columnNames: ["product_id"],
             referencedTableName: "products",
             referencedColumnNames: ["id"],
             onDelete: "SET NULL",
           })
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrdersPrductsProduct');
        await queryRunner.dropForeignKey(
          "orders_products",
          "OrdersPrductsOrder"
        );
        await queryRunner.dropTable("orders_products");
    }

}
