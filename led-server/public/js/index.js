$(document).ready(function () {

    let RectF = document.getElementById("RectF");
    let RectA = document.getElementById("RectA");
    let RectE = document.getElementById("RectE");
    let RectR = document.getElementById("RectR");
    let chooseBtn = document.getElementById("chooseBtn");

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
    document.getElementById("M1click").onclick = function () { 
        let status = document.getElementById("M1").value;
        let data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);
        //console.log('MODE', Status);

        if (RectF.style.fill === "none") {
            RectF.style.fill = "black"
            RectA.style.fill = "none"
            RectE.style.fill = "none"
            chooseBtn.style.display = "none"
        } else {

        }
    };

    /*** Click on Artistic Mode ***/
    document.getElementById("M2click").onclick = function () {
        let status = document.getElementById("M2").value;
        let data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);

        if (RectA.style.fill === "none") {
            RectA.style.fill = "black"
            RectF.style.fill = "none"
            RectE.style.fill = "none"
            chooseBtn.style.display = "none"
        } else {

        }
    };
    

    /*** Click on Educational Mode ***/
    document.getElementById("M3click").onclick = function () {
        let status = document.getElementById("M3").value;
        let data = {
            "mode": parseInt(status)
        }
        /*** post mode to server ***/
        requestThings("api/mode", "POST", data);

        if (RectE.style.fill === "none") {
            RectE.style.fill = "black"
            RectA.style.fill = "none"
            RectF.style.fill = "none"
            chooseBtn.style.display = "inline-block"
            document.getElementById("file-upload").disabled = true;
        } else {

        }

        document.getElementById("file-select").onclick = function () {
        document.getElementById("file-upload").disabled = false;
        };
    };

    

    /*** Click on Reset ***/
    document.getElementById("Rclick").onclick = function () {
        let status = document.getElementById("Reset").value;
        let data = {
            "mode": parseInt(status)
        }
        /*** delete led status to server ***/
        requestThings("api/led", "DELETE", data);

        if (RectR.style.fill === "none") {
            RectR.style.fill = "black"
            setTimeout(function () {
                RectR.style.fill = "none"
            }, 400);        
        } else {
            RectR.style.fill = "none"
        }
    };

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
    requestThings("api/mode", "get");

    let status = document.getElementById("M1").value;
    let data = {
        "mode": parseInt(status)
    }
    requestThings("api/mode", "POST", data);

    setInterval(function () { refreshLed(); }, 400);
    
    draw([]);

});
