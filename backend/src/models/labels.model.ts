import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4 } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Label',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      description: {
        type: DataTypes.TEXT,
      },
      color: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'labels',
      timestamps: false,
    }
  )

}