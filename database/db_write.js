
require('dotenv').config();

const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.API_TOKEN
const url = process.env.INFLUX_URL
let org = process.env.INFLUX_ORG
let bucket = process.env.INFLUX_BUCKET

const client = new InfluxDB({url, token});

let writeClient = client.getWriteApi(org, bucket, 'ns');

const { measurements, devices, tags, fields} = require('../constants');




// // Write action.
// const writeAction = (action) => {
//   let point = new Point(measurements.activity)
//     .tag(tags.device, devices.device_1)
//     .intField('action', action)

//   void setTimeout(() => {
//     writeClient.writePoint(point)
//   }, 1000) // separate points by 1 second

//   void setTimeout(() => {
//     writeClient.flush()
//   }, 5000)
// }


// Write temperature.
const writeTemperature = (degrees) => {
  let point = new Point(measurements.temperature)
    .tag(tags.device, devices.device_1)
    .intField(fields.degrees, degrees)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write heart rate.
const writeHeartRate = (bpm) => {
  let point = new Point(measurements.heart_rate)
    .tag(tags.device, devices.device_1)
    .intField(fields.beats_per_inute, bpm)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write sound
const writeSound = (sound) => {
  let point = new Point(measurements.sound)
    .tag(tags.device, devices.device_1)
    .intField(fields.sound, sound)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}

// Write Sleep
const writeSleepData = (sleep_stage) => {
  let point = new Point(measurements.sleep)
    .tag(tags.device, devices.device_1)
    .intField(fields.sleep_stage, sleep_stage)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 0) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write walking duration
const writeWalkingDuration = (duration) => {
  let point = new Point(measurements.walking)
    .tag(tags.device, devices.device_1)
    .intField(fields.minutes, duration)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write walking steps
const writeSteps = (steps) => {
  let point = new Point(measurements.steps)
    .tag(tags.device, devices.device_1)
    .intField(fields.steps, steps)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write jogging steps
const writeJoggingDuration = (duration) => {
  let point = new Point(measurements.jogging)
    .tag(tags.device, devices.device_1)
    .intField(fields.minutes, duration)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write biking data
const writeBikingData = (biking_data) => {
  let point = new Point(measurements.biking)
    .tag(tags.device, devices.device_1)
    .intField(fields.minutes, biking_data)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


// Write idling data
const writeIdlingDuration = (duration) => {
  let point = new Point(measurements.idling)
    .tag(tags.device, devices.device_1)
    .intField(fields.minutes, duration)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}


module.exports = {
  writeTemperature, 
  writeHeartRate, 
  writeSound,
  writeSleepData,
  writeWalkingDuration,
  writeSteps,
  writeJoggingDuration,
  writeBikingData,
  writeIdlingDuration
};