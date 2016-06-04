
function Table  (){

    var PvzObj = function(){
        var div = document.createElement("div");
        if(typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined' ){
            div.setAttribute(arguments[0],arguments[1]);
        };
        return div;
    };

    var sWidth  = arguments[0] || 8;
        sHeight = arguments[1] || 8;
    tabl = document.createElement("div");
    var i= 0;
    var j= 0;
    cols = Array();

    for(i =0; i< sWidth; i++){
        cols[i] = new PvzObj("class","col");
        for(j =0;  j< sHeight; j++ ){
            cols[i].appendChild(new PvzObj("class","row"));
        };
        tabl.appendChild(cols[i]);
    };
    return tabl;
};

//document.getElementById("conteiner").appendChild(new Table());
