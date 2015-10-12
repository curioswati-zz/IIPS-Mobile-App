var validator = require('validator');
var jwt       = require('jsonwebtoken');
var config    = require('../config/config');

module.exports = function(sequelize, DataType) {
	var User = sequelize.define("User",
		{
			email: {
				type: DataType.STRING,
				unique: true,
				validate: {
					isEmail: true,
					notNull: true,
					notEmpty: true
				}
			},
			password: {
				type: DataType.STRING,
				validate: {
					notNull: true,
					notEmpty: true,
					len: [4,32]
				}
			}
		},
		{
			instanceMethods: {
				retrieveAll: function(onSuccess, onError) {
					User.findAll({}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				retrieveById: function(user_id, onSuccess, onError) {
					User.find({where: {id: user_id}}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				add: function(onSuccess, onError) {
					var email = this.email;
					var password = this.password;
					var verify = this.verify;

					User.sync({force:true}).then(function() {
						User.build({ email: email, password: password, verify: verify })
						.save()
						.success(onSuccess)
						.error(onError);						
					})

				},
				updateById: function(user_id, onSuccess, onError) {
					var id = user_id;
					var email = this.email;
					var password = this.password;
					var verify = this.verify;

					User.update({ email: email, password: password, verify:verify},
										{where: {id: id} })
					.success(onSuccess)
					.error(onError);
				},
				removeById: function(user_id, onSuccess, onError) {
					User.destroy({where: {id: user_id}})
					.success(onSuccess)
					.error(onError);
				},
				generateJWT: function() {
					var today = new Date();
					var exp = new Date(today);
					exp.setDate(today.getDate() + 60);

					return jwt.sign({
						_id: this._id,
						email: this.email,
						role: 'student',
						exp: parseInt(exp.getTime()/1000),
					},
					config.jwtSettings.secret);
				}
			},
			classMethods: {
				associate: function(models) {
					User.belongsTo(models.Student);
				}
			}
		});
	return User;
};