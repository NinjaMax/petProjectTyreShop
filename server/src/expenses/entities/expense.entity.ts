import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import { ExpenseConfigAttr } from '../interfaces/expense.interface';
import { Cashbox } from "src/cashbox/entities/cashbox.entity";

@Table({tableName: 'expense' })
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

    @ForeignKey(() => Cashbox)
    @Column({type: DataType.INTEGER})
    id_cashbox: number;

    @BelongsTo(() => Cashbox, 'id_cashbox')
    cashbox: Cashbox;

    //@HasMany(() => ReviewTyres , 'id_tyres')
    //reviews: ReviewTyres[];
    
}
