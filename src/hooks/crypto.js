// var CryptoJS = require("crypto-js");

export default function crypto() {
  const secret = "dpRx3s4";
  const secretEnd = "YYzx3s4w";

  const encryptId = (id) => {
    // return encodeURIComponent(CryptoJS.AES.encrypt(id, secret));
    return secret + id + secretEnd;
  };

  const decryptId = (chipertext) => {
    // return CryptoJS.AES.decrypt(
    //   decodeURIComponent(chipertext),
    //   secret
    // ).toString();
    return chipertext.toString().replace(secret, "").replace(secretEnd, "");
  };

  return { encryptId, decryptId };
}
