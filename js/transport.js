Transport = function(baseUrl, key) {
	this._baseUrl = baseUrl;
	this._key = key;
};


Transport.prototype.load = function(params) {
	var clonedParams = JSON.parse(JSON.stringify(params));
	clonedParams.sign = true;
	clonedParams.key = this._key;

	var signUrl = this._getUrl(clonedParams);

	return this
		._doRequest(signUrl)
		.then(function(response) {
			return this._doRequest(response.meta.signed_url);
		}.bind(this));
};


Transport.prototype._getUrl = function(params) {
	var query = Object
		.keys(params)
		.map(function(key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
		})
		.join('&');

	return this._baseUrl + '?' + query;
};


Transport.prototype._doRequest = function(url) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status === 200) {
				// Resolve the promise with the response object
				resolve(JSON.parse(req.response));
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = function() {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
};
