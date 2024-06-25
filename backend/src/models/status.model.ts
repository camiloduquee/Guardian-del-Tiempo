import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4 } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Status',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      color: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'status',
      timestamps: false,
    }
  )
}