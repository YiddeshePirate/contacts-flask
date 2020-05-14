from flask import *
import sqltools
import time

app = Flask(__name__)


@app.route("/")
def show_all():
    rows = sqltools.get_all()
    labels = sqltools.get_labels()
    return render_template("all.html", rows=rows, labels=labels)



@app.route("/updatecontact", methods=['POST', 'GET'])
def update_contact():
    if request.method == 'POST':
        try:
            sqltools.update(request.json['msg'])
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
        sqltools.delete(request.json['msg'])
        return "yo yourself"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)



#todo implement upload vcf route


