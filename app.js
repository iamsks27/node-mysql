const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
//app.use(express.urlencoded());


//Creating connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "nodeMysql"
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connection is establish");
});

//create db
app.get("/createdb", (req, res) => {
    const sql = "CREATE DATABASE nodeMysql";
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Database created");
    })
});

//create table
app.get("/createTable", (req, res) => {
    const sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255),PRIMARY KEY (id))";
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Table created");
    });
});

//insert posts
app.post("/addPosts", (req, res) => {
    const post = { title: req.body.title, body: req.body.body };
    const sql = 'INSERT INTO posts SET ?';
    connection.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send({ id: result.insertId });
    });
});

//select post
app.get("/post/:id", (req, res) => {
    const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});


app.listen(3000, () => {
    console.log("First Node App");
});
