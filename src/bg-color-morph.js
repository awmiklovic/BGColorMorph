const hexToRgb = hex => {
	hex = hex.replace('#','');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return r+','+g+','+b;
}

const isChangeable = (elemTop, elemBottom, startTrigger, endTrigger, windowHeight) => {
    let startFlag; let endFlag;
    //Set start flag
    if(startTrigger == "top"){
      startFlag = (elemTop <= 0);
    }
    if(startTrigger == "middle"){
      startFlag = (elemTop <= windowHeight/2);
    }
    if(startTrigger == "bottom"){
      startFlag = (elemTop <= windowHeight);
    }
    //Set end flag
    if(endTrigger == "top"){
      endFlag = (elemBottom >= 0);
    }
    if(endTrigger == "middle"){
      endFlag = (elemBottom >= windowHeight/2);
    }
    if(endTrigger == "bottom"){
      endFlag = (elemBottom >= windowHeight);
    }
    return (startFlag && endFlag);
}

const getColorValue = (startY, endY, deltaX, x) =>{
  const slope = (endY - startY) / deltaX;
  const colorValue = Math.round((slope * x) + parseInt(startY));
  return colorValue;
}

const bgMorphInit = () => {
  //Get all bg-morph sections
  const sections = document.querySelectorAll('.bg-morph');
  const windowHeight = document.documentElement.clientHeight;
  //If there are BG Morph Sections
  if(sections){
    //Set RGB data on the elements
    sections.forEach(function(section){
      //Get Hex Color Values
      const startColor = section.getAttribute('data-start-color');
      const endColor = section.getAttribute('data-end-color');
      //Convert to RGB
      const startRgb = hexToRgb(startColor);
      const endRgb = hexToRgb(endColor);
      //Set R,G,B attributes
      //First convert string to array
      const startRgbArray = startRgb.split(',');
      const endRgbArray = endRgb.split(',');
      //Set values
      const startR = startRgbArray[0];
      const startG = startRgbArray[1];
      const startB = startRgbArray[2];
      const endR = endRgbArray[0];
      const endG = endRgbArray[1];
      const endB = endRgbArray[2];
      //Set initial BG Color for each section
      section.setAttribute('style','background-color:rgb('+startR+','+startG+','+startB+');');
      //Set Values required for calculating new RGB values
      const sectionHeight = section.getBoundingClientRect().height;
      const startTrigger = section.getAttribute('data-start-trigger');
      const endTrigger = section.getAttribute('data-end-trigger');
      //using Y = mx + b
      //m = endY - startY / deltaX
      //deltaX is how far from trigger point that final RGB value gets set.
      //This calculates deltaX.
      let deltaX = windowHeight;
      if(startTrigger != endTrigger){
        if(startTrigger == "middle" || endTrigger == "middle"){
          deltaX = deltaX/2;
        }
        if(startTrigger == "top" || endTrigger == "bottom"){
          deltaX = -deltaX;
        }
        deltaX = sectionHeight + deltaX;
      } else deltaX = sectionHeight;
      //Bind color update to scroll event
      setInterval(function(){
        let sectionTop = section.getBoundingClientRect().top;
        //Get all sections
        //Only update the RGB values for the section that is in the viewport
        if(isChangeable(sectionTop, sectionTop+sectionHeight, startTrigger, endTrigger, windowHeight)){
          //get the scroll position past the trigger point.
          let x;
          if(startTrigger == "top"){
            x = (-1) * sectionTop;
          }
          if(startTrigger == "middle"){
            x = (-1) * (sectionTop - (windowHeight/2));
          }
          if(startTrigger == "bottom"){
            x = (-1) * (sectionTop - windowHeight);
          }
          let newR = getColorValue(startR, endR, deltaX, x);
          let newG = getColorValue(startG, endG, deltaX, x);
          let newB = getColorValue(startB, endB, deltaX, x);
          //Change BG Color
          window.requestAnimationFrame(function(){
            section.setAttribute('style','background-color:rgb('+newR+','+newG+','+newB+');');
          }); 
        }
      }, 100);
    });
  }
}

window.onload = function(){
  bgMorphInit();
}