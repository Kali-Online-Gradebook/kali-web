import {EventAggregator} from 'aurelia-event-aggregator';
import {CourseService} from '../services/course-service';
import {CourseChanged, CourseSelected} from '../messages';

export class CourseList {
	static inject = [EventAggregator, CourseService];

	constructor(ea, courseService) {
		this.courseService = courseService;
		this.ea = ea;
		this.courses = [];
	}

	attached() {
		this.ea.subscribe(CourseSelected, msg => {
			this.select(msg.id);
		});

		this.ea.subscribe(CourseChanged, msg => {
			let id = msg.course.id;
			let found = this.courses.filter(x => x.id == id)[0] || {};
			if (!found.id) {
				this.courses.push(found);
			}

			Object.assign(found, msg.course);
		});
	}

	created() {
		this.courseService.getCourses()
			.then((courses) => {
				this.courses = courses;
			});
	}

	select(id) {
		this.selectedId = id;
		return true;
	}
}
