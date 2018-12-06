'use strict';

// Helper Function for converting Hex Values to RGB
var hexToRgb = function hexToRgb(hex) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return r + ',' + g + ',' + b;
};

// Checking if a section is in view and past the trigger point.
var isChangeable = function isChangeable(elemTop, elemBottom, startTrigger, endTrigger, windowHeight) {
  var startFlag = void 0;var endFlag = void 0;
  //Set start flag
  if (startTrigger == "top") {
    startFlag = elemTop <= 0;
  }
  if (startTrigger == "middle") {
    startFlag = elemTop <= windowHeight / 2;
  }
  if (startTrigger == "bottom") {
    startFlag = elemTop <= windowHeight;
  }
  //Set end flag
  if (endTrigger == "top") {
    endFlag = elemBottom >= 0;
  }
  if (endTrigger == "middle") {
    endFlag = elemBottom >= windowHeight / 2;
  }
  if (endTrigger == "bottom") {
    endFlag = elemBottom >= windowHeight;
  }
  return startFlag && endFlag;
};

// Simple y = mx + b to get a value between 0 and 255.
var getColorValue = function getColorValue(startY, endY, deltaX, x) {
  var slope = (endY - startY) / deltaX;
  var colorValue = Math.round(slope * x + parseInt(startY));
  return colorValue;
};

//Start Here
var bgMorphInit = function bgMorphInit() {
  //Get all bg-morph sections
  var sections = document.querySelectorAll('.bg-morph');
  var windowHeight = document.documentElement.clientHeight;
  //If there are BG Morph Sections
  if (sections) {
    //Set RGB data on the elements
    sections.forEach(function (section) {
      //Get Hex Color Values
      var startColor = section.getAttribute('data-start-color');
      var endColor = section.getAttribute('data-end-color');
      //Convert to RGB
      var startRgb = hexToRgb(startColor);
      var endRgb = hexToRgb(endColor);
      //Set R,G,B attributes
      //First convert string to array
      var startRgbArray = startRgb.split(',');
      var endRgbArray = endRgb.split(',');
      //Set values
      var startR = startRgbArray[0];
      var startG = startRgbArray[1];
      var startB = startRgbArray[2];
      var endR = endRgbArray[0];
      var endG = endRgbArray[1];
      var endB = endRgbArray[2];
      //Set initial BG Color for each section
      section.setAttribute('style', 'background-color:rgb(' + startR + ',' + startG + ',' + startB + ');');
      //Set Values required for calculating new RGB values
      var sectionHeight = section.getBoundingClientRect().height;
      var startTrigger = section.getAttribute('data-start-trigger');
      var endTrigger = section.getAttribute('data-end-trigger');
      //using Y = mx + b
      //m = endY - startY / deltaX
      //deltaX is how far from trigger point that final RGB value gets set.
      //This calculates deltaX.
      var deltaX = windowHeight;
      if (startTrigger != endTrigger) {
        if (startTrigger == "middle" || endTrigger == "middle") {
          deltaX = deltaX / 2;
        }
        if (startTrigger == "top" || endTrigger == "bottom") {
          deltaX = -deltaX;
        }
        deltaX = sectionHeight + deltaX;
      } else deltaX = sectionHeight;
      //Bind color update to scroll event
      setInterval(function () {
        var sectionTop = section.getBoundingClientRect().top;
        //Get all sections
        //Only update the RGB values for the section that is in the viewport
        if (isChangeable(sectionTop, sectionTop + sectionHeight, startTrigger, endTrigger, windowHeight)) {
          //get the scroll position past the trigger point.
          var x = void 0;
          if (startTrigger == "top") {
            x = -1 * sectionTop;
          }
          if (startTrigger == "middle") {
            x = -1 * (sectionTop - windowHeight / 2);
          }
          if (startTrigger == "bottom") {
            x = -1 * (sectionTop - windowHeight);
          }
          var newR = getColorValue(startR, endR, deltaX, x);
          var newG = getColorValue(startG, endG, deltaX, x);
          var newB = getColorValue(startB, endB, deltaX, x);
          //Change BG Color
          window.requestAnimationFrame(function () {
            section.setAttribute('style', 'background-color:rgb(' + newR + ',' + newG + ',' + newB + ');');
          });
        }
      }, 100);
    });
  }
};

window.onload = function () {
  bgMorphInit();
};