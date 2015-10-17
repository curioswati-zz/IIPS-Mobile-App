module.exports = function(sequelize, DataType) {
  var TimeInterval = sequelize.define("TimeInterval",
  	{
  		beginTime: DataType.DATE,
  		endTime: DataType.DATE
  	},
  	{
  		instanceMethods: {
  			retrieveById: function(time_id, onSuccess, onError) {
  				TimeInterval.find({where: {id: time_id}}, {raw: true})
  				.success(onSuccess)
  				.error(onError);
  			},

  			add: function(onSuccess, onError) {
  				var beginTime = this.beginTime;
  				var endTime   = this.endTime;

  				TimeInterval.build({ beginTime: beginTime, endTime: endTime })
  				.save()
  				.success(onSuccess)
  				.error(onError);
  			},

  			updateById: function(time_id, onSuccess, onError) {
  				var id        = TimeInterval_id;
  				var beginTime   = this.beginTime;
  				var endTime = this.endTime;

  				TimeInterval.update({ beginTime: beginTime, endTime: endTime},
  					{where: {id: time_id} })
  				.success(onSuccess)
  				.error(onError);
  			},

  			removeById: function(time_id, onSuccess, onError) {
  				TimeInterval.destroy({where: {id: time_id}})
  				.success(onSuccess)
  				.error(onError);
  			}
  		}
	});

	return TimeInterval;

};
