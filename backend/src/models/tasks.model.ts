import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4 } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Task',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      init_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status_uuid: {
        type: UUID,
        references: {
          model: 'status', // Status
          key: 'uuid',
        },
      },
      custom_label_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'custom_labels', //CustomLabel
          key: 'id',
        },
      },
      label_id: {
        type: UUID,
        references: {
          model: 'labels', //Label
          key: 'uuid',
        },
      },
      project_uuid: {
        type: UUID,
        references: {
          model: 'projects', // Project
          key: 'uuid',
        },
      },
    },
    {
      tableName: 'tasks',
      timestamps: false,
    }
  )
}