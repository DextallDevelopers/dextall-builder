import { raf, matrixTransform } from '@/assets/scripts/utils/ea'

const checkScrollSpeed = (function (settings) {
  settings = settings || {}

  let lastPos, newPos, timer, delta

  const delay = settings.delay || 50

  function clear() {
    lastPos = null
    delta = 0
  }

  clear()

  return function () {
    newPos = window.scrollY
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos
    }
    lastPos = newPos
    clearTimeout(timer)
    timer = setTimeout(clear, delay)
    return delta
  }
})()

export class Ticker {
  time = 0
  targetY = 0

  directionResult = 1
  ease = 0.06

  constructor(opts) {
    this.$el = opts.$el
    this.$sc = document.body
    this.duration = opts.duration
    this.initialDirection = opts.direction ?? 1
  }

  init() {
    this.animate = this.animate.bind(this)
    raf.on(this.animate)
  }

  get sizes() {
    return this.$el.getBoundingClientRect()
  }

  get scrollPos() {
    return this.$sc.scrollTop
  }

  get velocity() {
    const target = checkScrollSpeed() ?? 0
    return this.isScrolling ? this.scrollPos - target : 0
  }

  get isScrolling() {
    return true
  }

  get isScrollBottom() {
    return this.top < this.currentTop
  }

  get isScrollTop() {
    return this.top > this.currentTop
  }

  get direction() {
    if (this.isScrollBottom) {
      this.directionResult = -1
    }

    if (this.isScrollTop) {
      this.directionResult = 1
    }
    return this.directionResult * this.initialDirection
  }

  calculate() {
    const totalTime = this.time / 60

    if (totalTime > this.duration) {
      this.time = 0
    }

    if (-totalTime > this.duration) {
      this.time = -(this.duration / 2) * 60
    }

    const move = this.sizes.width * (totalTime / this.duration)

    this.targetY = move

    let percent = (this.targetY / this.sizes.width) * 100

    if (percent <= -50) {
      percent = 0
      this.targetY = 0
      this.time = 0
    }

    if (percent > 0) {
      percent = -50
      this.targetY = -this.sizes.width / 2
      this.time = -(this.duration / 2) * 60
    }
  }

  animate() {
    this.top = -window.scrollY

    this.time += this.direction + (this.velocity / 100) * this.initialDirection

    this.calculate()

    this.transform(this.$el, this.targetY)

    this.currentTop = -window.scrollY
  }

  transform($el, pos) {
    $el.style.transform = matrixTransform({ move: { x: pos } })
    $el.style.willChange = 'transform'
  }

  destroy() {
    raf.off(this.animate)
  }
}
