const express = require('express');
const { sequelize } = require('./configs/database');
const userRoutes = require('./routes/userRoutes');
const setupSuperAdmin = require('./setupDefaultUser');

const app = express();
app.use(express.json());

setupSuperAdmin(); 

app.use('/users', userRoutes);

sequelize.sync({ logging: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
