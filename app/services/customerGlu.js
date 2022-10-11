import {RegisterDevice, sendData} from '@customerglu/react-native-customerglu';

export async function register(userData) {
  console.log('Registering device');
  var ok = await RegisterDevice(userData);
  console.log('Registered');
  if (ok == true) {
    console.log('Success');
  } else {
    console.log('Fail');
  }
  return ok;
}

export async function sendEvent(name) {
  let userData = {
    eventName: name,
    eventProperties: {
      accountName: 'Amusoftech',
      accountEmail: 'amusoftech@gmail.com',
    },
  };
  console.log('Sending event about', name);
  await sendData(userData);
  console.log('Finished sending event');
}
