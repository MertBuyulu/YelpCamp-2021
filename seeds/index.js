const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const CampGround = require('../models/campground');

// getting connected to the database
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error!!'));
db.once('open', function () {
    console.log('Database Connected!!');
});

const fetch = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await CampGround.deleteMany({});
    for (let i = 0; i < 300; ++i) {
        const idx = parseInt(Math.random() * 50);
        const price = Math.floor((Math.random() * 20)) + 10;
        const camp = new CampGround({
            author: "60a70866ab297e05516b6101",
            location: `${cities[idx].city}, ${cities[idx].state}`,
            title: `${fetch(descriptors)} ${fetch(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[idx].longitude, cities[idx].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfck9mh1i/image/upload/v1622341877/YelpCamp/n6o1vjmcgy0pjopsquvn.jpg',
                    filename: 'YelpCamp/n6o1vjmcgy0pjopsquvn'
                },
                {
                    url: 'https://res.cloudinary.com/dfck9mh1i/image/upload/v1622341157/YelpCamp/ukcgdw8h8dkkseqwoxly.jpg',
                    filename: 'YelpCamp/ukcgdw8h8dkkseqwoxly'
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, iure? A consequuntur quod quidem. Repudiandae libero laborum quam, aliquid molestiae adipisci inventore sunt earum ipsa.',
            price: price
        });
        await camp.save();
    }
};

// close database connection after populating the database
seedDB().then(() => {
    mongoose.connection.close();
});
