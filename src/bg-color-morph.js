const hexToRgb = hex => {
	hex = hex.replace('#','');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return r+','+g+','+b;
}

const isChangeable = (elem) => {
    let windowHeight = document.documentElement.clientHeight;
    let elemTop = elem.getBoundingClientRect().top;
    let elemBottom = elemTop + elem.getBoundingClientRect().height;
    return ((elemBottom >= windowHeight) && (elemTop <= 0));
}

const getColorValue = (section, startY, endY) =>{
  //using Y = mx + b
  //get slope, where x is scrollTop position, and Y is R,G,B colorValue
  const slope = (endY - startY)/(section.getBoundingClientRect().height - document.documentElement.clientHeight);
  //get the x position
  const x = parseInt((-1) * section.getBoundingClientRect().top);
  //calculate y value
  const colorValue = Math.round((slope * x) + parseInt(startY));
  return colorValue;
}

const bgMorphInit = () => {
  //Get all bg-morph sections
  const sections = document.querySelectorAll('.bg-morph');
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
      //Bind color update to scroll event
      window.addEventListener('scroll', function(e) {
        //Get all sections
        const groupSections = Array.from(document.getElementsByClassName('bg-morph-group'));
        //Only update the RGB values for the section that is in the viewport
        if(isChangeable(section)){
          let newR = getColorValue(section, startR, endR);
          let newG = getColorValue(section, startG, endG);
          let newB = getColorValue(section, startB, endB);
          //Set new BG Color for every section to ensure seamless boundaries
          if(groupSections.length > 0 && section.classList.contains('bg-morph-group')){
            groupSections.forEach(function(item){
              item.setAttribute('style','background-color:rgb('+newR+','+newG+','+newB+');');
            });
          }
          section.setAttribute('style','background-color:rgb('+newR+','+newG+','+newB+');');
        }
      });
    });
  }
}

window.onload = function(){
  bgMorphInit();
}