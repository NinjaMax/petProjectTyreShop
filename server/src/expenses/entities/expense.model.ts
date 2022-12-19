import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { ExpenseConfigAttr } from '../interfaces/expense.interface';
import { Paynment } from "src/paynment/entities/paynment.model";

@Table({tableName: 'expense',  createdAt: false, updatedAt: false })
export class Expense extends Model<Expense, ExpenseConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_expense: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    expense: string;

    @Column({type: DataType.INTEGER})
    price: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    status: string;

    @HasMany( () => Paynment , 'id_expense')
    paynment: Paynment[];
    
}
