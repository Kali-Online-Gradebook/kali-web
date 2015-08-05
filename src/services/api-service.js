import {HttpClient} from 'aurelia-fetch-client';
import {AuthorizationService} from './aaa/authorization-service';
import {Config} from './config';
import {Router} from 'aurelia-router'; // Is this a bad separation of concerns?

export class ApiService {
	static inject () { return [HttpClient, AuthorizationService, Config, Router]; }

	constructor (data, authorizationService, config, router) {
		this.data = data.configure(x => {
			x.withBaseUrl(config.uri + config.api);
			x.useStandardConfiguration();
			x.withDefaults({
				mode: 'cors'
			});
			x.withInterceptor({
				request: function (request) {
					request.headers.set('Authorization', 'Bearer ' + authorizationService.getToken());
					return request;
				}
			});
			x.withInterceptor({
				responseError: function (response) {
					if (response.status === 401) {
						return response.json()
							.then((content) => {
								// TODO: Check some type of response code type here to know
								// whether we should force reauthentication or not. (Like, if
								// it's not a permisisons thing.)
								console.log(content);
								router.navigate('');
							});
					}
				}
			});
		});
	}
}