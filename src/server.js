const express = require('express');
const { sequelize } = require('./configs/database');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);


sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});