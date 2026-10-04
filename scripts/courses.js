// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	try {

		// response from server

		// local host / dev
		// const response = await fetch("http://localhost:3000/api/courses");
		// to run on local server: npx http-server -p 8080

		// live
		const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses");

		if (!response.ok) {
	    	throw new Error(`HTTP error! Status: ${response.status}`);
	    }

		// course list as promise
		const courses = await response.json();
		
		// get the ul element
		const ul = document.querySelector('#ul-courses');

		// extract data from promise using foreach 
		courses.forEach(course => {

			// debug
			// console.log(song.title, song.artist);

			// create li element
			const li = document.createElement('li');

			// add the song title and artist
			li.textContent = `${course.name}`;

			// append to the ul
			ul.append(li);

		});

	} catch (error) {
    	console.error('Failed to fetch courses:', error);
 	}

});