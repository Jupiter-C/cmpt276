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

  // .get('/db', async (req, res) => {
  //   try {
  //     const client = await pool.connect()
  //     const result = await client.query('SELECT * FROM test_table');
  //     const results = { 'results': (result) ? result.rows : null};
  //     res.render('pages/db', results );
  //     client.release();
  //   } catch (err) {
  //     console.error(err);
  //     res.send("Error " + err);
  //   }
  // })

  .get('/users',(req,res) => {
    var getUsersQuery = `SELECT * FROM tokimon`;
    pool.query(getUserQuery, (error,result) => {
      if(error)
        res.end(error);
      var results = {'rows': result.rows};
      res.render('pages/users',results);
    });
  })
  
  .get('/users/:id', (req,res) => {
    var userIDQuery = `SELECT * FROM tokimon WHERE id=${req.params.id}`;
    pool.query(userIDQuery, (error,result) =>{
      if(error)
        res.end(error);
      var results = {'rows': result.rows};
      res.render('pages/details',results);
    });
  })

  .post('/create', async (req, res) => {
    try {
      const client = await pool.connect()
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
      const result = await client.query(insertUsersQuery);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/users', results );
      client.release();
    } catch (err) {
        console.error(err);
    }
  })

  .post('/change', async (req, res) => {
    try{
      const client = await pool.connect()
      const id = req.body.id;
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

      var changeUsersQuery = `UPDATE tokimon SET name = '${name}', weight = ${weight}, height = ${height}, fly = ${fly}, fight = ${fight}, fire = ${fire}, water = ${water}, electric = ${electric}, frozen = ${frozen}, total = ${total}, trainer = '${trainer}' WHERE id = ${id};`;
      const result = await client.query(changeUsersQuery);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/users', results );
      client.release();
    } catch (err) {
      console.error(err);
    }
  })

  .post('/delete', async (req, res) => {
    try{
      const client = await pool.connect()
      const id = req.body.id;

      var deleteUsersQuery = `DELETE FROM tokimon WHERE id = ${id};`;
      const result = await client.query(deleteUsersQuery);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/users', results );
      client.release();
    } catch (err) {
      console.error(err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
