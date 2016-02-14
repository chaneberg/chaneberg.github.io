function create_session() {
    console.log('create');
    $.ajax({
        url: '/course/'+'CSIS 201',
        type: 'POST',
        data: JSON.stringify({location: {x:118, y:420}}),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function () {
            console.log('success');
        },
        error: function () {
            console.log('error');
        }
    });
}