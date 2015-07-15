let latency = 0;
let id = 0;
let studentId = 0;

function getId(){
	return ++id;
}

function getStudentId() {
	return ++studentId;
}

function randScore(maximum) {
	return Math.round(Math.random() * maximum);
}

function generateStudents(number, assignments) {
	var arr = [];

	for (var i = 0; i < number; i++) {
		arr.push({ 
			id: getStudentId(), 
			firstname: 'Student', 
			lastname: 'Lastname',
			scores: assignments.map(randScore)
		});
	};

	return arr;
}

var courses = [
	{
		id: getId(),
		title: 'Math',
		description: 'Fourth Grade Mathematics',
		assignments: [
			{ maximum: 13, name: 'Addition 1' },
			{ maximum: 5, name: 'Subtraction 3' },
			{ maximum: 100, name: 'Multiplication 3' },
			{ maximum: 50, name: 'Division 3' },
			{ maximum: 25, name: 'Fractions 3' },
			{ maximum: 20, name: 'Decimals 3' },
			{ maximum: 10, name: 'Large Numbers 3' },
			{ maximum: 100, name: 'Exponents 3' },
			{ maximum: 100, name: 'Percentages 3' },
			{ maximum: 100, name: 'Finance 3' },
			{ maximum: 100, name: 'Algebra 3' },
			{ maximum: 100, name: 'Calculus 3' },
			{ maximum: 100, name: 'Geometry 3' },
			{ maximum: 100, name: 'Subtraction 3' },
			{ maximum: 100, name: 'Subtraction 3' },
			{ maximum: 100, name: 'Subtraction 3' },
			{ maximum: 100, name: 'Subtraction 3' },
			{ maximum: 100, name: 'Subtraction 3' },
		],
	},
	{
		id: getId(),
		title: 'Science',
		description: 'Fifth Grade Science',
		assignments: [
			{ maximum: 100, name: 'Biology 1' },
			{ maximum: 100, name: 'Earth Science 3' },
		],
	},
	{
		id: getId(),
		title: 'History',
		description: 'Fourth Grade History',
		assignments: [
			{ maximum: 100, name: 'American 1' },
			{ maximum: 100, name: 'World 3' },
		],
	}
];

courses = courses.map((course) => {
	course.students = generateStudents(20, course.assignments.map(assignment => { return assignment.maximum }));
	return course;
});

export class WebAPI {
	getCourseList () {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let results = courses.map((course) => {
					return {
						id: course.id,
						title: course.title,
						description: course.description
					};
				});
				resolve(results);
				this.isRequesting = false;
			}, latency);
		});
	}

	getCourse(id) {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let courseDefault = {
					title: '',
					description: ''
				}

				let result = courses.filter((course) => {
					return course.id === id;
				})[0];

				if (id === 0) {
					resolve(courseDefault);
					this.isRequesting = false;
					return;
				}

				resolve(result);
				this.isRequesting = false;
			}, latency);
		});
	}

	saveCourse (myCourse) {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let course = courses.filter((course) => course.id === myCourse.id)[0] || {};

				if (!course.id) {
					course.id = getId();
					courses.push(course);
				}

				Object.assign(course, myCourse);

				resolve(course);
				this.isRequesting = false;
			}, latency);
		});
	}
}