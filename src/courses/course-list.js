import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from '../web-api';
import {CourseChanged, CourseSelected} from '../messages';

export class CourseList {
	static inject = [WebAPI, EventAggregator];

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.courses = [];
	}

	activate() {
		this.ea.subscribe(CourseSelected, msg => {
			console.log("msg", msg);
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
		this.api.getCourseList().then(courses => {
			this.courses = courses;
		});
	}

	select(id) {
		this.selectedId = id;
		return true;
	}
}
