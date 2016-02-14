function show_join_button(sessionid) {
    var button = $('#create-or-join');
    button.html('Join');
    button.removeClass('create');
    button.addClass('join');
    button.removeAttr('onclick');
    button.off();
    button.click(function() {join(sessionid)});
}

function join(sessionid) {
    console.log('join');
    $.ajax({
        url: '/sessions/'+sessionid+'/'+window.location.search.split('=')[1],
        type: 'PUT',
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function(result) {
            console.log('success');
        },
        error: function () {
            console.log('error');
        }
    });
    var button = $('#'+sessionid);
    button.html(parseInt(button.html()) + 1);
    var button = $('#create-or-join');
    button.html('Create');
    button.removeClass('join');
    button.addClass('create');
    button.off();
    button.click(function() {$('#create').show(200)});
}