


function hide_col(boxid) {
    console.log("hiding", boxid)
    colnum = parseInt(boxid, 10)
    var elements = document.querySelectorAll(`[id$=col${colnum}]`);

    for (i=0; i<elements.length; ++i){
        elements[i].style.display = "none";
    };
    document.getElementById(boxid).checked = false;
}

window.onload = function(){


    var elements = document.querySelectorAll("[id^=row1col]");
    newvals = []
    for (i=1; i<elements.length; ++i){
        newvals.push(elements[i].innerHTML);
    }
    for (var i = 1; i< elements.length; i++){
        if (newvals[i] != "<br>" && typeof newvals[i] != "undefined"){
            console.log(newvals[i])
            hide_col("1showcheckbox")
            hide_col("2showcheckbox")
            hide_col("3showcheckbox")
            hide_col("9showcheckbox")
            return
        };
        editclicked('roweditbutton1');
    }
}

function show_col(boxid) {
    document.getElementById(boxid).checked = true;
    colnum = parseInt(boxid, 10)
    var elements = document.querySelectorAll(`[id$=col${colnum}]`);

    for (i=0; i<elements.length; ++i){
        console.log(elements[i].innerHTML);
        elements[i].style.display = "initial";
    };
}


function checkbox_clicked(box) {
    if (box.checked == true){
        console.log(box.id[0])
        console.log("is checked")
        show_col(box.id)
    }else{
        hide_col(box.id)
        console.log(box)
        console.log("is not checked")
    }
}

