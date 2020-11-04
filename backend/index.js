require('dotenv').config();
require('./config/passport');
const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const friendRoutes = require('./routes/friend');
const commentRoutes = require('./routes/comment');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/friend', friendRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is starting at port ${process.env.PORT}`)
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Data SYNC");
    })
    .catch(err => {
        console.log(err);
    })