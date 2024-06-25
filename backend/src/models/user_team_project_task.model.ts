import { DataTypes, Sequelize } from 'sequelize'
const { UUID } = DataTypes

export default (sequelize: Sequelize) => {

  return sequelize.define(
    'User_team_project_task',
    {
      user_uuid: {
        type: UUID,
        references: {
          model: 'users',// User,
          key: 'uuid',
        },
        primaryKey: true,
      },
      team_uuid: {
        type: UUID,
        references: {
          model: 'teams', // Team,
          key: 'uuid',
        },
        primaryKey: true,
      },
      project_uuid: {
        type: UUID,
        references: {
          model: 'projects', // Project,
          key: 'uuid',
        },
        primaryKey: true,
      },
      task_uuid: {
        type: UUID,
        references: {
          model: 'tasks', // Task,
          key: 'uuid',
        },
        primaryKey: true,
      },
    },
    {
      tableName: 'user_team_project_task',
      timestamps: false,
    }
  )
}