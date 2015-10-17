module.exports = function(sequelize, DataType) {
  var Batch = sequelize.define("Batch",
    {
      batchID: {
        type: DataType.STRING,
        validate: {
          is: /^[a-zA-Z]{2}$/,
          notNull: true,
          notEmpty: true
        }
      },
      batchName: {
        type: DataType.STRING,
        unique: true,
        validate: {
          is: /^[a-zA-Z]{2}-2[kK][0-9]{1,2}$/,
          notNull: true,
          notEmpty: true
        }
      },
      roomNo: {
        type: DataType.INTEGER,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveById: function(batch_id, onSuccess, onError) {
          Batch.find({where: {id: batch_id}}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
        add: function(onSuccess, onError) {
          var batchID   = this.batchID;
          var batchName = this.batchName;

          Batch.build({ batchID: batchID, batchName: batchName })
          .save()
          .success(onSuccess)
          .error(onError);

          app.models.sync();
        },
        updateById: function(batch_id, onSuccess, onError) {
          var id        = batch_id;
          var batchID   = this.batchID;
          var batchName = this.batchName;

          Batch.update({ batchID: batchID, batchName: batchName},
            {where: {id: batch_id} })
          .success(onSuccess)
          .error(onError);
        },
        removeById: function(batch_id, onSuccess, onError) {
          Batch.destroy({where: {id: batch_id}})
          .success(onSuccess)
          .error(onError);
        }
      },
      classMethods: {
        associate: function(models) {
          Batch.belongsTo(models.Course, { foreignKeyConstraint: true});
          Batch.belongsTo(models.Faculty, { foreignKeyConstraint: true});
          Batch.hasMany(models.Student, { foreignKeyConstraint: true});
        }
      }
    });
  return Batch;
};