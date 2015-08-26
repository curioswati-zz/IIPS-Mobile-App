var Sequelize = require('sequelize');
var crypto    = require('crypto');
var validator = require('validator');
var jwt       = require('jsonwebtoken');
var config    = require('../config/config');

// creating Models
module.exports = function(sequelize) {
	var UserSchema = sequelize.define('User',
		{
			username: {
				type: Sequelize.STRING,
				validate: {
					is: /^[a-z0-9-_]+$/,
					notNull: true,
					notEmpty: true
				}
			},
			email: {
				type: Sequelize.STRING,
				validate: {
					isEmail: true,
					notNull: true,
					notEmpty: true
				}
			},
			password: {
				type: Sequelize.STRING,
				validate: {
					notNull: true,
					notEmpty: true,
					len: [4,20]
				}
			},
			verify: {
				type: Sequelize.STRING,
			}
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
					var verify = this.verify;

					var salt = crypto.randomBytes(16).toString('hex');
					password = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
					verify = crypto.pbkdf2Sync(verify, salt, 1000, 64).toString('hex');

					// var shasum = crypto.createHash('sha1');
					// shasum.update(password);
					// password = shasum.digest('hex');

					UserSchema.build({ username: username, email: email, password: password, verify: verify })
					.save()
					.success(onSuccess)
					.error(onError);
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

					UserSchema.update({ username: username,email: email, password: password, verify:verify},
										{where: {id: id} })
					.success(onSuccess)
					.error(onError);
				},
				removeById: function(user_id, onSuccess, onError) {
					UserSchema.destroy({where: {id: user_id}})
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
						exp: parseInt(exp.getTime()/1000),
					},
					config.jwtSettings.secret);
				}
			}
		});

    var StudentSchema = sequelize.define('Student', 
	    {
	    	fullname: {
	    		type: Sequelize.STRING,
			    validate: {
					is: /^[a-zA-Z ]+$/,
					notNull: true,
					notEmpty: true
				}	    		
	    	},
	    	course: {
	    		type: Sequelize.STRING,
	    		validate: {
					notNull: true,
				}
	    	},
	    	sem: {
	    		type: Sequelize.STRING,
	    		validate: {
					notNull: true,
				}
	    	},
	    	rollno: {
	    		type: Sequelize.STRING,
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
					StudentSchema.findAll({}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				retrieveById: function(user_id, onSuccess, onError) {
					StudentSchema.find({where: {id: user_id}}, {raw: true})
					.success(onSuccess)
					.error(onError);
				},
				add: function(onSuccess, onError) {
					var fullname = this.fullname;
					var course = this.course;
					var sem = this.sem;
					var rollno = this.rollno;

					StudentSchema.build({ fullname: fullname, course: course, sem: sem, rollno: rollno })
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

					StudentSchema.update({ fullname: fullname, course: course, sem: sem, rollno: rollno },
										{where: {id: id} })
					.success(onSuccess)
					.error(onError);
				},
				removeById: function(user_id, onSuccess, onError) {
					StudentSchema.destroy({where: {id: user_id}})
					.success(onSuccess)
					.error(onError);
				}
			}
		});
    // UserSchema.belongsTo(StudentSchema);
	return UserSchema;
};