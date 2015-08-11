import * as jsrsasign from 'jsrsasign';

console.log('JSRSASIGN', jsrsasign.default.jws.JWS.verifyJWT);

export var JWA = {
	RS256: 'RS256',
	RS512: 'RS512',
	HS256: 'HS256',
	HS512: 'HS512',
	none: 'none'
};

export class JWTUtility {
	constructor () {
		this.verifyJWT = jsrsasign.default.jws.JWS.verifyJWT;
		this.verifyParameters = {
			alg: [],
		};
	}

	configure (fn) {
		var builder = new JWTUtilityBuilder(this);
		fn(builder);
		return this;
	}

	verify (signature, key) {
		console.log('VERIFY');
		console.log('signature', signature);
		console.log('key', key);
		console.log('params', this.verifyParameters);

		// TODO: Perhaps switch to bluebird Promise.try method.
		try {
			return this.verifyJWT(signature, key, this.verifyParameters)
				? Promise.resolve(window.atob(signature.split('.')[1])) // Sigh. Refactor this.
				: Promise.reject(new Error('Invalid token.'));
		}
		catch (err) {
			return Promise.reject(err);
		}
	}
}

export class JWTUtilityBuilder {
	constructor (jwtUtility) {
		this.jwtUtility = jwtUtility;
	}

	addAlgorithm (algorithm) {
		if (this.jwtUtility.verifyParameters.alg.indexOf(algorithm) < 0) {
			this.jwtUtility.verifyParameters.alg.push(algorithm);
		}

		return this;
	}

	setIssuer (issuer) {
		this.jwtUtility.verifyParameters.iss = issuer;
		return this;
	}

	setSubject (subject) {
		this.jwtUtility.verifyParameters.sub = subject;
		return this;
	}

	setAudience (audience) {
		this.jwtUtility.verifyParameters.aud = audience;
		return this;
	}

	setVerifyAt (verifyAt) {
		this.jwtUtility.verifyParameters.verifyAt = verifyAt;
		return this;
	}
}

// TODO: Add error types.