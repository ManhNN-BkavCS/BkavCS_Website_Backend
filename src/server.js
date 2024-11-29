const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./configs/database');
const userService = require('./services/UserService');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

sequelize.sync({ logging: false }).then(async () => {
  await userService.createSuperAdmin();
  app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
  });
});