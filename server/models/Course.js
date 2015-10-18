module.exports = function(sequelize, DataType) {
  var Course = sequelize.define("Course",
  	{
  		courseName: {
  			type: DataType.STRING,
        unique: true,
  			validate: {
  				is: /^[a-zA-Z()0-9 ]+$/,
  				notNull: true,
  				notEmpty: true
  			}
      },
      dept: {
        type: DataType.STRING
      }
  	},
  	{
  		instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
          courses = Course.findAll({}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
  			retrieveById: function(course_id, onSuccess, onError) {
  				Course.find({where: {id: course_id}}, {raw: true})
  				.success(onSuccess)
  				.error(onError);
  			},
		    add: function(onSuccess, onError) {
            var courseName = this.courseName;
		        var sem = this.sem;

		        Course.build({ courseName: courseName, sem: sem })
		        .save()
		        .success(onSuccess)
		        .error(onError);
		    }
  		},
      classMethods: {
        associate: function(models) {
          Course.hasMany(models.Semester, { foreignKeyConstraint: true});
          Course.hasMany(models.Batch, { foreignKeyConstraint: true});
          Course.hasMany(models.Student, { foreignKeyConstraint: true});
        }
      }
    });
	return Course;
};
