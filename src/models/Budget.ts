import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model } from 'sequelize-typescript'
import Expense from './Expense'

@Table({
    tableName: 'budgets'
})

class budgets extends Model {
    @Column({
        type: DataType.STRING(200)
    })
    declare name: String

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    @HasMany(() => Expense, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]


}

export default budgets