"use strict";

$(".navbar-toggler").click(function () {
  if (!$(".navbar-collapse").hasClass('show')) {
    $('.navbar').addClass('nav-bg');
  } else {
    setTimeout(function () {
      $('.navbar').removeClass('nav-bg');
    }, 500);
  }
});
$(window).scroll(function () {
  if ($(window).scrollTop() > 0) {
    $('.navbar').addClass('navbar-scroll-fx');
  } else {
    $('.navbar').removeClass('navbar-scroll-fx');
  }
}); // module 2 movement bg

var inModule = false;
var movementStrength = 50;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
var newvalueYMoved = 0;
$("body").mousemove(function (e) {
  if (!inModule) {
    var pageX = e.pageX - $(window).width() / 2;
    var pageY = e.pageY - $(window).height() / 2;
    var newvalueX = width * pageX * -1 - 25 - 50;
    var newvalueY = height * pageY * -1 - 50;
    if (newvalueYMoved != 0) $('.module2 .image-wrapper img').css("object-position", newvalueX + "px " + newvalueYMoved + "px");else $('.module2 .image-wrapper img').css("object-position", newvalueX + "px center");
  }
});
$(".module2").mousemove(function (e) {
  return false;
  inModule = true;
  var pageX = e.pageX - $(window).width() / 2;
  var pageY = e.pageY - $(window).height() / 2;
  var newvalueX = width * pageX * -1 - 25 - 50;
  var newvalueY = height * pageY * -1 - 50;
  newvalueYMoved = newvalueY;
  $('.module2 .image-wrapper img').css("object-position", newvalueX + "px     " + newvalueY + "px");
  $('.module2 .blinking-text').css("right", newvalueX + "px");
});
$(".module2").mouseout(function (e) {
  inModule = false;
}); // pillar change image onclick

$("#pills-item1-tab").click(function () {});
$("#pills-item2-tab").click(function () {});
$("#pills-item3-tab").click(function () {});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function checkCookie() {
  var username = getCookie("juliet");

  if (username != "") {
    return true;
  } else {
    return false;
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var global_mute = false;
var vid_play = [];
$(document).ready(function () {
  var password_flag = false; // pillar change image onclick

  $(".audio-icon").click(function () {
    if (global_mute) {
      global_mute = false;
      $('.audio-icon img').attr('src', 'public/img/audio-icon.png');
    } else {
      global_mute = true;
      $('.audio-icon img').attr('src', 'public/img/audio-icon-mute.png');
    }
  }); // check cookie

  if (!checkCookie()) {
    callPrompt();
  }

  function callPrompt() {
    bootbox.prompt({
      title: "Enter Password",
      inputType: 'password',
      callback: function callback(result) {
        if (result == 'juliet') {
          setCookie('juliet', 1, 365);
          return true;
        } else {
          callPrompt();
        }
      }
    });
  }
});

if (screen.width <= 480) {
  $('.bio-container .bio-image img').on('touchstart', function () {
    var audio_id = this.id + '-audio';
    var vid = document.getElementById(audio_id);
    vid.currentTime = 0;
    console.log(audio_id);
    vid_play = audio_id;
    if (global_mute) vid.muted = true;else vid.muted = false;
    vid.play();
  });
  $(".bio-container .bio-image img").mouseout(function () {
    var audio_id = this.id + '-audio';
    var vid = document.getElementById(audio_id);
    vid.pause();
  });
} else {
  $(".bio-container .bio-image img").mouseover(function () {
    var audio_id = this.id + '-audio';
    console.log(audio_id);
    var vid = document.getElementById(audio_id);
    vid.currentTime = 0;
    if (global_mute) vid.muted = true;else vid.muted = false;
    vid.play();
  });
  $(".bio-container .bio-image img").mouseout(function () {
    var audio_id = this.id + '-audio';
    console.log(audio_id);
    var vid = document.getElementById(audio_id);
    vid.pause();
  });
}

if (jQuery('body').hasClass('signup-container')) {
  var ajax = function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };

    xhr.send(data);
  };

  window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status"); // Success and Error functions for after the form is submitted

    function success() {
      $('#my-form').hide(); //button.style = "display: none ";

      status.innerHTML = "Email Sent - Thank you!";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
    } // handle the form submission event


    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
} // $(document).ready(function(){
