import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4, TIME } = DataTypes

export default (sequelize: Sequelize) => {

  return sequelize.define(
    'Stopwatch',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      time: {
        type: TIME,
        allowNull: false,
      },
      task_id: {
        type: UUID,
        references: {
          model: 'tasks', //Task
          key: 'uuid',
        },
      },
    },
    {
      tableName: 'stopwatch',
      timestamps: false,
    }
  )
}