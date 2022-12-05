import { RegisterDevice, sendData } from '@customerglu/react-native-customerglu';
import { Platform } from 'react-native';

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

export async function sendEvent(name, properties) {
  let userData = {
    eventName: name,
    eventProperties: properties,
  };
  console.log('Sending event about', name,properties,JSON.stringify(properties).length);
  if (Platform.OS === 'ios') {
    await sendData(userData);
  } else {
    if (JSON.stringify(properties).length<=2) {
       userData.eventProperties={name:name}
       console.log('Sending event about----', name);
       await sendData(userData);
    }else{ await sendData(userData);}
   
  }
  console.log('Finished sending event');
}
