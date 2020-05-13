from flask import *
import sqltools

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



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
