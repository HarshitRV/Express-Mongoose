// For creating the dummy data for the database. 

const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true,useUnifiedTopology: true,})
    .then(() =>{
        console.log('connection established');
    })
    .catch(err => {
        console.log(err);
    });

const seedProducts = [
    {
        name: 'Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Watermelon',
        price: 5.99,
        category: 'fruit'
    }, 
    {
        name: 'Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Butter',
        price: 0.50,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res=>{
        console.log(res);
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })