const express = require("express");
const app = express();
const db = require("./settings/database");
const cors = require("cors");
const { response } = require("express");

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

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});