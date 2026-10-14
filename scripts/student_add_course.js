// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	// load available courses into ul
	try {

		// list of courses in student's schedule
		// student id from local storage
		const studentId = localStorage.getItem('userId');

		// response from server

		// local host / dev
		//const coursesResponse = await fetch("http://localhost:3000/api/studentCourses/" + studentId);
		// to run on local server: npx http-server -p 8080

		// live
		const coursesResponse = await fetch("https://sdev-module5-tutorial.onrender.com/api/studentCourses/" + studentId);

		if (!coursesResponse.ok) {
		    throw new Error(`HTTP error! Status: ${coursesResponse.status}`);
		}

		// course list as promise
		const studentCourses = await coursesResponse.json();

		let courseIds = [];

		//console.log(courses);

		// check if empty
		if (Object.keys(studentCourses).length === 0) {
			// it is empty
		    console.log("JSON object is empty");

		    // show error
		    // document.getElementById('error').style.display='block';

		} else {
			// add to array
			studentCourses.forEach(course => {
				courseIds.push(course.courseId);
			});
		}

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

			// add the course name + edit and delete buttons
			li.textContent = `${course.name} - `;

			// check if this course is already in the student's schedule
			if (!courseIds.includes(course._id)) {
			  	// not in array, show add link

				// create a tag
				const a = document.createElement("a");

				a.href = "student_add_course.html?id="+course._id;
				a.textContent = "Add";
				a.classList.add('add-link');
				//a.classList.add('btn');
				//a.classList.add('btn-primary');

				// add btn to li
				li.appendChild(a);

				const space = document.createTextNode(" ");

				// add some space
				li.appendChild(space);

			} else {
				// in array, show already added text
				const space = document.createTextNode(" ");

				// add some space
				li.appendChild(space);

				const msg = document.createTextNode(" (In My Schedule)");

				// add some space
				li.appendChild(msg);
			}

			// append to the ul
			ul.append(li);

		});

		document.getElementById('searchBox').style.display="block";

	} catch (error) {
    	console.error('Failed to fetch courses:', error);
 	}

 	// user clicked add btn
	document.querySelectorAll('.add-link').forEach(link => {
	  link.addEventListener('click', async function(event) {
	    
	    //  Prevent the browser from navigating to the URL
	    event.preventDefault(); 
	    
	    //alert('link clicked...');

	    // get the full absolute URL from the clicked link
		const href = this.href; 

		// create a URL object and extract the 'id' parameter
		const urlObj = new URL(href);
		const courseId = urlObj.searchParams.get('id');
		const studentId = localStorage.getItem("userId");

		const data = { studentId: studentId, courseId: courseId };

		// send request to api
	    try {
	      // 
	      
	      // dev
	      // let url = "http://localhost:3000/api/addStudentCourse";
	      
	      // live
	      let url = "https://sdev-module5-tutorial.onrender.com/api/addStudentCourse";

		  const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify(data)
		  });

	      if (response.ok) {
	      	// show deleted message

	      	window.location.href="student_schedule.html";

	      } else {
	        // error; show error msg
	        const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${response.error}`;
		
			// show div
			errorDiv.style.display = "block";
	      }
	    } catch (error) {
	        // show error message

	    	const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;
		
			// show div
			errorDiv.style.display = "block";
	    }
	  });
	});
 	

});