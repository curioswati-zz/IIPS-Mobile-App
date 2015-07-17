angular.module('starter.services', [])

.factory('Subjects', function() {

	var subjects = [{
		id: 708,
		name: 'Bio. info.',
		time: '10:00 AM'
	}, {
		id: 701,
		name: 'Comp. arch.',
		time: '11:00 AM'		
	}, {
		id: 703,
		name: 'Disc. str.',
		time: '12:00 AM'
	}];

	return {
		all: function() {
			return subjects;
		}
	};
})

.factory('ClassDetails', function() {

	var classDetails = [{
		name: 'Room No.',
		value: '201'
	}, {
		name: 'Department',
		value: 'Technical'
	}, {
		name: 'HOD',
		value: 'Unknown'
	}, {
		name: 'Program Incharge',
		value: 'Kirti Mathur'
	}, {
		name: 'Batch Mentor',
		value: 'Rajesh Verma'
	}];

	return {
		all: function() {
			return classDetails;
		}
	};
});