var validator = require('validator');

module.exports = function(sequelize, DataType) {
  var Student = sequelize.define("Student",
    {
      fullname: {
        type: DataType.STRING(50),
        validate: {
          is: /^[a-zA-Z ]+$/,
          notNull: true,
          notEmpty: true
        }
      },
      course: {
        type: DataType.STRING,
        validate: {
          notNull: true,
        }
      },
      sem: {
        type: DataType.STRING,
        validate: {
          notNull: true,
        }
      },
      rollno: {
        type: DataType.STRING,
        unique: true,
        validate: {
          is: /^[a-zA-Z]{2}-[0-9][a-zA-Z][0-9]{2}-[0-9]{1,3}$/,
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
          Student.findAll({}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
        retrieveById: function(user_id, onSuccess, onError) {
          Student.find({where: {id: user_id}}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
        add: function(onSuccess, onError) {
          var fullname = this.fullname;
          var course = this.course;
          var sem = this.sem;
          var rollno = this.rollno;

          Student.build({ fullname: fullname, course: course, sem: sem, rollno: rollno})
          .save()
          .success(onSuccess)
          .error(onError);
        },
        updateById: function(user_id, onSuccess, onError) {
          var id = user_id;
          var fullname = this.fullname;
          var course = this.course;
          var sem = this.sem;
          var rollno = this.rollno;

          Student.update({ fullname: fullname, course: course, sem: sem, rollno: rollno },
                    {where: {id: id} })
          .success(onSuccess)
          .error(onError);
        },
        removeById: function(user_id, onSuccess, onError) {
          Student.destroy({where: {id: user_id}})
          .success(onSuccess)
          .error(onError);
        }
      },
      classMethods: {
        associate: function(models) {
          Student.belongsTo(models.Batch);
          Student.hasOne(models.User);
        }
      }
    });

  return Student;
};