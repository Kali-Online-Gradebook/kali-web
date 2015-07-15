export class CourseChanged {
	constructor(course) {
		this.course = course;
	}
}

export class CourseSelected {
	constructor(id) {
		this.id = id;
	}
}