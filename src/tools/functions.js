import $ from "jquery";
import Crypto from "./crypto";
import router from "../router";
import Vue from "vue";
import moment from "moment";
const passwordStrength = require("check-password-strength");
import store from "../store";
import jwt_decode from "jwt-decode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  GenerateChaptcha(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  FormatDateTransaction(time) {
    let date = moment(time, "YYYYMMDD hh:mm:ss").format(
      "DD MMMM YYYY hh:mm:ss"
    );
    return date;
  },
  MenuActive() {
    // window.console.log(this.ReadSessionCustom('session_menu'));
    let ReadSessionCustom = this.ReadSessionCustomInternal("session_menu");

    $(document).ready(function () {
      var menu = $(".menu");
      // let ReadMenu            =   ReadSessionCustom;
      if (ReadSessionCustom == null) {
        $(".nav-side").css("max-width", "0%");
      } else {
        $(".content#" + ReadSessionCustom).css("display", "block");
        // $('.nav-side').css('max-width','21%');
        // $('#main').addClass('col-md-7');
        // $('#main').removeClass('col-md-10');
      }
      // window.console.log(ReadSessionCustom);

      // hover menu
      // $('.menu').hover(function() {
      //     $(this).addClass('active');
      //     $('.sub-sidebar').fadeIn(200);
      //     var attr        =       $(this).attr('id');
      //     $('.content#'+attr).css('display','block');
      //     // window.console.log(attr);
      // }, function() {
      //     $(this).removeClass('active');
      //     $('.sub-sidebar').fadeOut(200);
      //     var attr        =       $(this).attr('id');
      //     $('.content#'+attr).css('display','none');
      // });
      menu.bind("click", function () {
        const menuId = menu.attr("id");
        console.log("id", menuId);
        console.log("is not dashboard", menuId != "dashboard");
        if (menuId != "dashboard") {
          menu.removeClass("active-open");
          $(".sub-sidebar").addClass(" open");
          var attr = $(this).attr("id");
          $(".content").removeClass("active-sub");
          $(".content#" + attr).addClass("active-sub");
          $(this).addClass("active-open");
          // $('.nav-side').css('max-width','21%');
          // $('#main').addClass('col-md-7');
          // $('#main').removeClass('col-md-10');
          $(".content").css("display", "none");
          // $('.nav-main').css('overflow-y','hidden');
          $(".nav-lists").removeClass("active");
          $(window).resize(function () {});
          $(".menu.active").each(function () {
            let ToJson = JSON.stringify($(this).attr("id"));
            let encrypt = Crypto.encryption(ToJson);
            localStorage.setItem("session_menu", encrypt);
            $(".content#" + $(this).attr("id")).css("display", "block");
            // window.console.log($(this).attr('id'));
          });
        }
      });
      var sub_menu_active = $("#" + ReadSessionCustom);
      sub_menu_active.addClass("active-open");
      // window.console.log(sub_menu_active);

      $("#main").click(function () {
        $(".sub-sidebar").removeClass(" open");
      });

      $("#main").mouseenter(function () {
        // $('.nav-side').css('max-width','0%');
        // $('#main').addClass('col-md-10');
        // $('#main').removeClass('col-md-7');
        $(".nav-main").css("overflow-y", "auto");
      });

      // $(window).resize(function () {
      //     var width = $(document).width();
      //     if (width <= 1200) {

      //     }
      // });

      // click second menu sub
      var second_menu = $(".second-menu");
      second_menu.bind("click", function () {
        $(".sub-sidebar").removeClass(" open");
        $("#responsive-tablet").removeClass("col-md-3");
        $("#responsive-tablet").addClass("col-md-1");
        $(".background-tablet").css("display", "none");
        $("#responsive-tablet .sidebar").removeClass("open-tablet");
        $(".nav-main").removeClass("open-tablet");
      });
      $(document).ready(SizeWindow);
      $(window).resize(SizeWindow);
    });
    function SizeWindow() {
      let width = $(window).width();
      if (width <= 1024) {
        $("#responsive-tablet").removeClass("col-md-2");
        $("#responsive-tablet").addClass("col-md-1");
        $("#main").removeClass("col-md-10");
        $("#main").addClass("col-md-11");
        var menu_tablet = $(".sidebar .logo .jam-menu");
        menu_tablet.bind("click", function () {
          $("#responsive-tablet").removeClass("col-md-1");
          $("#responsive-tablet").addClass("col-md-3");
          $(".background-tablet").css("display", "block");
          $("#responsive-tablet .sidebar").addClass("open-tablet");
          $(".nav-main").addClass("open-tablet");
        });

        var background_tablet = $(".background-tablet");
        background_tablet.bind("click", function () {
          $(".sub-sidebar").removeClass(" open");
          $("#responsive-tablet").removeClass("col-md-3");
          $("#responsive-tablet").addClass("col-md-1");
          $(".background-tablet").css("display", "none");
          $("#responsive-tablet .sidebar").removeClass("open-tablet");
          $(".nav-main").removeClass("open-tablet");
        });
      } else {
        $("#responsive-tablet").removeClass("col-md-1");
        $("#responsive-tablet").addClass("col-md-2");
        $("#main").removeClass("col-md-11");
        $("#main").addClass("col-md-10");
      }

      if (width <= 768) {
        $("#responsive-tablet").removeClass("col-md-1");
        $("#responsive-tablet").addClass("col-sm-1");
        $("#main").removeClass("col-md-11");
        $("#main").addClass("col-sm-10 col-sm-11");
        // window.console.log('tes');
      }

      if (width <= 568) {
        var menu_active = $(".menu");
        menu_active.bind("click", function () {
          $("#responsive-tablet").removeClass("col-md-1");
          $("#responsive-tablet").addClass("col-md-3");
          $(".background-tablet").css("display", "block");
          $("#responsive-tablet .sidebar").addClass("open-tablet");
          $(".nav-main").addClass("open-tablet");
        });
      }
    }
  },
  GetBackMonth3(day) {
    // substracting day
    var startDate = moment();
    startDate = startDate.subtract(day, "days");
    startDate = startDate.format("YYYY-MM-DD");
    return startDate;
  },
  GetForwardMouth(day, StartDate) {
    var startDate = moment(StartDate);
    startDate = startDate.add(day, "days");
    startDate = startDate.format("YYYY-MM-DD");
    return startDate;
  },
  GetDateNow() {
    var dateNow = moment().format("YYYY-MM-DD");
    return dateNow;
  },
  GetDateStringYMD(date) {
    var dateNow = moment(date).format("YYYY-MM-DD");
    return dateNow;
  },
  GetDateDDMMMYYYYNow() {
    var dateNow = moment().format("DD-MMM-YYYY");
    return dateNow;
  },
  DateDDMMMYYYY(date) {
    var dateFormat = moment(date).format("DD-MMM-YYYY");
    return dateFormat;
  },
  GetDateNowNoString(date) {
    var dateNow = moment(date).format("YYYYMMDD");
    return dateNow;
  },
  GetDateNowString() {
    var dateNow = moment().format("YYYYMMDD");
    return dateNow;
  },
  SideBarTermCondition() {
    let ReadSessionCustom = this.ReadSessionCustomInternal("session_menu");
    $(document).ready(function () {
      var menu = $(".menu");

      // // window.console.log(ReadSessionCustom);
      menu.bind("click", function () {
        menu.removeClass("active");
        $(this).addClass("active");
        $(".nav-side").css("max-width", "21%");

        $(".content").css("display", "none");
        $(".nav-main").css("overflow-y", "hidden");
        $(window).resize(function () {});
        $(".menu.active").each(function () {
          let ToJson = JSON.stringify($(this).attr("id"));
          let encrypt = Crypto.encryption(ToJson);
          localStorage.setItem("session_menu", encrypt);
          $(".content#" + $(this).attr("id")).css("display", "block");
          // // window.console.log($(this).attr('id'));
        });
      });
      var sub_menu_active = $("#" + ReadSessionCustom);
      sub_menu_active.addClass("active");
    });
  },
  OpenSubSideBar() {
    let ReadSessionCustom = this.ReadSessionCustomInternal("session_menu");
    $(document).ready(function () {
      var menu = $(".menu");

      // let ReadMenu            =   ReadSessionCustom;
      if (ReadSessionCustom == null) {
        $(".nav-side").css("max-width", "0%");
      } else {
        $(".content#" + ReadSessionCustom).css("display", "block");
        $(".nav-side").css("max-width", "21%");
        // $('#main').addClass('col-md-10');
        // $('#main').removeClass('col-md-10');
      }
      // // window.console.log(ReadSessionCustom);
      menu.bind("click", function () {
        menu.removeClass("active");
        $(this).addClass("active");
        $(".nav-side").css("max-width", "21%");
        $("#main").addClass("col-md-7");
        $("#main").removeClass("col-md-10");
        $(".content").css("display", "none");
        $(".nav-main").css("overflow-y", "hidden");
        $(window).resize(function () {});
        $(".menu.active").each(function () {
          let ToJson = JSON.stringify($(this).attr("id"));
          let encrypt = Crypto.encryption(ToJson);
          localStorage.setItem("session_menu", encrypt);
          $(".content#" + $(this).attr("id")).css("display", "block");
          // // window.console.log($(this).attr('id'));
        });
      });
      var sub_menu_active = $("#" + ReadSessionCustom);
      sub_menu_active.addClass("active");
    });
  },
  Encryption(value) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return encrypt;
  },
  Dencryption(value) {
    try {
      let dencrypt = Crypto.dencrytion(value);
      let JsonToData = JSON.parse(dencrypt);
      return JsonToData;
    } catch (error) {
      return false;
    }
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
  ToPage(page) {
    this.SaveSessionCustom("page", page);
    return router.replace(page).catch((error) => {
      return error;
    });
  },
  ToggleShowHidePassword() {
    $(".show-eye , .hide-eye").on("click", function () {
      var passwordId = $(this)
        .parents(".show-password")
        .find("input")
        .attr("id");
      if ($(this).hasClass("show-eye")) {
        $("#" + passwordId).attr("type", "text");
        $(this).parent().find(".show-eye").hide();
        $(this).parent().find(".hide-eye").show();
      } else {
        $("#" + passwordId).attr("type", "password");
        $(this).parent().find(".hide-eye").hide();
        $(this).parent().find(".show-eye").show();
      }
    });
  },
  SessionAccess() {
    let DateNow = this.GetDateNow();
    let ReadSession = this.ReadSessionCustom("SessionDate");
    if (ReadSession == null) {
      Vue.notify({
        group: "message",
        title: "Session Date Failed",
        type: "error",
        duration: 5000,
      });
      setTimeout(function () {
        store.dispatch("auth/logout");
      }, 4000);
    } else {
      if (DateNow > ReadSession) {
        Vue.notify({
          group: "message",
          title: "Session Expired",
          type: "info",
          duration: 5000,
        });
        setTimeout(function () {
          store.dispatch("auth/logout");
        }, 4000);
      }
    }
    // // window.console.log(ReadSession);
    // // window.console.log(DateNow);
  },
  TogglePasswordMask() {
    $(document).ready(function () {
      $(".show-password .show-eye,.show-password .hide-eye").on(
        "click",
        function () {
          var passwordId = $(this)
            .parents(".show-password")
            .find("input")
            .attr("id");
          if ($(this).hasClass("show-eye")) {
            $("#" + passwordId).attr("type", "text");
            $(this).parent().find(".show-eye").hide();
            $(this).parent().find(".hide-eye").show();
          } else {
            $("#" + passwordId).attr("type", "password");
            $(this).parent().find(".hide-eye").hide();
            $(this).parent().find(".show-eye").show();
          }
        }
      );
    });
  },
  SizeMainPage() {
    $(".main-page").css("margin-bottom", "0");
  },
  ProcessValidation(status, attr) {
    if (status == true) {
      $(".loading").css("display", "block");
      $("#" + attr).addClass(" form-active");
    } else {
      $(".loading").css("display", "none");
      $("#" + attr).removeClass(" form-active");
    }
  },
  FormError(status, attr) {
    if (status == true) {
      $("#" + attr).addClass(" form-error");
      $("#" + attr + " .error").css("display", "block");
    } else {
      $("#" + attr).removeClass(" form-error");
      $("#" + attr + " .error").css("display", "none");
    }
  },
  ButtonTrigger() {
    $(document).ready(function () {
      $(".btn-ibb-upload").click(function () {
        $("#file_upload").trigger("click");
      });
    });
  },
  enkripsi(data) {
    return Crypto.encryption(data);
  },
  deskripsi(data) {
    return Crypto.dencrytion(data);
  },
  enkripsiSha256(data) {
    return Crypto.encryptionSha256(data);
  },
  CaptchaError() {
    $(".kapca #input-captcha").addClass("is-invalid");
    $(".kapca #input-captcha").removeClass("is-valid");
  },
  CaptchaValid() {
    $(".kapca #input-captcha").removeClass("is-invalid");
    $(".kapca #input-captcha").addClass("is-valid");
  },
  CustomValid(id) {
    $("#" + id).addClass("is-valid");
    $("#" + id).removeClass("is-invalid");
  },
  CustomInValid(id) {
    $("#" + id).removeClass("is-valid");
    $("#" + id).addClass("is-invalid");
  },
  NominalShow() {
    $(".cari-nominal").css("display", "block");
  },
  NominalHide() {
    $(".cari-nominal").css("display", "none");
  },
  ValidationResponseBoolean(data) {
    if (data.data.code == "00") {
      return true;
    } else {
      return false;
    }
  },
  DisabledKirimUlangKode(idle) {
    $(".kirim-ulang .waktu").html(idle);
    $(".kirim-ulang").addClass("disabled");
  },
  EnableKirimUlangKode() {
    $(".kirim-ulang").removeClass("disabled");
  },
  ProsesValidasi() {
    $(".validasi-otp").addClass("proses");
    $(".validasi-otp").removeClass("error");
  },
  ProsesValidasiError() {
    $(".validasi-otp").addClass("error");
    $(".validasi-otp").removeClass("proses");
  },
  ProsesValid() {
    $(".validasi-otp").removeClass("proses");
    $(".validasi-otp").removeClass("error");
  },

  ValidationPasswordStrong(password) {
    try {
      if (password.length >= 1) {
        return passwordStrength(password);
      } else {
        return "empty";
      }
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  CustomErrorInValidMsg(id) {
    $(".form-group #" + id).addClass("is-invalid");
    $(".form-group #" + id).removeClass("is-valid");
  },
  CustomErrorValidMsg(id) {
    $(".form-group #" + id).removeClass("is-invalid");
    $(".form-group #" + id).addClass("is-valid");
  },
  ButtonLanguange() {
    let buttonLang = $(".btn-language button");

    buttonLang.bind("click", function () {
      buttonLang.removeClass("active");
      $(this).addClass("active");
      // // window.console.log('klick');
    });
  },
  ErrorMessageShow() {
    $(".message-error").css("display", "block");
  },
  ErrorMessageHide() {
    $(".message-error").css("display", "none");
  },
  GlobalError(data) {
    Vue.notify({
      group: "message",
      title: "Information",
      text: data.message,
      duration: 4000,
    });
  },
  FatalError(data) {
    Vue.notify({
      group: "message",
      title: "Information",
      text: data,
      duration: 4000,
    });
  },
  HomeLanguage() {
    $(document).ready(function () {
      let buttonLang = $(".btn-nav");
      buttonLang.bind("click", function () {
        $(".select-lang").toggle();
        $(".nav-lists").removeClass("active");
      });

      let menuLang = $(".menu-lang");
      menuLang.bind("click", function () {
        menuLang.removeClass("active");
        $(this).addClass("active");
        $(".select-lang").hide();
      });
    });
  },
  profileNavigation() {
    $(document).ready(function () {
      $(".navigation-btn").click(function () {
        let nav = $(this).attr("id");

        if ($(".nav-lists#" + nav).hasClass("active")) {
          $(".nav-lists").removeClass("active");
        } else {
          $(".nav-lists#" + nav).addClass("active");
        }

        // $('.nav-lists#' + nav).addClass('active');
        // $('.nav-lists').removeClass('active');

        $(".select-lang").hide();
      });

      $(".box-nav").click(function () {
        $(".nav-lists").removeClass("active");
      });

      $(".main-page").click(function () {
        $(".nav-lists").removeClass("active");
      });
    });
  },
  ResponseResult(data) {
    // // window.console.log(data);
    if (data.data.code == "00") {
      // if (data.data.data == undefined) {
      //     return unde;
      // } else if (data.data.data == []) {
      //     return false;
      // } else {
      // }
      return true;
    } else if (data.data.code == "SE" || data.data.code == "70") {
      Vue.notify({
        group: "message",
        title:
          "Anda tidak memiliki akses atau telah melakukan login di tempat lain",
        type: "info",
        duration: 5000,
      });
      setTimeout(() => {
        store.dispatch("auth/logout");
      }, 3000);
    } else if (data.data.code == "80") {
      return null;
    } else {
      return false;
    }
  },
  ValidLoop(response) {
    if (response.data.data == undefined) {
      return false;
    } else {
      return true;
    }
  },
  ErrorTable(id) {
    $(document).ready(function () {
      $(".loading-table#" + id).addClass("active");
    });
  },
  ErrorTableClose(id) {
    $(document).ready(function () {
      $(".loading-table#" + id).removeClass("active");
    });
  },
  FormatDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm");
  },
  FormatDateSimple(date) {
    return moment(date).format("YYYYMMDD");
  },
  FormatDateUseLang(date) {
    let ReadLang = this.ReadSessionCustom("language");
    return moment(date).locale(ReadLang).format("DD-MMM-YYYY");
  },
  CurrencyCode(currency) {
    try {
      let result = "";
      switch (currency) {
        case "360":
          result = "IDR";
          break;
        default:
          result = currency;
          break;
      }
      return result;
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  BatchTypeToTypeTransfer(BatchType) {
    try {
      let result = "";
      switch (BatchType) {
        case "2":
          result = "Transfer Overbooking";
          break;
        case "3":
          result = "Transfer Antar Bank (Online)";
          break;
        default:
          result = "Not Found Batch to Type Transfer ";
          break;
      }
      return result;
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  FeatureCode(data) {
    try {
      let result = "";
      switch (data) {
        case "Transfer Overbooking":
          result = "101";
          break;
        case "Transfer Antar Bank (Online)":
          result = "102";
          break;
        case "Virtual Account":
          result = "103";
          break;
        case "Transfer SKN RTGS":
          result = "104";
          break;
        case "Mobile Topup":
          result = "201";
          break;
        case "PLN":
          result = "202";
          break;
        case "Data Packages":
          result = "203";
          break;
        case "Mobile Postpaid":
          result = "301";
          break;
        case "PDAM":
          result = "302";
          break;
        case "PLN Postpaid":
          result = "303";
          break;
        case "PBB":
          result = "304";
          break;
        case "Samsat Online":
          result = "305";
          break;
        case "TV":
          result = "306";
          break;
        case "QR Payment":
          result = "307";
          break;
        case "Maskapai Penerbangan":
          result = "308";
          break;
        case "Autodebet":
          result = "309";
          break;
        case "Cashout":
          result = "501";
          break;
        default:
          result = "FeatureCode InValid";
          break;
      }
      return result;
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  FeatureCodeToNameString(data) {
    try {
      let result = "";
      switch (data) {
        case "101":
          result = "Transfer Overbooking";
          break;
        case "102":
          result = "Transfer Antar Bank (Online)";
          break;
        case "103":
          result = "Virtual Account";
          break;
        case "104":
          result = "Transfer SKN RTGS";
          break;
        case "201":
          result = "Mobile Topup";
          break;
        case "202":
          result = "PLN";
          break;
        case "203":
          result = "Data Packages";
          break;
        case "301":
          result = "Mobile Postpaid";
          break;
        default:
          result = "";
          break;
      }
      return result;
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  Currency(number) {
    try {
      let removeDecimal = Math.round(number);
      let point = removeDecimal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return point;
    } catch (error) {
      // window.console.log(error);
      return error;
    }
  },
  SumData(args) {
    return args.reduce((total, args) => total + args, 0);
  },
  CoreStyleSyariah() {
    $("body").addClass("core-syariah");
  },
  RemoveClassSyariah() {
    $("body").removeClass("core-syariah");
  },
  StringToInt(number) {
    let Convert = parseInt(number);
    return Convert;
  },
  IntToString(int) {
    let Convert = int.toString();
    return Convert;
  },
  isNumber: function (evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  },
  RemovePoint(number) {
    try {
      let remove = number.split(".").join("");
      return remove;
    } catch (error) {
      // window.console.log(error);
      return error;
    }
  },
  MainPageActivationActive() {
    $(".main-page").addClass("activation");
  },
  MainPageActivationInActiva() {
    $(".main-page").removeClass("activation");
  },
  GetTextLeft(text) {
    try {
      var TextLeft = text.substr(0, text.indexOf("|"));
      return TextLeft;
    } catch (e) {
      // // window.console.log(e);
      return e;
    }
  },
  GetTextRight(text) {
    try {
      var TextRight = text.slice(text.indexOf("|") - text.length);
      var RemoveCharacter = TextRight.replace("|", "");
      return RemoveCharacter;
    } catch (e) {
      // // window.console.log(e);
      return e;
    }
  },
  SimpleLanguage(message) {
    let language = this.ReadSessionCustom("language");
    try {
      if (language == "id") {
        return this.GetTextLeft(message);
      } else if (language == "en") {
        return this.GetTextRight(message);
      } else {
        return "Bahasa tidak di temukan";
      }
    } catch (e) {
      // window.console.log(e);
      return e;
    }
  },
  PageAccess() {
    let ReadPage = this.ReadSessionCustom("page");
    if (ReadPage == null) {
      Vue.notify({
        group: "message",
        title: "Access Page Denied",
        duration: 5000,
        type: "error",
      });
      return this.ToPage("/");
    } else {
      this.ToPage(ReadPage);
    }
  },
  DecodeJWT(token) {
    let result = [];
    try {
      result = jwt_decode(token);
    } catch (e) {
      Vue.notify({
        group: "message",
        title: e,
        duration: 5000,
        type: "error",
      });
      setTimeout(() => {
        store.dispatch("auth/logout");
      }, 3000);
      return e;
    }
    return result;
  },
  RemoveSpaceToString(text) {
    let result = "";
    try {
      result = text.replaceAll(/\s/g, "-");
    } catch (e) {
      return e;
    }
    return result;
  },
  SelectStartDate(StartDate) {
    var start = moment(StartDate);
    var end = moment();
    let count = end.diff(start, "days");
    let maxSelected = "";
    if (count >= 30) {
      maxSelected = this.GetForwardMouth(30, StartDate);
    }
    if (maxSelected == "") {
      maxSelected = this.GetDateNow();
    }
    return maxSelected;
  },
  SelectStartDateMin(StartDate) {
    var start = moment(StartDate);
    var end = moment();
    let count = end.diff(start, "days");
    let maxSelected = "";
    if (count >= -90) {
      maxSelected = this.GetForwardMouth(-90, StartDate);
    }
    if (maxSelected == "") {
      maxSelected = this.GetDateNow();
    }
    return maxSelected;
  },

  RemoveUniq(data) {
    let unix = [];
    $.each(data, function (i, el) {
      if ($.inArray(el, unix) === -1) unix.push(el);
    });
    return unix;
  },
  StringToNumber(text, character) {
    let pars = text.split(character).map(Number);
    return pars;
  },
  RemoveSlash(text) {
    try {
      let RemoveString = text.split("/")[0];
      return RemoveString;
    } catch (e) {
      return e;
    }
  },
  extractKeyValuePairsInRange(obj, start, end) {
    const keys = Object.keys(obj);
    const result = {};

    for (let i = start; i <= end; i++) {
      const key = keys[i];
      if (key) {
        result[key] = obj[key];
      }
    }

    return result;
  },

  hasSubstring(strA, strB) {
    if (!strA || !strB) return true;
    return strA.toLowerCase().includes(strB.toLowerCase());
  },

  getDefaultPaginationProps(perPage = 5) {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: perPage,
      errorMessage: "",
      totalRows: 0,
    };
  },

  generatePdf(head, body, name, fontSize = 9) {
    // const img = new Image();
    // img.src = process.env.VUE_APP_URL_IMAGE_REPORT;

    const logoBase64 =
      " data:image/png;base64,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";

    const doc = new jsPDF("portrait", "mm", "a4");
    doc.addImage(logoBase64, "PNG", 90, 10, 25, 10);

    doc.setFontSize(9);
    // @ts-ignore
    doc.text(
      "Kantor Pusat Graha Mantap Jalan Proklamasi No. 31  Kel. Pegangsaan, Kec. Menteng, Jakarta Pusat 10320 ",
      105,
      23,
      null,
      null,
      "center"
    );

    autoTable(doc, {
      startY: doc.getNumberOfPages() > 1 ? 10 : 27,
      styles: {
        fontSize: fontSize,
      },
      // margin: { vertical: 22 },
      head: head,
      body: body,
      didDrawCell: () => {},
      didDrawPage: function () {
        const str = "Page " + doc.getNumberOfPages();
        doc.setFontSize(9);
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, 95, pageHeight - 10);
        // doc.text(str, data.settings.margin.right, pageHeight - 10);
      },
    });
    doc.save(name);
  },
};
