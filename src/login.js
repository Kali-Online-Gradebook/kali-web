import {AuthenticationService, AuthorizationService} from './services/aaa/index';
import {Router} from 'aurelia-router';
// import {Validation} from 'aurelia-validation';

export class Login {
	static inject () { return [AuthenticationService, AuthorizationService, Router]; }

	constructor (authenticationService, authorizationService, router) {
		this.authenticationService = authenticationService;
		this.authorizationService = authorizationService;
		this.router = router;

		this.landing_message = "Kali is a teaching tool, helping you to keep track of your lessons and students - so that you can focus on teaching.";
		this.username = ''; 
		this.password = ''; 
		this.error = '';
/*
		this.loginValidation = validation.on(this)
			.ensure('username')
				.isNotEmpty()
			.ensure('password')
				.isNotEmpty();
*/

	}

	activate () {
		// This should be part of the router.
		if (this.authorizationService.isLoggedIn()) 
		{
			this.router.navigate('courses');
		}
	}

	authenticate () {
		if (this.username === null || this.password === null) {
			this.error = 'A username and password is required.';
			return;
		}   
		this.error = ''; 

		this.authenticationService.login(this.username, this.password)
			.then((token) => {
				this.username = '';
				this.password = '';

				// Store the JWT in our application - do something with localstorage here.
				// TODO: Abstract this part into a new service and decode JWT.
				this.authorizationService.setToken(token);

				// Redirect.
				this.router.navigate('courses');
			})  
			.catch((data) => {
				this.password = '';
				this.error = data.content.message;
			});
	}
}