import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, Model } from 'sequelize-typescript'

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


}

export default budgets