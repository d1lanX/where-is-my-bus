import express from 'express';
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000);
