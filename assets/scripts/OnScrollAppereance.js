import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export class OnScrollAppereance {
  constructor($el, opts = {}) {
    gsap.registerPlugin(ScrollTrigger)
    this.$el = $el
    this.offset = opts.offset || 0
    this.breakpoint = opts.breakpoint || 960

    this.animation()
  }

  animation() {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$el,
        pin: false,
        start: `top-=200px`,
        scrub: 0.1,
      },
    })
    this.tl.to(this.$el, {
      scale: 0.9,
      ease: 'linear.none',
    })
  }

  destroy() {
    this.tl.kill()
  }
}
