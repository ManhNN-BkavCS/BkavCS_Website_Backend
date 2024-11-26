const express = require('express');
const { sequelize } = require('./configs/database');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
app.use(express.json());

app.use('/api/services', serviceRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});