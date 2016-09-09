$(document).ready(function() {
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  // GET INDEX ACTION OF COURSES CONTROLLER
  // THIS IS A SERVER THAT LIVES SOMEWHERE ELSE
  function loadCourses() {
    $('#courses').empty();
    $.ajax({
      url: BASEURL + '/courses',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data) {
      data.forEach(function(course){
        $('#courses').prepend('<li>' + course.title + '<button data-course-id="' + course.id + '"class="delete_course">Delete</button></li>');
      });
    }).fail(function(data) {
      console.log(data);
    });
  }

  $('#load_courses').click(function() {
    loadCourses();  
  });

  // dynamic click handler for anything 
  // added after your page loaded
  $(document).on('click', '.delete_course', function() {
    // find the course id
    var courseId = $(this).data('course-id');
    // make the DELETE ajax call
    $.ajax({
      url: BASEURL + '/courses/' + courseId,
      type: 'DELETE',
      dataType: 'JSON'
    }).done(function(data){
      loadCourses();
    }).fail(function(data){
      console.log(data);
    });
    // pass the id as data to the server

    // handle success and fail

  });

  $('#show_create').click(function() {
    var $newCourseContent = $('#new_course_content');
    $newCourseContent.slideToggle(400, function(){
      var $createButton = $('#show_create');
      if($newCourseContent.is(':hidden')) {
        $createButton.text('Create Course');
      } else {
        $createButton.text('Hide Create Course');
      }
    });
  });

  $('#new_course').submit(function(e) {
    e.preventDefault(); // PREVENT ANY AND EVERYTHING DEFAULT
    // afax call
    var $courseTitle = $('#course_title');
    var $courseCode = $('#course_code');
    var $courseDesc = $('#course_desc');
    $.ajax({
      url: BASEURL + $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'JSON',
      data: {course: {title: $courseTitle.val(),
                      code: $courseCode.val(),
                      description: $courseDesc.val()}}
    }).done(function(data){
      $courseTitle.val('');
      $courseCode.val('');
      $courseDesc.val('');
      $courseTitle.attr('autofocus', true)
      // load all the courses again!
      loadCourses();
      console.log(data);
    }).fail(function(data){
      console.log(data);
    });
    // post to /courses
    // pass some data to the server
    // tell it that we want json back
    // handle the sexxess and fail of out ajax call


  });
});