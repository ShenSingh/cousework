var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const isValidEmail = (email) => {
    if (!email) return false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidCreditCardNumber = (cardNumber) => {
    if (!cardNumber) return false;
    return /^\d{12}$/.test(cardNumber);
};

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/api/customers", (req, res, next) => {
    try {
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/api/customers/:id", (req, res, next) => {
    try {
        var sql = "select * from customer where customerId = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.post("/api/customer/register", (req, res, next) => {
    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        if (!isValidEmail(req.body.email)) {
            res.status(400).json({ "error": "Invalid email address." });
            return;
        }

        if (!isValidCreditCardNumber(req.body.cardNumber)) {
            res.status(400).json({ "error": "Invalid credit card number. It must be 12 digits." });
            return;
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timestamp
        } = req.body;

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp || new Date().toISOString()]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "customerId": this.lastID
                })
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.put("/api/customers/", (req, res, next) => {
    try {
        const {
            customerId,
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timestamp
        } = req.body;

        db.run(`UPDATE customer set name = ?, address = ?, email = ?, dateOfBirth = ?, gender = ?, age = ?, cardHolderName = ?, cardNumber = ?, expiryDate = ?, cvv = ?, timestamp = ? WHERE customerId = ?`,
            [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp, customerId],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(200).json({
                    "message": "success",
                    "updated": this.changes
                });
            });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.delete("/api/customers/delete/:id", (req, res, next) => {
    try {
        db.run(
            'DELETE FROM customer WHERE customerId = ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.json({
                    "message": "deleted",
                    "rows": this.changes
                })
            });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.get("/", (req, res, next) => {
    res.json({ "message": "Customer Registration API - University of Moratuwa" })
});

module.exports = app;
