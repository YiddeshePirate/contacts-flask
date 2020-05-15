

function editclicked(clickedid) {
    document.getElementById('labelcolfilledit').style.display = 'initial';
    var rownum = clickedid.match(/\d+$/)[0];

    //todo decide if move to top when editing

    // var row = document.getElementById(`row${rownum}`);
    // var toprow = row.parentElement.firstChild.nextElementSibling;
    // console.log(toprow, 'toprow');

    var elements = document.querySelectorAll(`[id^=row${rownum}col]`);
    for (i=1; i<elements.length; ++i){
        elements[i].contentEditable = true;
        elements[i].style.color = "#000000";
        elements[i].style.background = "#EEEEEE";
    }

    changedisplay('roweditbutton', rownum, "none");
    changedisplay('rowdeletebutton', rownum, "initial");
    changedisplay('rowsavebutton', rownum, "initial");

};


function saveclicked(clickedid, table_name) {
    var rownum = clickedid.match(/\d+$/)[0];
    var elements = document.querySelectorAll(`[id^=row${rownum}col]`);

    var newvals = [];

    for (i=1; i<elements.length; ++i){
        newvals.push(elements[i].innerHTML);
    }
    pushtodatabase(elements[0].innerHTML, newvals, table_name)

    document.getElementById('labelcolfilledit').style.display = 'none';

    changedisplay('roweditbutton', rownum, "initial");
    changedisplay('rowsavebutton', rownum, "none");
    changedisplay('rowdeletebutton', rownum, "none");

    for (i=1; i<elements.length; ++i){
        elements[i].contentEditable = false;

        elements[i].style.color = null;
        elements[i].style.background = null;
        if (elements[i].innerHTML !== "<br>"){

            elements[i].style.border = "1px solid rgba(222, 220, 201, 0.93)";

        }else{
            elements[i].style.border = "1px solid #444444";
        }

    }
}



function pushtodatabase(key, newvals, table_name) {
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'updatecontact');
    newvals.unshift(key);
    var msg = {"msg": newvals.join("|"), 'table': table_name};
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



function delete_contact(clickedid, table_name) {
    var rownum = clickedid.match(/\d+$/)[0];
    changedisplay('roweditbutton', rownum, "initial");
    changedisplay('rowsavebutton', rownum, "none");
    changedisplay('rowdeletebutton', rownum, "none");
    var idnum = document.getElementById("row"+rownum+"col1").innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'deletecontact');
    var msg = {"msg": idnum, "table": table_name};
    var msgjson = JSON.stringify(msg)
    xhttp.setRequestHeader("Content-type", 'application/json;charset=UTF-8')
    xhttp.send(msgjson);
    xhttp.addEventListener('load', function(){
        document.getElementById('row'+rownum).style.display = "none";
    });
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


Function.prototype.bindArgs =
    function (...boundArgs)
    {
        const targetFunction = this;
        return function (...args) { return targetFunction.call(this, ...boundArgs, ...args); };
    };



function changedisplay(base, rownum, newdisplay){
    var button = base + rownum;
    var button = document.getElementById(button);
    button.style.display = newdisplay;
}
