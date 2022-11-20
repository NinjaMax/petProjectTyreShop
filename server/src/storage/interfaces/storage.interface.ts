import {
    Model, 
    InferAttributes, 
    InferCreationAttributes,
    CreationOptional,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCountAssociationsMixin
    } from "sequelize";
import { Orders } from "src/orders/entities/order.model";

export interface StorageConfigAttr extends Model<InferAttributes<StorageConfigAttr>, InferCreationAttributes<StorageConfigAttr>> {
    
    id_storage: CreationOptional<number>;
    id_goods: number;
    goods: string;
    quantity: number;
    price: number;
    storage: string;

    addOrder: BelongsToManyAddAssociationMixin<Orders, number>;
    addOrders: BelongsToManyAddAssociationsMixin<Orders, number>;
    setOrders: BelongsToManySetAssociationsMixin<Orders, number>;
    removeOrder: BelongsToManyRemoveAssociationMixin<Orders, number>;
    removeOrders: BelongsToManyRemoveAssociationsMixin<Orders, number>;
    countOrders: BelongsToManyCountAssociationsMixin;

   
}