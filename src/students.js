import {Router} from 'aurelia-router';

export class Students {
	configureRouter(config, router){
		config.map([
			{ route: ['', '/'], moduleId: 'students/student-list', name: '/' },
			{ route: '/:id',  moduleId: 'students/student-detail', name: '/' }
		]);

		this.router = router;
	}
}