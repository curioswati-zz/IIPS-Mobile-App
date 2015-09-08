module.exports = function(sequelize, DataType) {
  var Course = sequelize.define("Course",
  	{
  		courseName: {
  			type: DataType.STRING,
  			validate: {
  				is: /^[a-zA-Z]+$/,
  				notNull: true,
  				notEmpty: true
  			}
  		},
      sem: {
        type: DataType.INTEGER
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
		    },
		}
  });

	return Course;

};