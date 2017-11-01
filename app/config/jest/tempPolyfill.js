//reference: https://github.com/facebookincubator/create-react-app/issues/3199

const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

export default raf
