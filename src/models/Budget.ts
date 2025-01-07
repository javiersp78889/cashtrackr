import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model, AllowNull } from 'sequelize-typescript'
import Expense from './Expense'
import Users from './User'


@Table({
    tableName: 'budgets'
})

class budgets extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(200)
    })
    declare name: String

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    @HasMany(() => Expense, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]

    @ForeignKey(() => Users)
    declare userId: Users

    @BelongsTo(() => Users)
    declare user: Users


}

export default budgets