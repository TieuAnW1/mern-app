require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.pwyryrw.mongodb.net/?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		);
		console.log('Connected MongoDB');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
