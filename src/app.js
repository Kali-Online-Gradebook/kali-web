import {WebAPI} from './web-api';

export class App {
	static inject = [WebAPI];
	constructor(api) {
		this.api = api;
	}

	configureRouter(config, router){
		config.title = 'Kali';
		config.map([
			{ route: '', moduleId: 'cover', title: 'Welcome'},
			{ route: ['courses'],  moduleId: 'courses', title: 'Courses' },
			{ route: ['students'],  moduleId: 'students', title: 'Students'  }
		]);

		this.router = router;
	}
}
