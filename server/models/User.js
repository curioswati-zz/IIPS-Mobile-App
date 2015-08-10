var Sequelize = require('sequelize');
var crypto    = require('crypto');

// creating Models
module.exports = function(sequelize) {
	var UserSchema = sequelize.define('User',
		{
			username: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.STRING
		},
		{
			instanceMethods: {
				retrieveAll: function(onSuccess, onError) {
					UserSchema.findAll({}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				retrieveById: function(user_id, onSuccess, onError) {
					UserSchema.find({where: {id: user_id}}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				add: function(onSuccess, onError) {
					var username = this.name;
					var email = this.email;
					var password = this.password;

					var shasum = crypto.createHash('sha1');
					shasum.update(password);
					password = shasum.digest('hex');

					UserSchema.build({ username: username, email: email, password: password })
					.save()
					.success(onSuccess)
					.error(onError);
				},
				updateById: function(user_id, onSuccess, onError) {
					var id = user_id;
					var username = this.username;
					var email = this.email;
					var password = this.password;

					var shasum = crypto.createHash('sha1');
					shasum.update(password);
					password = shasum.digest('hex');

					UserSchema.update({ username: username,email: email, password: password},
										{where: {id: id} })
					.success(onSuccess)
					.error(onError);
				},
				removeById: function(user_id, onSuccess, onError) {
					UserSchema.destroy({where: {id: user_id}})
					.success(onSuccess)
					.error(onError);
				}
			}
		});
	return UserSchema;
};