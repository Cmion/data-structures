import util from 'util';

export const print = (myObject: any, clear: boolean = false) => {
    if (clear) console.clear();
    console.log(util.inspect(myObject, false, null, true /* enable colors */));
  };