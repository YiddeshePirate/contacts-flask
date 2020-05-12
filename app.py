from flask import *
import sqltools

app = Flask(__name__)


@app.route("/")
def all():
    rows = sqltools.get_all()
    return render_template("all.html", rows=rows)



@app.route("/updatecontact", methods=['POST', 'GET'])
def update_contact():
    if request.method == 'POST':
        sqltools.update(request.json['msg'])

    return str(request.form)



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
















