

function editclicked(clickedid) {
    // console.log(clickedid)
    var rownum = clickedid[clickedid.length-1]
    var elements = document.querySelectorAll(`[id^=row${rownum}col]`)
    for (i=1; i<elements.length; ++i){
        elements[i].contentEditable = true;
        elements[i].style.color = "#000000";
        elements[i].style.background = "#EEEEEE";
    }
    var savebutton = 'rowsavebutton'+rownum;
    // console.log(savebutton);
    var savebutton = document.getElementById(savebutton);
    savebutton.style.display = "initial";
    // console.log(elements);
    // alert("you clicked "+rownum)

};


function saveclicked(clickedid) {
    var rownum = clickedid[clickedid.length-1];
    var elements = document.querySelectorAll(`[id^=row${rownum}col]`);
    var newvals = [];

    for (i=1; i<elements.length; ++i){
        newvals.push(elements[i].innerHTML);
    }
    pushtodatabase(elements[0].innerHTML, newvals)

    var savebutton = 'rowsavebutton'+rownum;

    var savebutton = document.getElementById(savebutton);
    savebutton.style.display = "none";

    for (i=1; i<elements.length; ++i){
        elements[i].contentEditable = false;

        elements[i].style.color = null;
        elements[i].style.background = null;
        if (elements[i].innerHTML !== "<br>"){

            elements[i].style.border = "2px solid rgba(222, 220, 201, 0.93)";

        }else{
            elements[i].style.border = "2px solid #444444";
        }

    }
}


function pushtodatabase(key, newvals) {
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'updatecontact', true);
    newvals.unshift(key);
    var msg = {"msg": newvals.join("|")};
    var msgjson = JSON.stringify(msg)
    console.log(msgjson)
    xhttp.setRequestHeader("Content-type", 'application/json;charset=UTF-8')
    xhttp.send(msgjson);

}


//
// function borderempty() {
//     // var elements = document.querySelectorAll(`[id^=row${rownum}col]`);
//     for (const a of document.querySelectorAll("p")) {
//       if (a.textContent.includes("&nbs")) {
//         console.log(a.textContent)
//       }
// }
// }
