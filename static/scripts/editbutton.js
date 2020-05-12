

function editclicked(clickedid) {
    console.log(clickedid)
    var rownum = clickedid[clickedid.length-1]
    var elements = document.querySelectorAll(`[id^=row${rownum}col]`)
    for (i=1; i<elements.length; ++i){
        elements[i].contentEditable = true;
        elements[i].style.color = "#000000";
        elements[i].style.background = "#EEEEEE";
    }
    var savebutton = 'rowsavebutton'+rownum
    document.
    console.log(elements)
    // alert("you clicked "+rownum)

}
