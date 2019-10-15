const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {res.render('pages/index')})
  .post('/create', (req, res) => {
    var name = req.body.name;
    var weight = req.body.weight;
    var height = req.body.height;
    var fly = req.body.fly;
    var fight = req.body.fight;
    var fire = req.body.fire;
    var water = req.body.water;
    var electric = req.body.electric;
    var frozen = req.body.frozen;
    var total = req.body.total;
    var trainnername = req.body.trainnername;
    pool.connect();

    var  insertUsersQuery = `INSERT INTO tokimon VALUES ('${name}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${frozen}, ${total}, '${trainnername}');`
    console.log(insertUsersQuery);
    pool.query(insertUserQuery, (error,result) => {
      if (error)
        throw error;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    });
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
