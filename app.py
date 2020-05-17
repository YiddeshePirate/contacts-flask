from flask import *
import vcftools
import sqltools
import time
import tempfile
import os


tmpdir = tempfile.TemporaryDirectory()

app = Flask(__name__)

# print(app.config['UPLOAD_FOLDER'])

@app.route("/")
def show_all():
    rows = sqltools.get_all()
    labels = sqltools.get_labels()
    return render_template("all.html", rows=rows, labels=labels)



@app.route("/updatecontact", methods=['POST', 'GET'])
def update_contact():
    if request.method == 'POST':
        try:
            print(request.json['table'])
            sqltools.update(request.json['msg'], table_name=request.json['table'])
            return "success", 200
        except Exception as e:
            return str(e), 400

    else:
        return "hello"


@app.route("/newcontact", methods=['POST', 'GET'])
def new_contact():
    if request.method == 'POST':
        sqltools.create_empty()
        print("yo")
        return "yo yourself"

@app.route("/deletecontact", methods=['POST', 'GET'])
def delete_contact():
    if request.method == 'POST':
        sqltools.delete(request.json['msg'], table=request.json['table'])
        return "yo yourself"

@app.route("/uploadvcf", methods=['POST', 'GET'])
def upload_vcf():
    if request.method == 'POST':
        vcfile = request.files['file']
        name = str(int(time.time()))
        vcfile.save(os.path.join(tmpdir.name, name))
        return redirect(url_for("import_vcf", filename=os.path.join(tmpdir.name, name)))

    return render_template("uploadvcf.html")

@app.route("/importvcf", methods=['POST', 'GET'])
def import_vcf():
    sqltools.drop_temp()
    vcffilename = request.args['filename']
    labels = sqltools.get_labels()
    rows = sqltools.createfromvcf(vcffilename, 'temp')
    return render_template("importvcf.html", rows=rows, labels=labels)


@app.route("/mergevcf", methods=['POST'])
def merge():
    sqltools.merge_temp()
    return 'yay', 400


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)



# todo implement upload vcf route

