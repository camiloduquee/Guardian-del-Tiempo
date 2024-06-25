import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Roles',
    {
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'roles',
      timestamps: false,
    }
  )
}