module.exports = function(sequelize, DataType) {
  var Shift = sequelize.define("Shift",
    {
      shiftNo: {
      	type: DataType.INTEGER,
      	primaryKey: true
      }
    });

  return Shift;
};
