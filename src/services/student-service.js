import {HttpClient} from 'aurelia-http-client';

export class StudentService {
	static inject () { return [HttpClient]; }

	constructor (http, config) {
		this.http = http.configure(x => {
			x.withHeader('Content-Type', 'application/json');
		});
	}

	getStudents (parameters) {
		return this.http.get(this.endpoint + 'students')
			.then((response) => {
				return response.content.data;
			}).catch((error) => {
				console.error("Error in getStudents");
				return error;
			});
	}
}