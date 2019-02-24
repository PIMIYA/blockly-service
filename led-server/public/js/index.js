$(document).ready(function () {
    function refreshLed() {
        let $palette = $('#ledStatus #grid');
        $palette.empty();
        $.ajax({
            url: "/api/led",
            method: 'GET',
            success: function (result) {
                // console.log(result);
                result.forEach(row => {
                    row.forEach(element => {
                        let $div = $('<span>')
                            .css('background-color', element)
                            .text(element);
                        $palette.append($div);
                    });
                    $palette.append($('<br/>'));
                });
            }
        });
    }

    function refreshButton() {
        let $palette = $('#buttonStatus #grid');
        $palette.empty();
        $.ajax({
            url: "/api/button",
            method: 'GET',
            success: function (result) {
                // console.log(result);
                result.forEach(row => {
                    row.forEach(element => {
                        let $div = $('<span>')
                            .css('background-color', element ? '#fff' : '#aaa')
                            .text(element);
                        $palette.append($div);
                    });
                    $palette.append($('<br/>'));
                });
            }
        });
    }

    $('#ledStatus #btnRefresh').click(() => {
        refreshLed();
    });

    $('#buttonStatus #btnRefresh').click(() => {
        refreshButton();
    });

    refreshLed();
    refreshButton();
});
