import { Table, Column, DataType, HasMany, Model, Default, Unique, AllowNull } from 'sequelize-typescript'
import budgets from './Budget'

@Table({
    tableName: 'users'
})

class Users extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare name: string
    
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING(60)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => budgets, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare budget: budgets[]
} 

export default Users