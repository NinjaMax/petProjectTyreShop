import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, BelongsToMany} from "sequelize-typescript";
//import { Basket } from "src/basket/entities/basket.model";
//import { Battery } from "src/batteries/entities/battery.model";
//import { Oil } from "src/oils/entities/oil.model";
//import { Tyres } from "src/tyres/entities/tyres.model";
//import { Wheel } from "src/wheels/entities/wheel.model";

@Table({tableName: 'order_goods' })
export class Orders_Goods extends Model<Orders_Goods> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_goods: number;

    //@ForeignKey(() => Tyres)
    //@Column({type: DataType.INTEGER})
    //goods: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    quantity: number;

    //@ForeignKey(() => Tyres)
    //@Column({type: DataType.INTEGER})
    //id_tyre: number;

    //@ForeignKey(() => Wheel)
    //@Column({type: DataType.INTEGER})
    //id_wheel: number;

    //@ForeignKey(() => Oil)
    //@Column({type: DataType.INTEGER})
    //id_oil: number;

    //@ForeignKey(() => Battery)
    //@Column({type: DataType.INTEGER})
    //id_battery: number;

    //@ForeignKey(() => Basket)
    //@Column({type: DataType.INTEGER})
    //id_basket: number;

    
}