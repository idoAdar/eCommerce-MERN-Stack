const express = require('express');
const mongoose = require('mongoose');

const URI = 'mongodb+srv://ido_adar:239738416@cluster0.vhfri.mongodb.net/proshop';
const PORT = 5000;
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json({ extended: false }));

// Main Routes:
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}` );
})
.catch(error => console.log(error));