// import { 
//     Model,
//     InferAttributes, 
//     InferCreationAttributes,
//     CreationOptional,
//     Association,
//     NonAttribute,
//     BelongsToMany,
//     BelongsToManySetAssociationsMixin,
//     BelongsToManyAddAssociationMixin,
//     BelongsToManyAddAssociationsMixin,
//     BelongsToManyRemoveAssociationMixin,
//     BelongsToManyRemoveAssociationsMixin,
//     BelongsToManyCountAssociationsMixin
//     } from "sequelize";
// import { Storage } from "src/storage/entities/storage.model";

export interface OrdersConfigAttr 
// extends Model <InferAttributes<OrdersConfigAttr, { omit: 'storage_orders' }>, 
// InferCreationAttributes<OrdersConfigAttr,  { omit: 'storage_orders' }>> 
{
    
    id_order: number;
    id: number;
    id_storage: number;
    //goods: string;
    price: number;
    reserve: number;
    quantity: number;
    total: number;
    notes: string;
    //storage: Storage[];

    // declare addStorage: BelongsToManyAddAssociationMixin<Storage, number>;
    // declare addStorages: BelongsToManyAddAssociationsMixin<Storage, number>;
    
    // declare setStorages: BelongsToManySetAssociationsMixin<Storage, number>;
    // declare removeStorage: BelongsToManyRemoveAssociationMixin<Storage, number>;
    // declare removeStorages: BelongsToManyRemoveAssociationsMixin<Storage, number>;
    // declare countStorages: BelongsToManyCountAssociationsMixin;

    // declare storage_orders?: NonAttribute<Storage[]>;
    // //declare readonly storage_orders?: Storage[];
    // declare static associations: {
    //     storage_orders: Association<OrdersConfigAttr, Storage>;
    // };
 
}