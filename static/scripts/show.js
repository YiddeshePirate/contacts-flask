


function hide_col(colnum) {
    var elements = document.querySelectorAll(`[id$=col${colnum}]`);

    for (i=0; i<elements.length; ++i){
        console.log(elements[i].innerHTML);
        elements[i].style.display = "none";
    };
}


hide_col(1)

function show_col(colnum) {
    var elements = document.querySelectorAll(`[id$=col${colnum}]`);

    for (i=0; i<elements.length; ++i){
        console.log(elements[i].innerHTML);
        elements[i].style.display = "initial";
    };
}


function checkbox_clicked(box) {
    // var checkBox = document.getElementById(box_id);
    if (box.checked == true){
        console.log(box.id[0])
        console.log("is checked")
        show_col(box.id[0])
    }else{
        hide_col(box.id[0])
        console.log(box)
        console.log("is not checked")
    }
}

