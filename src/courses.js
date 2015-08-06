import {Router} from 'aurelia-router';

export class Courses {
	configureRouter(config, router){
		config.map([
			{ route: ['', '/'], moduleId: 'no-selection', title: 'Select', name: '/' },
			{ route: '/add',  moduleId: 'courses/course-detail', name: 'course.add' },
			{ route: '/:id',  moduleId: 'courses/course-detail', name: 'course' },
		]);

		this.router = router;
	}

	get hideView () {
		return this.router.currentInstruction.config.name === '/';
	}
}