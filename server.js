const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ msg: 'welcome to the brotherhood' }));

//initialize middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

connectDB();

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
