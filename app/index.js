import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { me as appbit } from 'appbit';

if (!appbit.permissions.granted('access_heart_rate')) {
  console.log("We're not allowed to read a users' heart rate!");
}

const setBPMText = heartRate => {
  const bpmText = document.getElementById('bpm-text');
  bpmText.text = `${heartRate}`;
};

const setBGColor = heartRate => {
  const background = document.getElementById('background');
  const heartRateInt = parseInt(heartRate, 10);
  let color = 'black';
  const MAX = 190;
  if (heartRateInt <= 0.6 * MAX) {
    color = 'fb-dark-gray';
  } else if (heartRateInt <= 0.7 * MAX) {
    color = 'fb-blue';
  } else if (heartRateInt <= 0.83 * MAX) {
    color = 'fb-green-press';
  } else if (heartRateInt <= 0.91 * MAX) {
    color = 'fb-orange';
  } else if (heartRateInt > 0.91 * MAX) {
    color = 'fb-red';
  }
  background.style.fill = color;
};

var hrm = new HeartRateSensor();
if (
  HeartRateSensor &&
  appbit.permissions.granted('access_heart_rate')
) {
  hrm.onreading = () => {
    setBPMText(hrm.heartRate);
    setBGColor(hrm.heartRate);
  };
}

let trackButton = document.getElementById('track-button');

trackButton.onclick = evt => {
  hrm.start();
};

let stopButton = document.getElementById('stop-button');
stopButton.onclick = evt => {
  hrm.stop();
  setBPMText('--');
};
