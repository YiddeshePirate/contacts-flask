import sqlite3

connection = sqlite3.connect("contacts.db", check_same_thread=False)

crsr = connection.cursor()


def add_to_table(table_name='Contacts', cursor=crsr, **kwargs):
    cursor.execute(f'pragma table_info("{table_name}")')

    # Get name and type, k[4] is if part of primary key

    cols = [(k[1].lower(), k[2]) for k in cursor.fetchall() if k[4] != 1]

    # To make sure it matches with the column names make them both lowercase

    kwargs = {k.lower(): kwargs[k] for k in kwargs}
    colslots = []
    col_fills = []

    for i in cols:
        fill = kwargs.get(i[0], None)
        if not fill:
            continue

        if i[1] == 'int':

            # It must be passed to sql as a string. remove digits if necessary

            if not isinstance(fill, int):
                fill = ''.join([k for k in fill if k.isdigit()])
            else:
                fill = str(fill)

        elif i[1].startswith('varchar'):
            fill = str(fill)

            # Need to add quotes to pass to sql as string

            fill = "\"" + fill + "\""

        col_fills.append(fill)
        colslots.append(i[0])

    slot_list = ", ".join(colslots)
    full_list = ", ".join(col_fills)
    cmnd = f'INSERT INTO {table_name} ({slot_list}) VALUES ({full_list})'
    print(cmnd)
    cursor.execute(cmnd)
    connection.commit()


def update(linesepvals, table_name='contacts', cursor=crsr):
    cursor.execute(f'pragma table_info("{table_name}")')
    cols = [(k[1].lower(), k[2]) for k in cursor.fetchall() if k[4] != 1]
    pk = cols[0][0]
    vals = linesepvals.split('|')
    key = vals[0]
    print(vals)
    vals = vals[1:]
    vals = [k if k != "<br>" else "null" for k in vals]
    vals = [k if not k.endswith("<br>") else k[:-4] for k in vals]
    print(vals)
    kwords = []
    for i, (j, k) in enumerate(cols[1:]):

        if vals[i] == "null":
            kwords.append(j + " = null")

        elif k == 'int':
            if not (all([l.isdigit() for l in vals[i]]) or vals[i] == "null"):
                print(j, vals[i])
                raise ValueError(f'Column {j} needs an int but has {vals[i]}')

            fill = vals[i]
            kwords.append(j + " = " + fill)

        elif k.startswith('varchar'):
            fill = str(vals[i])
            fill = "\"" + fill + "\""

            kwords.append(j + " = " + fill)

    kwords = ", ".join(kwords)

    command = f" UPDATE {table_name} SET  {kwords} WHERE {pk} = {key}"
    print(command)
    crsr.execute(command)
    connection.commit()

tst = "Bob|marley|Bob The Builde|9099099090|<br>|<br>|<br>|<br>"


def get_all(cursor=crsr, table='Contacts'):
    command = f'''SELECT * FROM {table}'''
    cursor.execute(command)
    rows = cursor.fetchall()
    return rows


def get_labels(cursor=crsr, table='Contacts'):
    cursor.execute(f'pragma table_info("{table}")')
    cols = [k[1] for k in cursor.fetchall()]
    return cols


if __name__ == "__main__":
    print(get_labels())
