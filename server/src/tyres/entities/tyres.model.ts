import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { TyresConfigAttr } from '../interfaces/tyres.interface';
//import { PriceTyres } from "../../prices/entities/price-tyres.model";
import {StockTyres} from "../../stock/entities/stock-tyres.model";

@Table({tableName: 'tyres' , updatedAt: false})
export class Tyres extends Model<Tyres, TyresConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_tyres: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @HasMany(() => StockTyres)
    stock: StockTyres[];

    //@HasMany(() => PriceTyres)
    //price: PriceTyres[];
    
}
