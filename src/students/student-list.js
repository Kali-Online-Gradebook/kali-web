import {StudentService} from '../services/student-service';

export class StudentList {
	static inject () { return [StudentService]; }

	constructor (studentService) {
		this.studentService = studentService;
		this.students = [];
	}

	activate () {
		this.studentService.getStudents()
			.then((students) => {
				console.log("students", students);
				this.students = students;
			})
			.catch((error) => {
				console.error('error', error);
			});
	}

	attached () {

	}
}