require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models/index');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use('/api', require('./routes/api'));

sequelize.sync({alter: true})
  .then(() => {
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + listener.address().port);
    });
  })
  .catch(error => {
    console.error(error);
  });
  /*
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  });
  */