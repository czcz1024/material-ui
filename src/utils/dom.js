module.exports = {

  isDescendant(parent, child) {
    let node = child.parentNode;

    while (node != null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset(el) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },

  addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },

  removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },

  toggleClass(el, className) {
    if (this.hasClass(el, className))
      this.removeClass(el, className);
    else
      this.addClass(el, className);
  },

  forceRedraw(el) {
    let originalDisplay = el.style.display;

    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = originalDisplay;
  },

  withoutTransition(el, callback) {
    //turn off transition
    el.style.transition = 'none';

    callback();

    //force a redraw
    this.forceRedraw(el);

    //put the transition back
    el.style.transition = '';
  }

};
