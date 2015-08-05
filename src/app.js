import {Redirect} from 'aurelia-router';
import {UserVerificationStep, AuthorizationStep} from './services/aaa/authorization-service';

export class App {
	constructor(api) {
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
		config.addPipelineStep('authorize', UserVerificationStep);
		config.addPipelineStep('authorize', AuthorizationStep);
		config.map([
			{ route: '', name: 'login', moduleId: 'login', title: 'Log In', noLogin: true },
			{ route: ['courses'],  moduleId: 'courses', title: 'Courses', nav: true, icon: 'fa-book' },
			{ route: ['students'],  moduleId: 'students', title: 'Students', nav: true, icon: 'fa-graduation-cap' }
		]);

		this.router = router;
	}

	toggle () {
		this.hidden = !this.hidden;
	}
}
