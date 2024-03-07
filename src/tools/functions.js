import $ from "jquery";
import Crypto from "./crypto";
import router from "../router";
import Vue from "vue";
// import moment from "moment";
// const passwordStrength = require("check-password-strength");
import store from "../store";
import jwt_decode from "jwt-decode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  ToPage(page) {
    this.SaveSessionCustom("page", page);
    return router.replace(page).catch((error) => {
      return error;
    });
  },
  SaveSessionCustom(key, value) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return localStorage.setItem(key, encrypt);
  },
  ReadSessionCustom(key) {
    let read = localStorage.getItem(key);
    // // window.console.log(read);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        Vue.notify({
          group: "message",
          title: "Error ",
          text: key,
          type: "error",
          duration: 5000,
        });
        this.ToPage("/");
        // window.console.log(key);
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  },
  ReadSessionCustomInternal(key) {
    let read = localStorage.getItem(key);
    // // window.console.log(read);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        // window.console.log(key);
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  },
  RemoveSessionCustom(key) {
    let read = localStorage.getItem(key);
    if (read == "null") {
      return false;
    } else {
      localStorage.removeItem(key);
      return true;
    }
  },
};
