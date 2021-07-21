const express = require("express");
const app = express();
const db = require("./settings/database");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/createUser", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    db.query(
        "SELECT count(user_id) as user_exists FROM Users WHERE user_id=?",
        [email],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                if(result[0]['user_exists'] === 0) {
                    db.query(
                        "INSERT INTO Users(user_id, name) VALUES(?,?)",
                        [email, name],
                        (err, result) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log(`User with email ${email} was created succesfully.`);
                            }
                        }
                    );
                }
            }
        }
    )
});

app.post("/createPomodoro", (req, res) => {
    const user_id = req.body.user_id;
    const seconds = req.body.seconds;
    const date = req.body.date;
    const time = req.body.time;
    const was_completed = req.body.was_completed;
    const is_break = req.body.is_break;

    db.query(
        "INSERT INTO Pomodoros(user_id, seconds, date, time, was_completed, is_break) VALUES(?,?,?,?,?,?)",
        [user_id, seconds, date, time, was_completed, is_break],
        (err, result) => {
            if(err) {
                console.log(err);
            }
        }
    );
});

app.get("/getStats", (req, res) => {
    const email = req.param('email');
    db.query(
        "call getStats(?)",
        [email],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || PORT}`);
});