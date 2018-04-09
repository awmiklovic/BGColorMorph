'use strict';

var hexToRgb = function hexToRgb(hex) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return r + ',' + g + ',' + b;
};

var isChangeable = function isChangeable(elem) {
  var windowHeight = document.documentElement.clientHeight;
  var elemTop = elem.getBoundingClientRect().top;
  var elemBottom = elemTop + elem.getBoundingClientRect().height;
  return elemBottom >= windowHeight && elemTop <= 0;
};

var getColorValue = function getColorValue(section, startY, endY) {
  //using Y = mx + b
  //get slope, where x is scrollTop position, and Y is R,G,B colorValue
  var slope = (endY - startY) / (section.getBoundingClientRect().height - document.documentElement.clientHeight);
  //get the x position
  var x = parseInt(-1 * section.getBoundingClientRect().top);
  //calculate y value
  var colorValue = Math.round(slope * x + parseInt(startY));
  return colorValue;
};

var bgMorphInit = function bgMorphInit() {
  //Get all bg-morph sections
  var sections = document.querySelectorAll('.bg-morph');
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
      //Bind color update to scroll event
      window.addEventListener('scroll', function (e) {
        //Get all sections
        var groupSections = Array.from(document.getElementsByClassName('bg-morph-group'));
        //Only update the RGB values for the section that is in the viewport
        if (isChangeable(section)) {
          var newR = getColorValue(section, startR, endR);
          var newG = getColorValue(section, startG, endG);
          var newB = getColorValue(section, startB, endB);
          //Set new BG Color for every section to ensure seamless boundaries
          if (groupSections.length > 0 && section.classList.contains('bg-morph-group')) {
            groupSections.forEach(function (item) {
              item.setAttribute('style', 'background-color:rgb(' + newR + ',' + newG + ',' + newB + ');');
            });
          }
          section.setAttribute('style', 'background-color:rgb(' + newR + ',' + newG + ',' + newB + ');');
        }
      });
    });
  }
};

window.onload = function () {
  bgMorphInit();
};