$(document).ready(function () {

    var RectF = document.getElementById("RectF");
    var RectA = document.getElementById("RectA");
    var RectE = document.getElementById("RectE");
    var RectR = document.getElementById("RectR");

    /*** get led status from server ***/
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

    /*** draw led status from refreshLed()***/
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

    /*** Click on Free Mode ***/
    $('#M1click').on('click', function () {
        var status = document.getElementById("M1").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);

        if (RectF.style.fill === "none") {
            RectF.style.fill = "black"
            RectA.style.fill = "none"
            RectE.style.fill = "none"
        } else {
            RectF.style.fill = "none"
        }
    });

    /*** Click on Artistic Mode ***/
    $('#M2click').on('click', function () {
        var status = document.getElementById("M2").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);

        if (RectA.style.fill === "none") {
            RectA.style.fill = "black"
            RectF.style.fill = "none"
            RectE.style.fill = "none"
        } else {
            RectA.style.fill = "none"
        }
    });

    /*** Click on Educational Mode ***/
    $('#M3click').on('click', function () {
        var status = document.getElementById("M3").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);

        if (RectE.style.fill === "none") {
            RectE.style.fill = "black"
            RectA.style.fill = "none"
            RectF.style.fill = "none"
        } else {
            RectE.style.fill = "none"
        }
    });

    /*** Click on Reset ***/
    $('#Rclick').on('click', function () {
        var status = document.getElementById("Reset").value;
        var data = {
            "mode": parseInt(status)
        }
        /*** delete led status to server ***/
        requestThings("api/led", "DELETE", data);
        //console.log('MODE', Status);

        if (RectR.style.fill === "none") {
            RectR.style.fill = "black"
            setTimeout(function () {
                RectR.style.fill = "none"
            }, 400);        
        } else {
            RectR.style.fill = "none"
        }
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
