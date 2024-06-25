import { DataTypes, Sequelize } from 'sequelize'

const { UUID } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'User_team',
    {
      user_uuid: {
        type: UUID,
        allowNull: false,
        references: {
          model: 'users', // User,
          key: 'uuid',
        },
      },
      team_uuid: {
        type: UUID,
        allowNull: false,
        references: {
          model: 'teams', // Team,
          key: 'uuid',
        },
      },
    },
    {
      tableName: 'user_teams',
      timestamps: false,
    }
  )
}