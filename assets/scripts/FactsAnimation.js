import { raf } from '@/assets/scripts/utils/ea/raf/raf'

export class FactsAnimation {
  _current = 0
  constructor($el, circle) {
    this.$el = $el
    this.circle = circle
    this.$scrolling = this.$el.querySelector('[data-fa-scrolling]')
    this.$numbers = this.$el.querySelectorAll('[data-fa-number]')

    this.init()
  }

  init() {
    this.onScroll = this.onScroll.bind(this)
    this.$numbers[this.current].classList.add('active')

    raf.on(this.onScroll)
  }

  get vh() {
    return window.innerHeight / 100
  }

  get scrolled() {
    return this.$scrolling.getBoundingClientRect().top
  }

  get scrollHeight() {
    return this.$scrolling.getBoundingClientRect().height
  }

  get current() {
    return this._current
  }

  set current(val) {
    if (val === this._current) {
      return
    }

    this._current = val
    this.$numbers.forEach(el => {
      el.classList.remove('active')
    })

    if (this.$numbers[this.current]) {
      this.$numbers[this.current].classList.add('active')

      this.counterAnimation(this.$numbers[this.current], 500, this.current)
    }
  }

  onScroll() {
    const dist = -this.scrolled / this.vh
    const height = this.scrollHeight / this.vh

    if (dist < 0 && dist > height - 100) {
      return
    }

    this.current = Math.round(dist / 100)
  }

  counterAnimation(obj, duration, index) {
    let startTimestamp = null
    const $numbers = [...obj.querySelectorAll('[data-type="number"]')]
    const endValues = $numbers.map(n => +n.innerHTML)

    const pathValue = (index + 1) / this.$numbers.length
    this.circle.animate(pathValue)

    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      $numbers.forEach((n, idx) => {
        n.innerHTML = Math.floor(progress * endValues[idx])
      })
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  destroy() {
    raf.off(this.onScroll)
  }
}
