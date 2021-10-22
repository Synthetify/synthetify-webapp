export const toBlur = 'global-blur'

// could use rewriting to backdrop-filter when browser support is better
export const blurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'blur(4px) brightness(0.4)'
}
export const unblurContent = () => {
  const el = document.getElementById(toBlur)
  if (!el) return
  el.style.filter = 'none'
}

export const colors = [
  '#FBFBFB',
  '#655ED4',
  '#DF3C3C',
  '#D49347',
  '#117098',
  '#C76BA2',
  '#40BFA0',
  '#1F70CF',
  '#936BC7',
  '#39D3F5',
  '#DADCF1'
]

const addPxToValue = ['fontSize'] // add more css properties when needed

export const importantStyles = (styleObject: { [key: string]: string | number }) => Object.entries(styleObject).reduce((obj, [key, value]) => ({
  ...obj,
  [key]: `${value}${addPxToValue.some(prop => prop === key) ? 'px' : ''} !important`
}), styleObject)
