

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
    console.log(savebutton);
    // console.log(savebutton);
    var savebutton = document.getElementById(savebutton);
    savebutton.style.display = "initial";
    // console.log(elements);
    // alert("you clicked "+rownum)

    var editbutton = 'roweditbutton'+rownum;
    var editbutton = document.getElementById(editbutton);
    editbutton.style.display = "none";

    var deletebutton = 'rowdeletebutton'+rownum;
    // console.log(deletebutton);
    var deletebutton = document.getElementById(deletebutton);
    deletebutton.style.display = "initial";
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
    var editbutton = 'roweditbutton'+rownum;
    var editbutton = document.getElementById(editbutton);
    editbutton.style.display = "initial";

    var deletebutton = 'rowdeletebutton'+rownum;
    var deletebutton = document.getElementById(deletebutton);
    deletebutton.style.display = "none";

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
    xhttp.open('POST', 'updatecontact');
    newvals.unshift(key);
    var msg = {"msg": newvals.join("|")};
    var msgjson = JSON.stringify(msg)
    xhttp.setRequestHeader("Content-type", 'application/json;charset=UTF-8')
    xhttp.send(msgjson);
    var result = {"status": null, "text": null};
    xhttp.addEventListener('load', listenerf.bindArgs(result));
}

function listenerf(resulta) {
    resulta.status = this.status
    resulta.text = this.responseText
    if (resulta.status == 400){
        alert(resulta.text)
        location.reload()
    }
}



function deleteclicked(clickedid) {
    var rownum = clickedid[clickedid.length-1];
    var elements = document.querySelectorAll(`[id^=row${rownum}col]`);
    var newvals = [];

    for (i=1; i<elements.length; ++i){
        newvals.push(elements[i].innerHTML);
    }

    console.log('deleting', elements[0].innerHTML);
    delete_contact(elements[0].innerHTML);


    var savebutton = 'rowsavebutton'+rownum;
    var savebutton = document.getElementById(savebutton);
    savebutton.style.display = "none";
    var editbutton = 'roweditbutton'+rownum;
    var editbutton = document.getElementById(editbutton);
    editbutton.style.display = "initial";

    var deletebutton = 'rowdeletebutton'+rownum;
    var deletebutton = document.getElementById(deletebutton);
    deletebutton.style.display = "none";

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

function delete_contact(idnum) {
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'deletecontact');
    var msg = {"msg": idnum};
    var msgjson = JSON.stringify(msg)
    xhttp.setRequestHeader("Content-type", 'application/json;charset=UTF-8')
    xhttp.send(msgjson);
    xhttp.addEventListener('load', function(){location.reload()});
}

function new_empty_contact(){
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'newcontact');
    var msg = "yo"
    xhttp.send(msg);
    xhttp.addEventListener('load', function(){
        location.reload();
    });
}

window.onload = function(){
    var elements = document.querySelectorAll("[id^=row1col]");
    newvals = []
    for (i=1; i<elements.length; ++i){
        newvals.push(elements[i].innerHTML);
    }
    for (var i = 0; i< elements.length; i++){
        if (newvals[i] != "<br>"){
            return
        };
       editclicked('roweditbutton1');
    }
}

Function.prototype.bindArgs =
    function (...boundArgs)
    {
        const targetFunction = this;
        return function (...args) { return targetFunction.call(this, ...boundArgs, ...args); };
    };



