const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: '*', // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
};

app.use(cors(corsOptions)); // Usar cors con las opciones definidas
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/reviewdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
