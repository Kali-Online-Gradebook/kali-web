import {HttpClient} from 'aurelia-http-client';
import {Config} from '../config';

export class AuthenticationService {
	static inject () { return [HttpClient, Config]; }

	constructor (http, config) {
		this.http = http.configure(x => {
			x.withHeader('Content-Type', 'application/json');
		});
		this.endpoint = config.uri + '/auth/'; // TODO: Aurelia path.
	}

	register (uid, pwd) {
		return this.http.post(this.endpoint + 'register', {
			user: {
				username: uid,
				password: pwd
			}
		});
	}

	login (uid, pwd) {
		return this.http.post(this.endpoint + 'login', {
				user: { username: uid, password: pwd }
			}).then((response) => {
				return response.content.data;
			});
	}

	logout () {

	}
}