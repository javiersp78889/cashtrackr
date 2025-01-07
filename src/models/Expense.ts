import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from 'sequelize-typescript'
import budgets from './Budget'

@Table({
    tableName: 'expenses'
})

class Expense extends Model {
    @Column({
        type: DataType.STRING(200)
    })
    declare name: String

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number

    @ForeignKey(() => budgets)
    declare budgetId: number

    @BelongsTo(() => budgets)
    declare budget: budgets
}

export default Expense