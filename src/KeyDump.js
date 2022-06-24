var keythereum = require("keythereum");
var path = require('path');

const keyDump = (privateKey, password, storeDir) => {
  try {
    var dk = keythereum.create();

    // console.log({
    //   privateKey: dk.privateKey.toString('hex'),
    //   iv: dk.iv.toString('hex'),
    //   salt: dk.salt.toString('hex')
    // })


    var keyObject = keythereum.dump(password, privateKey, dk.salt, dk.iv);

    // console.log(keyObject);

    if (!storeDir) {
      storeDir = path.join(__dirname, 'keystore')
    }

    const savedPath = keythereum.exportToFile(keyObject, storeDir);
    console.log(`saved in ${savedPath}`)
  } catch (e) {
    console.log("ERROR: ", e.message);
  }
}

(() => {
  var privateKey = process.argv[2];
  var password = process.argv[3];

  if (!privateKey || !password) {
    return console.log("need params: privateKey password");
  }

  keyDump(privateKey, password);
})();

module.exports = keyDump;