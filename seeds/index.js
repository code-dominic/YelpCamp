
const mongoose = require('mongoose');
const Campground = require('../models/campground');
// const campground = require('../models/campground');
const cities = require('./cities');
const {descriptors , places} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

    .then( data=>{
        console.log('mongodb connected!!');
    })
    .catch( err=>{
        console.log('connection failed');
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0 ; i<50 ; i++){
        const price = Math.floor(Math.random()*30) +10;
        const rand = Math.floor(Math.random()*1000)
        const camp = new Campground({
            author : '666e584c659e83222aef7198',
            location : `${cities[rand].city} ${cities[rand].state}`,
            title : `${sample(descriptors)}  ${sample(places)}`,
            images : [
                {
                    url: 'https://res.cloudinary.com/dwmxqqp9a/image/upload/v1719572279/YelpCamp/vgbhgqu7n0ng1tgzmjsn.jpg',
                    filename: 'YelpCamp/vgbhgqu7n0ng1tgzmjsn'
                  },
                  {
                    url: 'https://res.cloudinary.com/dwmxqqp9a/image/upload/v1719572282/YelpCamp/h4yu9dmzxs4o86x6rylw.jpg',
                    filename: 'YelpCamp/h4yu9dmzxs4o86x6rylw'
                  }
            ],
            description:'    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, impedit voluptates. Tenetur, soluta molestiae nihil eveniet vitae in fugit ratione beatae maxime! Laudantium incidunt minima velit officiis dignissimos voluptate delectus?',
            price
        })
        await camp.save();
    }
    console.log('done');
}

seedDB().then(()=>{
    mongoose.connection.close();
})