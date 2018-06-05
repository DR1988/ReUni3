export default (e, coord) => {
  const container = document.querySelector('.picture-cont')
  const containerrWidth = container.clientWidth
  const sliderB = e
  const contentWidth = document.querySelector('.content').clientWidth
  // console.log('this.sliderW', this.sliderW)
  const pos = sliderB.getBoundingClientRect().left - container.getBoundingClientRect().left
  // console.log(coord)
  // console.log('pos', pos)
  let scrollPercent
  if (coord) {
    scrollPercent = (coord / containerrWidth) * 100
  } else {
    scrollPercent = (pos / containerrWidth) * 100
  }
  const scrollPx = (scrollPercent / 100) * contentWidth
  // console.log('scrollPx', scrollPx)
  container.scrollLeft = scrollPx
  if (e) {
    e.style.left = `${coord}px`
  }// console.log(' container.scrollLeft', container.scrollLeft)
}
