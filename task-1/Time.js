export class Time {
  #secondsFromMidnight
  
  constructor(hours, minutes , seconds) {
   
    this.#secondsFromMidnight = hours * 3600 + minutes * 60 + seconds
  }
   getHours() { 
    return Math.floor(this.#secondsFromMidnight / 3600)
  }
   getMinutes() {
    return Math.floor((this.#secondsFromMidnight % 3600) / 60)
  }
   getSeconds() {
    return this.#secondsFromMidnight % 60
  }

  addSeconds(seconds) {   
   this.#secondsFromMidnight += seconds;
   this.#secondsFromMidnight = ((this.#secondsFromMidnight % 86400) + 86400) % 86400;
  }
  addMinutes(minutes) {
    this.addSeconds(minutes * 60)
  } 
  addHours(hours) {
    this.addSeconds(hours * 3600)
  }
  toString() {
    const hours = String(this.getHours()).padStart(2, '0');
    const minutes = String(this.getMinutes()).padStart(2, '0');
    const seconds = String(this.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }     
}

