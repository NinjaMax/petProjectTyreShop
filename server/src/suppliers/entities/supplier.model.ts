import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { SuppliersConfigAttr } from '../interfaces/suppliers.interface';
import { StockTyres } from '../../stock/entities/stock-tyres.model';


@Table({tableName: 'suppliers' , updatedAt: false})
export class Supplier extends Model<Supplier, SuppliersConfigAttr>{

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_sup: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    city: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    phone: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    email: string;

    @HasMany(() => StockTyres)
    stock: StockTyres[];

    //@HasMany(() => PriceTyres)
    //price: PriceTyres[];
}
