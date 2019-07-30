function sleep( ms ) { return new Promise( resolve => setTimeout( resolve , ms ) ); }
module.exports.sleep = sleep;
function getRandomPropertyKey( wOBJ ) { var keys = Object.keys( wOBJ ); return keys[ keys.length * Math.random() << 0 ]; }
module.exports.getRandomPropertyKey = getRandomPropertyKey;
function getRandomArrayItem( wArray ) { return wArray[ Math.floor( Math.random() * wArray.length ) ]; }
module.exports.getRandomArrayItem = getRandomArrayItem;