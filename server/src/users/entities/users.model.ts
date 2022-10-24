import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { UsersConfigAttr } from "../interfaces/users.interface";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";

@Table({tableName: 'user', createdAt: false, updatedAt: false})
export class Users extends Model<Users, UsersConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id_user: number;
    
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    full_name: string;

    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    phone: bigint;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    email: string;

    @HasMany(() => ReviewTyres , 'id_user')
    reviews: ReviewTyres[];
    

}
