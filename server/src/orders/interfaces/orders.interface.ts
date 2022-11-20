import { 
    Model,
    InferAttributes, 
    InferCreationAttributes,
    CreationOptional,
    Association,
    BelongsToMany,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCountAssociationsMixin
    } from "sequelize";
import { Storage } from "src/storage/entities/storage.model";

export interface OrdersConfigAttr 
extends Model <InferAttributes<OrdersConfigAttr>, InferCreationAttributes<OrdersConfigAttr>> 
{
    
    id_order: CreationOptional<number>;
    id: number;
    id_storage: number;
    //goods: string;
    price: number;
    reserve: number;
    quantity: number;
    total: number;
    notes: string;
    //storage: Storage[];

    addStorage: BelongsToManyAddAssociationMixin<Storage, number>;
    addStorages: BelongsToManyAddAssociationsMixin<Storage, number>;
    
    setStorages: BelongsToManySetAssociationsMixin<Storage, number>;
    removeStorage: BelongsToManyRemoveAssociationMixin<Storage, number>;
    removeStorages: BelongsToManyRemoveAssociationsMixin<Storage, number>;
    countStorages: BelongsToManyCountAssociationsMixin;
    //declare readonly storage?: Storage[];
    //associations: {
    //    storage: Association<OrdersConfigAttr, Storage>;
    //};
 
}