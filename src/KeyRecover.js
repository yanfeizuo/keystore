var keythereum = require("keythereum");
var path = require('path');

const keyRecover = (address, password, storeDir) => {
  try {
    if (!storeDir) {
      storeDir = path.join(__dirname);
    }

    var keyObject = keythereum.importFromFile(address, storeDir);

    var privateKey = keythereum.recover(password, keyObject);

    console.log(`privateKey: ${privateKey.toString('hex')}`)
  } catch (e) {
    console.log('ERROR: ', e.message);
  }
}

(() => {
  var address = process.argv[2];
  var password = process.argv[3];

  if (!address || !password) {
    return console.log("need params: address password");
  }

  keyRecover(address, password);
})();

module.exports = keyRecover;