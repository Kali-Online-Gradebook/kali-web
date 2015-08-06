import {ApiService} from './api-service';

export class CourseService extends ApiService {
	constructor (data, authorizationService, config, router) {
		super(data, authorizationService, config, router);
	}

	getCourses (parameters) {
		return this.data.fetch('courses', { method: 'GET' })
			.then((response) => {
				// TODO: Hook up streaming like a boss.
				return response.json();
			})
			.then((content) => {
				return content.data;
			})
			.catch((error) => {
				console.error("Error in getCourses");
				throw error;
			});
	}

	getCourse (id) {
		return this.data.fetch('courses/' + id, { method: 'GET' })
			.then((response) => {
				return response.json();
			})
			.then((content) => {
				return content.data;
			})
			.catch((error) => {
				console.error("Error in getCourses");
				throw error;
			});
	}

	saveCourse (course) {
		return this.data.fetch('courses', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ course: course })
		})
			.then((response) => {
				return response.json();
			})
			.then((content) => {
				return content.data;
			})
			.catch((error) => {
				console.error("Error in getCourses");
				throw error;
			});
	}
}