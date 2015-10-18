module.exports = function(sequelize, DataType) {
  var Semester = sequelize.define("Semester",
  	{
  		semNo: {
  			type: DataType.STRING,
        allowNull: false,
  			validate: {
  				is: /^[A-Z]+$/,
  				notEmpty: true
  			}
      },
      syllabusUrl: {
        type: DataType.STRING
      }
  	},
  	{
  		instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
          sems = Semester.findAll({}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
  			retrieveById: function(sem_id, onSuccess, onError) {
  				Semester.find({where: {id: sem_id}}, {raw: true})
  				.success(onSuccess)
  				.error(onError);
  			},
		    add: function(onSuccess, onError) {
            var semNo = this.semNo;
		        var syllabusUrl = this.syllabusUrl;

		        Semester.build({ semNo: semNo, syllabusUrl: syllabusUrl })
		        .save()
		        .success(onSuccess)
		        .error(onError);
		    }
  		},
      classMethods: {
        associate: function(models) {
          Semester.belongsTo(models.Course, { foreignKeyConstraint: true});
          Semester.hasMany(models.Slot, { foreignKeyConstraint: true});
          Semester.hasMany(models.Student, { foreignKeyConstraint: true});
        }
      }
    });
	return Semester;
};