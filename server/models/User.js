var crypto    = require('crypto');
var validator = require('validator');
var jwt       = require('jsonwebtoken');
var config    = require('../config/config');

module.exports = function(sequelize, DataType) {
	var User = sequelize.define("User",
		{
			username: {
				type: DataType.STRING,
				unique: true,
				validate: {
					is: /^[a-z0-9-_]+$/,
					notNull: true,
					notEmpty: true
				}
			},
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
					len: [4,20]
				}
			},
			verify: {
				type: DataType.STRING,
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
				retrieveByusername: function(user_name, onSuccess, onError) {
					User.find({where: {username: user_name}}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				add: function(onSuccess, onError) {
					var username = this.username;
					var email = this.email;
					var password = this.password;
					var verify = this.verify;

					var salt = crypto.randomBytes(16).toString('hex');
					password = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
					verify = crypto.pbkdf2Sync(verify, salt, 1000, 64).toString('hex');

					// var shasum = crypto.createHash('sha1');
					// shasum.update(password);
					// password = shasum.digest('hex');

					User.sync({force:true}).then(function() {
						User.build({ username: username, email: email, password: password, verify: verify })
						.save()
						.success(onSuccess)
						.error(onError);						
					})

				},
				updateById: function(user_id, onSuccess, onError) {
					var id = user_id;
					var username = this.username;
					var email = this.email;
					var password = this.password;
					var verify = this.verify;

					var shasum = crypto.createHash('sha1');
					shasum.update(password);
					password = shasum.digest('hex');
					shasum.update(verify);
					verify = shasum.digest('hex');

					User.update({ username: username,email: email, password: password, verify:verify},
										{where: {id: id} })
					.success(onSuccess)
					.error(onError);
				},
				removeById: function(user_id, onSuccess, onError) {
					User.destroy({where: {id: user_id}})
					.success(onSuccess)
					.error(onError);
				},
				verifyPassword: function(password) {
					var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
					return this.pass === hash; 
				},
				generateJWT: function() {
					var today = new Date();
					var exp = new Date(today);
					exp.setDate(today.getDate() + 60);

					return jwt.sign({
						_id: this._id,
						username: this.username,
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