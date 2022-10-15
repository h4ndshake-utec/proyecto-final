const { Client, logger } = require('camunda-external-task-client-js');
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('buscar-clienteBD', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const amount = task.variables.get('amount');
  const item = task.variables.get('item');

  console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

  //open('https://docs.camunda.org/get-started/quick-start/success');

  // Complete the task
  await taskService.complete(task);
});



/*

var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "camunda_db"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM `CLIENTE`", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  */