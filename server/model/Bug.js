module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bug', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['LOW', 'MEDIUM', 'HIGH'],
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
  })
}
