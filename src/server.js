const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./configs/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes); 

sequelize.sync({ logging: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
