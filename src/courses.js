import {Router} from 'aurelia-router';

export class Courses {
	configureRouter(config, router){
		config.map([
			{ route: ['', '/'], moduleId: 'no-selection', title: 'Select', name: '/' },
			{ route: '/:id',  moduleId: 'courses/course-detail', name: '/' }
		]);

		this.router = router;
	}
}