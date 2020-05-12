from flask import *
import sqltools

app = Flask(__name__)


@app.route("/")
def all():
    rows = sqltools.get_all()
    return render_template("all.html", rows=rows)




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
















