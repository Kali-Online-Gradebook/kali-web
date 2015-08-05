import {WebAPI} from './web-api';

export class App {
	static inject = [WebAPI];
	constructor(api) {
		this.api = api;
		this.hidden = false;
		this.nav = {
			Courses: {
				icon: 'fa-book'
			},
			Students: {
				icon: 'fa-graduation-cap'
			}
		};
	}

	configureRouter(config, router){
		config.title = 'Kali';
		config.map([
			{ route: '', name: 'login', moduleId: 'login', title: 'Log In'},
			{ route: ['courses'],  moduleId: 'courses', title: 'Courses', nav: true, icon: 'fa-book' },
			{ route: ['students'],  moduleId: 'students', title: 'Students', nav: true, icon: 'fa-graduation-cap' }
		]);

		this.router = router;
	}

	toggle () {
		this.hidden = !this.hidden;
	}
}
