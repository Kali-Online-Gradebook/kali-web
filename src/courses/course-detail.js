import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {CourseChanged, CourseSelected} from '../messages';
import {CourseService} from '../services/course-service';

export class CourseDetail {
	static inject = [CourseService, EventAggregator, Router];
	constructor (courseService, ea, router) {
		this.courseService = courseService;
		this.ea = ea;
		this.router = router;

		this.modal = false;
	}

	activate (params, config, router) {
		let id = parseInt(params.id, 10);
		if (!isNaN(id)) {
			this.id = id;

			this.courseService.getCourse(this.id)
				.then((course) => {
					if (!course) {
						console.error("no course", this.id, course);
					} else {
						this.course = deepCopy(course);
						this._course = deepCopy(course);
					}
				});

			return;
		}

		this.id = undefined;
		this.course = {};
		this._course = {
			title: '',
			description: ''
		};
		this._assignment = {};
	}

	attached () {
		this.ea.publish(new CourseSelected(this.id));
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
			name: this._assignment.name,
			maximum: this._assignment.maximum
		});

		this._assignment = {};

		this.closeAssignmentModal();
	}

	closeAssignmentModal () {
		this.modal = false;
	}

	openAssignmentModal () {
		this.modal = true;
	}

	addStudent() {
		console.log("addStudent");
	}

	addCourse () {
		let id = this._course.id;

		this.courseService.saveCourse(this._course)
			.then((course) => {
				console.log("saved", id, course);
				this.ea.publish(new CourseChanged(course));

				if (!id) {
					console.log("course.id", course.id);
					this.ea.publish(new CourseSelected(course.id));
					this.router.navigate(course.id);
				}
			});
	}

	cancel () {
		console.log("cancel");
	}

	average (scores) {
		var max = this._course.assignments
			.map(assignment => assignment.maximum);

		var valid = scores.map(x => !isNaN(x)).length;

		return scores.reduce((prev, score, index, array) => {
			if (isNaN(score)) return prev;

			return prev + (score / max[index] / valid);
		}, 0);
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
