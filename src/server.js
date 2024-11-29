const express = require('express');
const { sequelize } = require('./configs/database');
const serviceRoutes = require('./routes/serviceRoutes');
const requestIp = require('request-ip');
const app = express();
app.use(express.json());
app.use(requestIp.mw());
app.use('/api/services', serviceRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});