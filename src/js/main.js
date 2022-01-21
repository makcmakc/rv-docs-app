import '../scss/main.scss'

import "./drawer"


import './modules/character-counter'
import './modules/switch'
import './modules/tabs'
import "./modules/read-more"


shortAndSweet('textarea')


function setTheme(value, variable, theme) {
  /* This method should be called to initialize, update, or remove user custom theme variables.
    It essentially adds a new style script in the head of the page (thus lower than the html
    defaults), which in turn applies the new styles to all theme variables
  */

  let el = window.themeStylesEl ? window.themeStylesEl : document.createElement('style')
  if (!window.themeStylesEl) {
    window.themeStylesEl = el
    document.head.appendChild(window.themeStylesEl)
  }
  let themeVars = []
  themeVars.push(`--theme-${theme}-${variable}: ${value};`)
  window.themeStylesEl.innerHTML = `
    html {
      ${themeVars.join('\n')}
    }
  `
}




const overlay = document.querySelector('.el-loading--content')
overlay.addEventListener('click', toggleOverlay(document.querySelector('.block-loading') ) )

function createOverlay(appendTo) {
  const div = document.createElement('div')
  div.classList.add('el-overlay')
  appendTo.style.position = 'relative'

  const styles = `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0.4;
    transition: opacity 2.3s;
    will-change: opacity;
    background-color: #000;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `

  div.setAttribute('style', styles)
  appendTo.appendChild(div)  
  // appendTo.removeChild(div)  
}

function destroyOverlay(appendTo) {
  appendTo.removeChild(document.querySelector('.el-overlay'))
}


function toggleOverlay(appendTo) {
  createOverlay(appendTo)

  setTimeout(() => {
    destroyOverlay(appendTo)
  }, 2000)
}


