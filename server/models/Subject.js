module.exports = function(sequelize, DataType) {
  var Subject = sequelize.define("Subject",
  {
    subjectID: {
      type: DataType.STRING,
      validate: {
        is: '/^[a-zA-Z]{2}-[0-9]{3,4}$'
      }
    },
    subjectCode: {
      type: DataType.STRING,
      validate: {
        is: '/^[A-Z]{1,2}$'
      }
    },
    subjectName: DataType.STRING
  },
  {
    instanceMethods: {
      retrieveById: function(subject_id, onSuccess, onError) {
        Subject.find({where: {id: subject_id}}, {raw: true})
        .success(onSuccess)
        .error(onError);
      },
      add: function(onSuccess, onError) {
        var subjectCode = this.subjectCode;
        var subjectName = this.subjectName;

        Subject.build({ subjectCode: subjectCode, subjectName: subjectName })
        .save()
        .success(onSuccess)
        .error(onError);
      },
      updateById: function(subject_id, onSuccess, onError) {
        var id          = subject_id;
        var subjectCode = this.subjectCode;
        var subjectName = this.subjectName;

        Subject.update({ subjectCode: subjectCode, subjectName: subjectName},
          {where: {id: subject_id} })
        .success(onSuccess)
        .error(onError);
      },
      removeById: function(subject_id, onSuccess, onError) {
        Subject.destroy({where: {id: subject_id}})
        .success(onSuccess)
        .error(onError);
      }
    },
    classMethods: {
      associate: function(models) {
        Subject.belongsTo(models.Faculty, { foreignKeyConstraint: true});
        Subject.hasOne(models.Slot, { foreignKeyConstraint: true});
      }
    }
  });

  return Subject;

};