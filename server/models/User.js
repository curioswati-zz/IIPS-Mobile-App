var Sequelize = require('sequelize');
var crypto    = require('crypto');
var validator = require('validator');

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
				validate: {
				isSame: function (value, next) {
                    if (value == this.values.password)
                    {
                        next();
                    }
                    else{
                        next('Passwords differ');
                    }
	                }					
	            }
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
					is: /^[a-zA-Z0-9-]+$/,
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
	return StudentSchema;
};