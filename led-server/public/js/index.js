$(document).ready(function () {

    function refreshLed() {
        //let $palette = $('#ledStatus #grid');
        //$palette.empty();
        $.ajax({
            url: "/api/led",
            method: 'GET',
            success: function (result) {
                //console.log('CURRENT', result);
                draw(result);
            }
        });
    }

    function draw(arr) {
        let $palette = $('#ledStatus #grid');
        $palette.empty();
        arr.forEach(row => {
            row.forEach(element => {
                //console.log('elm', element);
                let $div = $('<span>')
                    .css('background-color', element)
                //.text(element);
                $palette.append($div);
            });
            $palette.append($('<br/>'));
        });
    }   


    $('#M1click').on('click', function () {
        var status = document.getElementById("M1").value;
        console.log('test:', status);
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);
    });

    $('#M2click').on('click', function () {
        var status = document.getElementById("M2").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);
    });

    $('#M3click').on('click', function () {
        var status = document.getElementById("M3").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);
    });


    function requestThings(_url, _type, _data){
        $.ajax({
            url: _url,
            type: _type,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(_data),
            success: function (result) {
                console.log('CURRENT', result);
            }
        });
    }

    /*** get mode from server ***/
    requestThings("api/mode", "get")

    setInterval(function () { refreshLed(); }, 400);
    
    draw([]);

});
