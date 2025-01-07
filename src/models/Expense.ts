import { Table, Column, DataType, ForeignKey, BelongsTo, Model, AllowNull } from 'sequelize-typescript'
import budgets from './Budget'

@Table({
    tableName: 'expenses'
})

class Expense extends Model {
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
    
    @ForeignKey(() => budgets)
    declare budgetId: number

    @BelongsTo(() => budgets)
    declare budget: budgets
}

export default Expense