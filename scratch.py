import sqlite3

connection = sqlite3.connect("contacts.db", check_same_thread=False)

crsr = connection.cursor()


cmd1 = """
        DELETE FROM Contacts where Personid not in 
        (SELECT min(PersonID) FROM Contacts group by Displayname, Cell, Home)
        """


crsr.execute(cmd1)

connection.commit()

