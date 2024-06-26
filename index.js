require('dotenv').config();
const cors = require('cors');
const express = require('express');
const general_routes = require('./router/general.js').general;
const bucket = process.env.INFLUX_BUCKET
const { getAllData, getTemperature } = require('./database/db_read');
const {deleteAllMeasurementData, deleteMeasurement, deleteTag} = require('./database/db_delete');
const mqttClient = require('./mqtt/subscriber');

let previous_sleep_value = null;

const { 
    writeTemperature, 
    writeHeartRate, 
    writeSound, 
    writeSleepData,
    writeWalkingDuration,
    writeJoggingDuration,
    writeSteps,
    writeBikingData,
    writeIdlingDuration 
} = require('./database/db_write');

const {     
    ch_temperature,
    ch_sound,
    ch_heart,
    ch_sleep,
    ch_walking,
    ch_jogging,
    ch_biking,
    ch_idle, 
    ch_steps
} = require('./mqtt/channels');



const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001' // Allow requests from this origin
}));

mqttClient.on('message', (topic, message) => {
    latestMessage = `Received message: ${message.toString()} on topic: ${topic}`;

    if (topic === ch_temperature){
        writeTemperature(message);
        console.log(`Temperature: ${message}.`)
    } else if (topic === ch_sound){
        writeSound(message)
        console.log(`Sound Type: ${message}.`)
    } else if (topic === ch_heart){
        writeHeartRate(message);
        console.log(`Heart rate: ${message} beats per minute.`)
    } else if (topic === ch_sleep){
        if (previous_sleep_value !== null){
            writeSleepData(previous_sleep_value);
        }
        writeSleepData(message);
        previous_sleep_value = message;
        console.log(`Sleep level: ${message}.`)
    } else if (topic === ch_walking){
        writeWalkingDuration(message);
        console.log(`Walking for ${message} minutes.`)
    } else if (topic === ch_jogging){
        writeJoggingDuration(message);
        console.log(`Jogging for ${message} minutes.`)
    } else if (topic === ch_steps){
        writeSteps(message);
        console.log(`${message} steps so far`);
    } else if (topic === ch_biking){
        writeBikingData(message);
        console.log(`Biking data: ${message}.`)
    } else if (topic === ch_idle){
        writeIdlingDuration(message);
        console.log(`Idling data: ${message}.`)
    }

    // deleteMeasurement(bucket, 'sleep');
    // deleteMeasurement(bucket, 'idling');
    // deleteMeasurement(bucket, 'walking');
    // deleteMeasurement(bucket, 'jogging');
    // deleteMeasurement(bucket, 'biking');

    // deleteMeasurement(bucket, 'temperature');

});

app.use("/", general_routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Web server listening at http://localhost:${port}`);
});

