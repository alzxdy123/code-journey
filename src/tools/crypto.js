import CryptoJS from "crypto-js";
import router from "../router";
// var hash = require("hash.js");

const kunci_akses = "AldyBD";

export default {
  encryption: function (data) {
    try {
      if (data == null) {
        return null;
      } else {
        let enkripsi = CryptoJS.AES.encrypt(data, kunci_akses).toString();
        return enkripsi;
      }
    } catch (error) {
      window.console.log(error);
      return null;
    }
  },
  dencrytion: function (data) {
    try {
      if (data == null) {
        return null;
      } else {
        let bytes = CryptoJS.AES.decrypt(data, kunci_akses);
        let terjemaah = bytes.toString(CryptoJS.enc.Utf8);
        return terjemaah;
      }
    } catch (error) {
      window.console.log(error);
      return null;
    }
  },
  mengecek: function (data) {
    try {
      if (data == "") {
        return router.replace("/");
      } else {
        return data;
      }
    } catch (error) {
      // window.console.log(error);
      return error;
    }
  },
  HmacSHA1(data) {
    try {
      return CryptoJS.HmacSHA1(data, kunci_akses);
    } catch (e) {
      window.consoel.log(e);
      return e;
    }
  },
  encryptionSha256: function (data) {
    try {
      if (data == null) {
        return null;
      } else {
        const encryptSHA256 = hash.sha256().update(data).digest("hex");
        return encryptSHA256;
      }
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
};
