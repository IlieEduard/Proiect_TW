module.exports = (sequelize, DataTypes) => {
  return sequelize.define('project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    repository: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
