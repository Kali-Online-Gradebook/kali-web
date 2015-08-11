import {Redirect} from 'aurelia-router'; // Is this a bad separation of concerns?
import {JWTUtility, JWA} from '../../components/au-jws';

export class AuthorizationService {
	static inject () {
		return [JWTUtility];
	}

	constructor (jwtUtility) {
		this.jwtUtility = jwtUtility.configure(j => {
			j.addAlgorithm(JWA.RS256);
		});
	}

	set token (token) {
		window.localStorage.setItem('token', token);
	}

	get token () {
		return window.localStorage.getItem('token');
	}

	set publicKey (key) {
		window.localStorage.setItem('publicKey', key);
	}

	get publicKey () {
		return window.localStorage.getItem('publicKey');
	}

	getUser () {
		return this.jwtUtility.verify(this.token, this.publicKey)
			.then((payload) => {
				return JSON.parse(payload).user;
			})
			.catch((err) => {
				return false;
			}); // TODO: Validate the key and send back the user object.
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

			this.authorizationService.getUser()
				.then(() => {
					return next();
				})
				.catch(() => {
					return next.cancel(new Redirect(''));
				});
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