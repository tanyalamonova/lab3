var baseUrl = 'https://api.meetup.com/2/open_events';
var apiKey = '2a5b133da764b144d116561683355';
var transport = new Transport(baseUrl, apiKey);

var promiseArray = [];
var promise;

var today = new Date();
var monday = 7 - today.getDay();
var sunday = monday + 6;

for (var i = monday; i <= sunday; i++) {
	promise = transport
		.load({
			country: 'us',
			state: 'ny',
			city: 'New York',
			topic: 'javascript',
			time: i + 'd,' + (i + 1) + 'd'
		})
		.then(function(response) {
			return response.results;
		});

	promiseArray.push(promise);
}

Promise
	.all(promiseArray)
	.then(function(response) {
		var output = document.getElementById('output');
		output.innerHTML = renderWeek(response);
	});
