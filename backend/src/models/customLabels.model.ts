import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  return sequelize.define
    (
      'Custom_label',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
        color: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'custom_labels',
        timestamps: false,
      }
    )
}