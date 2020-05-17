

function merge_vcf() {

    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'mergevcf');
    xhttp.send();
    xhttp.addEventListener('load', function () {
        window.location.replace('/')
    });
}