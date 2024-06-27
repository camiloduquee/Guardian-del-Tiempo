import { DataTypes, Sequelize } from 'sequelize'
import { models } from '../database/database'

const { UUID, UUIDV4, DECIMAL } = DataTypes

export default (sequelize: Sequelize) => {
  return sequelize.define(
    'Project',
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
      price_hour: {
        type: DECIMAL(10, 2),
      },
      description: {
        type: DataTypes.TEXT,
      },
      id_cliente: {
        type: DataTypes.UUID,
      },
      email_client: {
        type: DataTypes.STRING,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      user_uuid: {
        type: UUID,
        references: {
          model: 'users', // User
          key: 'uuid',
        },
      },
    },
    {
      tableName: 'projects',
      timestamps: false,
    }
  )
}