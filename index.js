const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


pool.connect();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {res.render('pages/index')})
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/create', (req, res) => {
    var id = req.body.id;
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
    var trainer = req.body.trainer;

    var insertUsersQuery = `INSERT INTO tokimon VALUES (${id},'${name}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${frozen}, ${total}, '${trainer}')`;
    console.log(insertUsersQuery);
    pool.query(insertUsersQuery, (error,result) => {
      if (error)
        throw error;
      var results = {'rows': result.rows };
      res.render('pages/products',results);
    });
    res.render('pages/products');
  })



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  pool.end();
