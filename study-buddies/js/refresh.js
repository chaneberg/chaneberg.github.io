$(document).ready(function(){
  setInterval(refresh, 5000);
  refresh();
});

function refresh() {
  $('#map').empty();
  $.getJSON('user/'+window.location.search.split('=')[1]+'.json', function(courseJson) {
    courses = courseJson.courses;
    $.each(courses, function(index, course) {
      $.getJSON('course/'+course.course+'.json', function(sessions) {
        sessions = sessions.sessions;
        $.each(sessions, function(index, session) {
          var size = Math.sqrt(session.count)*10+10;
          $('#map').append(
            '<button class="join-button" style="left: '+session.location.x+'px; top: '+session.location.y+'px; width: '+size+'px; height: '+size+'px; border-radius: '+size/2+'px; background: '+course.color+';" onclick="show_join_button('+session.id+')">'+session.count+'</button>'
          );
        });
      });
    });
  });
}