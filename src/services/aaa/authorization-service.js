// JWT service

export class AuthorizationService {
	constructor () {
		// This should be a singleton.
		this.token = undefined;
	}

	setToken (token) {
		window.localStorage.setItem('token', token);
	}

	getToken () {
		return window.localStorage.getItem('token');
	}

	isLoggedIn () {
		return false;
	}

	checkPermission (permission) {

	}
}