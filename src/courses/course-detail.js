import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {WebAPI} from '../web-api';
import {CourseChanged, CourseSelected} from '../messages';

export class CourseDetail {
	static inject = [WebAPI, EventAggregator, Router];
	constructor (api, ea, router) {
		this.api = api;
		this.ea = ea;
		this.router = router;

		this.course = {};
		this._course = {};
	}

	activate (params, config, router) {
		let id = parseInt(params.id, 10);

		this.api.getCourse(id)
			.then((course) => {
				this.course = deepCopy(course);
				this._course = deepCopy(course);
			});

		this.ea.subscribe(CourseChanged, msg => {
			this.course = deepCopy(msg.course);
			this._course = deepCopy(msg.course);
		});

		this.ea.publish(new CourseSelected(id));
	}

	canDeactivate () {
		if (!deepCompare(this._course, this.course)) {
			// return confirm("You have unsaved changes. Still cancel?");
		}
	}

	undo() {
		console.log("undo");
	}

	redo () {
		console.log("redo");
	}

	addAssignment() {
		console.log("addAssignment");
		this._course.assignments.push({
			name: "New Assignment",
			maximum: 100
		});
	}

	addStudent() {
		console.log("addStudent");
	}

	save () {
		let id = this._course.id;

		this.api.saveCourse(this._course)
			.then((course) => {
				this.ea.publish(new CourseChanged(course));

				if (!id) {
					this.ea.publish(new CourseSelected(course.id));
					this.router.navigate('courses/' + course.id);
				}
			});
	}

	cancel () {
		console.log("cancel");
	}

	average (scores) {
		var points = scores
			.filter(x => !isNaN(x))
			.reduce((p, c) => p + c, 0);

		var max = this._course.assignments
			.map(assignment => assignment.maximum)
			.reduce((p, c) => p + c);

		return points / max;
	}
}

export class PercentValueConverter {
	toView(number) {
		return !isNaN(number)
			? (Math.round(number * 1000) / 10).toString() + '%'
			: '--';
	}
}

function deepCopy(object) {
	// TODO: Optimize.
	return JSON.parse(JSON.stringify(object));
}

function deepCompare(obj1, obj2) {
	return Object.keys(obj1)
		.every((key) => {
			if (!obj2.hasOwnProperty(key)) return false;
			if (obj2[key] !== null && typeof obj2[key] === 'Object') {
				return deepCompare(obj1[key], obj2[key]);
			}

			return obj1[key] === obj2[key];
		});
}
