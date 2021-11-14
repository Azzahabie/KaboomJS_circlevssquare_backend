
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(cors());

const client = require('./elephantSQL');

app.get('/getScore',async (req,res) => {
    try {
        const results = await client.query('SELECT * FROM leaderboard order by score desc LIMIT 10');
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send()
    }
})
app.post('/updateScore',async(req,res) => {
    var username = req.body.username
    var score = req.body.score
    try {
        const results = await client.query(`INSERT INTO leaderboard (username,score) values ('${username}',${score})`);
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send()
    }
})

app.post('/getUserScore',async(req,res) => {
    var username = req.body.username
    try {
        const results = await client.query(`SELECT username,score from leaderboard where username = '${username}' order by score desc LIMIT 3`);
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send()
    }
})


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Backend Listening on port ${port}`);
});
