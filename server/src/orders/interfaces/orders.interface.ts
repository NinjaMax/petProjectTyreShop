import { 
    Model,
    InferAttributes, 
    InferCreationAttributes,
    CreationOptional,
    Association,
    NonAttribute,
    BelongsToMany,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCountAssociationsMixin
    } from "sequelize";
import { Storage } from "src/storage/entities/storage.model";

export class OrdersConfigAttr 
extends Model <InferAttributes<OrdersConfigAttr, { omit: 'storage_orders' }>, 
InferCreationAttributes<OrdersConfigAttr,  { omit: 'storage_orders' }>> 
{
    
    declare id_order: CreationOptional<number>;
    declare id: number;
    declare id_storage: number;
    //goods: string;
    declare price: number;
    declare reserve: number;
    declare quantity: number;
    declare total: number;
    declare notes: string;
    //storage: Storage[];

    declare addStorage: BelongsToManyAddAssociationMixin<Storage, number>;
    declare addStorages: BelongsToManyAddAssociationsMixin<Storage, number>;
    
    declare setStorages: BelongsToManySetAssociationsMixin<Storage, number>;
    declare removeStorage: BelongsToManyRemoveAssociationMixin<Storage, number>;
    declare removeStorages: BelongsToManyRemoveAssociationsMixin<Storage, number>;
    declare countStorages: BelongsToManyCountAssociationsMixin;

    declare storage_orders?: NonAttribute<Storage[]>;
    //declare readonly storage_orders?: Storage[];
    declare static associations: {
        storage_orders: Association<OrdersConfigAttr, Storage>;
    };
 
}