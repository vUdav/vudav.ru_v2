import anime from 'animejs/lib/anime.es.js';

const $_opening = '#opening'
const $_content = '#content'
const $_openingPlus = '#opening-plus'
const $_plusTopLeft = '#plus-top-left'
const $_plusTopLeftModClassName = 'corner-pluses__plus--top-left'
const plusTopLeft = document.querySelector($_plusTopLeft)
const $_plusTopRight = '#plus-top-right'
const $_plusTopRightModClassName = 'corner-pluses__plus--top-right'
const plusTopRight = document.querySelector($_plusTopRight)
const $_plusBottomLeft = '#plus-bottom-left'
const $_plusBottomLeftModClassName = 'corner-pluses__plus--bottom-left'
const plusBottomLeft = document.querySelector($_plusBottomLeft)
const $_plusBottomRight = '#plus-bottom-right'
const $_plusBottomRightModClassName = 'corner-pluses__plus--bottom-right'
const plusBottomRight = document.querySelector($_plusBottomRight)

const $_rollItem = '.js-roll-item'
const count = 10
const rollItemHeight = 40

const tl = anime.timeline()

tl
  .add({
    targets: $_opening,
    easing: 'linear',
    opacity: 1,
    duration: 500
  })
  .add({
    targets: $_rollItem,
    translateY: - count * rollItemHeight,
    easing: 'easeInOutQuad',
    duration: 1000,
    delay: anime.stagger(300)
  })
  .add({
    targets: $_openingPlus,
    easing: 'easeInOutQuad',
    rotate: 360,
    duration: 500
  })
  .add({
    targets: $_opening,
    opacity: 0,
    duration: 100,
    begin: function() {
      plusTopLeft.classList.add($_plusTopLeftModClassName)
      plusTopRight.classList.add($_plusTopRightModClassName)
      plusBottomLeft.classList.add($_plusBottomLeftModClassName)
      plusBottomRight.classList.add($_plusBottomRightModClassName)
    },
  })
  .add({
    targets: $_content,
    opacity: 1,
    duration: 500
  })