const crypto = require("crypto");

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const iterations = 10000;
  const keylen = 64;
  const digest = "sha512";

  const genHash = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");

  return {
    salt: salt,
    genHash: genHash,
  };
}

function validPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
