// JWT service
import {Redirect} from 'aurelia-router'; // Is this a bad separation of concerns?

export class AuthorizationService {
	set token (token) {
		window.localStorage.setItem('token', token);
	}

	get token () {
		return window.localStorage.getItem('token');
	}

	getUser () {
		if (this.token) return true; // TODO: Validate the key and send back the user object.

		return false;
	}

	checkPermission (permission) {
		// return jwt.decode(this.token)....
	}
}

export class UserVerificationStep {
	static inject = [AuthorizationService];

	constructor (authorizationService) {
		this.authorizationService = authorizationService;
	}

	run (routingContext, next) {
		console.log('UserVerificationStep Running');

		if (!routingContext.nextInstructions.some(instruction => instruction.config.noLogin)) {
			if (!this.authorizationService.getUser()) {
				return next.cancel(new Redirect(''));
			}
		}

		return next();
	}
}

export class AuthorizationStep {
	static inject = [AuthorizationService];

	constructor (authorizationService) {
		this.authorizationService = authorizationService;
	}

	run (routingContext, next) {
		console.log('AuthorizationStep Running');
		if (routingContext.nextInstructions.some(instruction => instruction.config.permissions)) {
			console.log('checking permissions');
			// Do some badass shit with the permissions model...
			// var user = authorizationService.getUser();
			// if (user.hasPermissions(permissions) {
			// 	return next();
			// }

			// return next.cancel();
			// }
		}

		return next();
	}
}