module.exports = function(sequelize, DataType) {
  var Slot = sequelize.define("Slot",
    {
      Day: DataType.STRING
    },
    {
      instanceMethods: {
        retrieveById: function(slot_id, onSuccess, onError) {
          Slot.find({where: {id: slot_id}}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
        add: function(onSuccess, onError) {
          var Day = this.Day;

          Slot.build({ Day: Day })
          .save()
          .success(onSuccess)
          .error(onError);
        },
        updateById: function(slot_id, onSuccess, onError) {
          var id = slot_id;

          Slot.update({ Day: Day},
            {where: {id: slot_id} })
          .success(onSuccess)
          .error(onError);
        },
        removeById: function(slot_id, onSuccess, onError) {
          Slot.destroy({where: {id: slot_id}})
          .success(onSuccess)
          .error(onError);
        }
      },
      classMethods: {
        associate: function(models) {
          // Slot.belongsTo(models.Shift);
          Slot.belongsTo(models.Batch);
          Slot.belongsTo(models.TimeInterval);
        }
      }
    });

  return Slot;

};
