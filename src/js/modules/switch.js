// Polyfill for CLOSEST function
(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));


const switches = document.querySelectorAll('.el-switch')

switches.forEach(sw => {
  sw.addEventListener('click', toggleSwitch)
})

function toggleSwitch(e) {
  e.preventDefault()
  let switchRoot = e.target.closest('.el-switch')

  let x = switchRoot.getAttribute('aria-checked')
  console.log(x)
  if (x == 'true') {
    x = false
  } else {
    x = true
  }
  switchRoot.setAttribute('aria-checked', x)

  if (!switchRoot.classList.contains('is-disabled')) {
    switchRoot.classList.toggle('is-checked')
    // switchRoot.setAttribute('aria-checked', x)
    // switchRoot.classList.toggle('is-checked')
  }
}
