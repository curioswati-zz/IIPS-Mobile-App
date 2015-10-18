module.exports = function(sequelize, DataType) {
  var Quote = sequelize.define("Quote",
    {
      text: {
        type: DataType.STRING,
      },
      author: {
        type: DataType.STRING,
        validate: {
          is: /^[a-zA-Z ]+$/,
        }
      }
    });
  return Quote;
};
