import { DataTypes, Sequelize } from 'sequelize'

const { UUID, UUIDV4 } = DataTypes

export default (sequelize: Sequelize) => {

  return sequelize.define(
    'User',
    {
      uuid: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      avatar: {
        type: DataTypes.TEXT,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles', // Role,
          key: 'id',
        },
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  )
}