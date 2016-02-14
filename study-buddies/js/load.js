var courses;

//jquery onload:
$(function() {
	// Load courses.
	$.getJSON('user/'+window.location.search.split('=')[1]+'.json', function(courseJson) {
		courses = courseJson.courses
		
		$.each(courses, function(index, course) {
			$("#course-selector").append($("<option>").text(course.course));
			$("#course-button-" + index)
				.css("color", course.color)
				.css("border-color", course.color).html(course.course);
		})
    });
	
})