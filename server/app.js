import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true }, (err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongo');
    }
});

const app = express();

app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');


// make express look in the public directory for assets (css/js/img)
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Prefix the API version
app.use('/api/v1', routes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.listen(port, () => {
//     console.log('The server has started on ' + `${port}`);
// });

export default app;