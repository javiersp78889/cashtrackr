import { Table, Column, DataType, HasMany, Model, Default, Unique, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'users'
})

export class Users extends Model {
    @Column({
        type: DataType.STRING(200)
    })
    declare name: string
} 