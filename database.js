var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "customer.db"

var db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT,
            email TEXT NOT NULL,
            dateOfBirth TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timestamp TEXT
            )`, (err) => {
            if (err) {
            } else {
                var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["John Doe", "123 Main St, Colombo", "john@example.com", "1990-01-01", "Male", 33, "John Doe", "123456789012", "12/25", "123", "2023-01-01"])
            }
        })
    }
})

module.exports = db
