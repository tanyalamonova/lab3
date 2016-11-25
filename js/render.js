var renderWeek = function(eventsForWeek) {
	var output = '';

	eventsForWeek.forEach(function(eventsForDay) {
		output += renderDay(eventsForDay);
	});

	return output;
};

var getVenueDate = function(timestamp) {
	var userDate = new Date(timestamp);
	var userOffset = userDate.getTimezoneOffset() * 60 * 1000;
	var venueOffset = -5 * 60 * 60 * 1000; // New York time zone: -5h
	return new Date(userDate.getTime() + venueOffset + userOffset);
};

var renderDay = function(eventsForDay) {
	var output = '';

	if (eventsForDay.length) {
		var date = getVenueDate(eventsForDay[0].time);
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var dotw = days[date.getDay()];

		output += '<h1>';
		output += dotw;
		output += '</h1>';

		eventsForDay.forEach(function(event) {
			output += renderEvent(event);
		});
	}

	return output;
};

var renderEvent = function(event) {
	var output = '';

	output += '<div class="event">';

	output += '<h2 class="event-title">';
	output += event.name;
	output += '</h2>';

	output += '<div class="event-date">';
	var venueDate = getVenueDate(event.time);
	output += (venueDate.getMonth() + 1) + '/' + venueDate.getDate() + '/' + venueDate.getFullYear();
	output += '</div>';

	if (event.venue) {
		output += '<div class="event-address">';
		output += event.venue.city;
		output += ', ' + event.venue.address_1;
		if (event.venue.address_2) {
			output += ', ' + event.venue.address_2;
		}
		if (event.venue.address_3) {
			output += ', ' + event.venue.address_3;
		}
		output += ', ' + event.venue.name;
		output += '</div>';
	}

	output += '<div class="event-desc">';
	output += event.description || 'No description';
	output += '</div>';

	output += '</div>';

	return output;
};
