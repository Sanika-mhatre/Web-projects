const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let appointments = [];

app.post('/book', (req, res) => {
    const { teacher, studentName, date, time } = req.body;

    if (!teacher || !studentName || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    appointments.push({ teacher, studentName, date, time });
    res.status(200).json({ message: 'Appointment booked successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});