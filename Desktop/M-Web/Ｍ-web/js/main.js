// navbar
function navBorder() {
  var element = document.getElementById("navbar");
  element.classList.toggle("nav-border-bottom");
}


// cursor
const updateCursorPosition = ({x, y}) => {
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--y', y)
  }
  
  document.body.addEventListener('pointermove', updateCursorPosition)