import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4, TIME, DECIMAL } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Invoice',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      total_time: {
        type: TIME,
      },
      price_hour: {
        type: DECIMAL(10, 2),
      },
      project_id: {
        type: UUID,
        references: {
          model: 'projects', // Project
          key: 'uuid',
        },
      },
      issue_date: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'invoices',
      timestamps: false,
    }
  )
}