import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4 } = DataTypes

export default (sequelize: Sequelize) => {
 return sequelize.define(
    'Team',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'teams',
      timestamps: false,
    }
  )
}