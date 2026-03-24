import { Time } from './Time.js';

const time = new Time(13, 37, 0);
console.log(time.toString()); // Output: "13:37:00"
console.log(time.getHours()); // Output: 13
time.addMinutes(10);
console.log(time.toString());
time.addSeconds(8000);
console.log(time.toString());
