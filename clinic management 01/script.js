const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let appointments = [];

app.post('/appointments', (req, res) => {
    const { patientName, doctor, date, time } = req.body;

    if (!patientName || !doctor || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    appointments.push({ patientName, doctor, date, time });
    res.status(201).json({ message: 'Appointment booked successfully!' });
});

app.get('/appointments', (req, res) => {
    res.status(200).json(appointments);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});