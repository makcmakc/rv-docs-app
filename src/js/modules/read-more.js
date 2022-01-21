/*!
 * Based on articles on
 * https://gomakethings.com
 */

/*!
* Example Usage
// <div class="read-more" data-more>
//   <div
//     class="read-more__content"
//     data-more-content
//     data-more-height="150"
//     style="height: 150px"></div>

//   <div class="read-more__footer" data-more-footer>
//     <a
//       href="#"
//       class="read-more__btn"
//       data-more-trigger
//       data-more-text-more="Read more"
//       data-more-text-less="Read less">
//       Read more
//     </a>
//   </div>
// </div>
*/



var readMoreLess = function() {
  /**
   * Element.closest() polyfill
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
   */
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
    }
    Element.prototype.closest = function(s) {
      var el = this
      var ancestor = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (ancestor.matches(s)) return ancestor
        ancestor = ancestor.parentElement
      } while (ancestor !== null)
      return null
    }
  }

  //
  // Settings
  //
  var settings = {
    speed: 300,
    activeClass: 'is-active',
    selector: '[data-more]',
    selectorFooter: '[data-more-footer]',
    selectorTrigger: '[data-more-trigger]',
    selectorContent: '[data-more-content]',
  }

  //
  // Methods
  //

  // Show
  var show = function(trigger, target, parent) {
    // Get the natural height of the element
    var getHeight = function() {
      var height = target.scrollHeight + 'px' // Get it's height
      return height
    }

    var height = getHeight() // Get the natural height
    parent.classList.add(settings.activeClass) // Add active class to the parent element
    target.style.height = height // Update the max-height

    // Update the text
    var textLess = trigger.dataset.moreTextLess
    trigger.textContent = textLess

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function() {
      target.style.height = ''
    }, settings.speed)
  }

  // Hide
  var hide = function(trigger, target, parent) {
    var heightDefined = target.dataset.moreHeight

    // Give the element a height to change from
    target.style.height = target.scrollHeight + 'px'
    parent.classList.remove(settings.activeClass) // Remove active class to the parent element

    // Update the text
    var textMore = trigger.dataset.moreTextMore
    trigger.textContent = textMore

    // Set the height back to defined height
    window.setTimeout(function() {
      target.style.height = heightDefined + 'px'
    }, 1)
  }

  // Toggle
  var toggleContent = function(event, trigger) {
    // Variables
    var parent = event.target.closest(settings.selector),
      target = parent.querySelector(settings.selectorContent)

    // If the element is visible, hide it
    if (parent.classList.contains(settings.activeClass)) {
      hide(trigger, target, parent)
      return
    }

    // Otherwise, show it
    show(trigger, target, parent)
  }

  // Destroy. When the content is shorter, reset height to auto and remove footer button
  var destroy = function(elem) {
    for (var i = 0; i < elem.length; i++) {
      var el = contentElements[i],
        height = el.scrollHeight,
        heightDefined = el.dataset.moreHeight,
        parent = el.closest(settings.selector),
        footer = parent.querySelector(settings.selectorFooter)

      if (height > 0 && height == heightDefined) {
        el.style.height = 'auto'
        footer.style.display = 'none'
      }
    }
  }

  // Click Handler
  var clickHandler = function(event) {
    // Only run if clicked element matches our selector
    var trigger = event.target.closest(settings.selectorTrigger)
    if (trigger) {
      // Prevent default link behavior
      event.preventDefault()

      // Toggle Content
      toggleContent(event, trigger)
    }
  }

  //
  // Inits & Event Listeners
  //

  // Toggle content on click
  document.addEventListener('click', clickHandler, false)

  // Destroy when the real content is shorter than defined height
  var contentElements = document.querySelectorAll(settings.selectorContent)
  destroy(contentElements)
}

readMoreLess()
