import { DataTypes, Sequelize } from 'sequelize'

const { UUID } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Favorite',
    {
      user_uuid: {
        type: UUID,
        references: {
          model: 'users', //User
          key: 'uuid',
        },
        primaryKey: true,
      },
      project_uuid: {
        type: UUID,
        references: {
          model: 'projects',// Project,
          key: 'uuid',
        },
        primaryKey: true,
      },
    },
    {
      tableName: 'favorites',
      timestamps: false,
    }
  )
}