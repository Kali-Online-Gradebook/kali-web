import {ApiService} from './api-service';

export class StudentService extends ApiService {
	constructor (data, authorizationService, config, router) {
		super(data, authorizationService, config, router);
	}

	getStudents (parameters) {
		return this.data.fetch('students', { method: 'GET' })
			.then((response) => {
				return response.json();
			})
			.then((content) => {
				return content.data;
			})
			.catch((error) => {
				console.error("Error in getStudents");
				throw error;
			});
	}
}