/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */

import React, { useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import * as serviceWorker from './serviceWorker'

function useDarkMode() {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const [mode, setMode] = React.useState(
    () => window.localStorage.getItem('colorMode') || (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light')
  )
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  })
  React.useEffect(() => window.localStorage.setItem('colorMode', mode))
  return [mode, setMode]
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState([0, 0])
  const updateMousePosition = (e) => setMousePosition([e.clientX, e.clientY])
  useLayoutEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])
  return mousePosition
}

// custom hook that provides { width, height } of the window
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return size
}

// Custom hook for reading/writing browser's location query parameters
function useQueryParam(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const param = new URLSearchParams(location.search).get(key)
    return param === null ? defaultValue : param
  })
  const lazyValue = useRef(null) // prevents outdated value from being captured by arrow function below
  const queued = useRef(false) // flood protection of browser history, 100 changes per 30 sec allowed
  useLayoutEffect(() => {
    lazyValue.current = value
    if (!queued.current) {
      queued.current = true
      setTimeout(() => {
        if (queued.current) {
          const queryParams = new URLSearchParams(location.search)
          queryParams.set(key, lazyValue.current)
          history.replaceState(null, null, "?" + queryParams.toString())
          queued.current = false
        }
      }, 500) // less often then 3 times per second
    }
  }, [key, value, lazyValue, queued])
  return [value, setValue]
}

// input field helper for handling enter (13) and escape (27)
function handleKey(e, setValue) {
  if (e.keyCode === 13 || e.keyCode === 27) {
    e.preventDefault()
    e.target.blur()
  }
  if (e.keyCode === 13) {
    setValue(e.target.value)
  }
}

function encodeQueryParams(p) {
  const queryParams = new URLSearchParams()
  Object.entries(p).forEach(([key, value]) => value !== undefined && queryParams.append(key, value))
  return queryParams
}

function createLink(baseUrl, params) {
  return baseUrl + '?' + encodeQueryParams(params)
}

function tweet(outerColor, arrowColor) {
  const text = `\uD83D\uDC85 I just played #BeautyChallengeTheGame

Find my result & play it \uD83D\uDC49`
  const url = createLink(location.origin + location.pathname, {'outer-color': outerColor, 'arrow-color': arrowColor})
  const twitterUrl = createLink('https://twitter.com/intent/tweet', {
    text,
    url
  })
  window.open(twitterUrl, "_blank")
}

function calculateAngle(ref, x, y) {
  const rect = ref.current && ref.current.getBoundingClientRect()
  return rect && Math.atan2(x - rect.x - rect.width / 2, y - rect.y - rect.height / 1.6) || 0 // 1.6 ~ center y
}

function calculateShade(rad, rot) {
  const x = Math.abs(Math.sin((rad + rot) / 2))
  return Math.min(1, x * x * x + 0.5).toFixed(2) // x^3 to lower contrast, + 0.5 to increase light intensity
}

const Logo = React.forwardRef(({height, outerColor, innerColor, arrowColor, leftShade, rightShade, onOuterColor, onArrowColor}, ref) => {
  return (
    <svg ref={ref} className="mx-auto max-w-xs" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} viewBox="-1800 -3118 3600 3118">
      <path onClick={onArrowColor} d="M0-15e2v1e3L-866 0z" style={{fill: arrowColor, opacity: leftShade}} />
      <path onClick={onArrowColor} d="M0-15e2v1e3L866 0z" style={{fill: arrowColor, opacity: rightShade}} />
      <path d="M0-2118v618L-866 0h-357z" style={{fill: innerColor, opacity: leftShade}} />
      <path d="M0-2118v618L866 0h357z" style={{fill: innerColor, opacity: rightShade}} />
      <path onClick={onOuterColor} d="M0-3118v1e3L-1223 0h-577z" style={{fill: outerColor, opacity: leftShade}} />
      <path onClick={onOuterColor} d="M0-3118v1e3L1223 0h577z" style={{fill: outerColor, opacity: rightShade}} />
    </svg>
  )
})

const ColorPicker = React.forwardRef(({label, color, setColor, colors}, ref) => {
  return (
    <div className="flex flex-col">
      <fieldset>
        <legend className={["block text-sm font-medium", colors.inputLabel].join(' ')}>{label}</legend>
        <div className="flex mt-1">
          <input ref={ref} type="color" value={color} onKeyDown={(e) => handleKey(e, setColor)} onChange={(e) => setColor(e.target.value)} className={["mr-3 w-12 h-10 md:w-8 md:h-8 appearance-none outline-none rounded-md overflow-hidden border", colors.border, colors.borderFocus, colors.bg].join(' ')} />
          <input type="text" value={color} onKeyDown={(e) => handleKey(e, setColor)} onChange={(e) => setColor(e.target.value)} className={["form-input w-full h-10 md:w-28 md:h-8 appearance-none outline-none rounded-md overflow-hidden border", colors.border, colors.borderFocus, colors.inputText, colors.inputTextFocus, colors.inputTextPlaceholder, colors.inputBg, colors.inputBgHover, colors.inputBgFocus].join(' ')} placeholder="#rrggbb" />
        </div>
      </fieldset>
    </div>
  )
})

const initialOuterColor = '#7f7f7f'
const initialArrowColor = '#7f7f7f'
const themes = {
  'dark': {
    bg: 'bg-gray-900',
    bgButtons: 'bg-gray-700',
    bgNav: 'bg-gray-800',
    border: 'border-gray-500',
    borderFocus: 'focus:border-white',
    title: 'text-white',
    description: 'text-gray-300 ',
    modeButtonText: 'text-gray-300',
    modeButtonTextHover: 'hover:text-white',
    resetButtonActive: 'active:bg-gray-700',
    resetButtonBg: 'bg-gray-600',
    resetButtonHover: 'hover:bg-gray-500',
    resetButtonText: 'text-white',
    twitterButtonActive: 'active:bg-blue-700',
    twitterButtonBg: 'bg-blue-600',
    twitterButtonHover: 'hover:bg-blue-500',
    twitterButtonText: 'text-white',
    inputBg: 'bg-gray-800',
    inputBgFocus: 'focus:bg-gray-900',
    inputBgHover: 'hover:bg-gray-900',
    inputLabel: 'text-gray-500',
    inputText: 'text-gray-100',
    inputTextFocus: 'focus:text-white',
    inputTextPlaceHolder: 'placeholder-gray-500',
  },
  'light': {
    bg: 'bg-gray-100',
    bgButtons: 'bg-gray-300',
    bgNav: 'bg-gray-200',
    border: 'border-gray-500',
    borderFocus: 'focus:border-black',
    title: 'text-black',
    description: 'text-gray-700 ',
    modeButtonText: 'text-gray-700',
    modeButtonTextHover: 'hover:text-black',
    resetButtonActive: 'active:bg-gray-700',
    resetButtonBg: 'bg-gray-600',
    resetButtonHover: 'hover:bg-gray-500',
    resetButtonText: 'text-white',
    twitterButtonActive: 'active:bg-blue-700',
    twitterButtonBg: 'bg-blue-600',
    twitterButtonHover: 'hover:bg-blue-500',
    twitterButtonText: 'text-white',
    inputBg: 'bg-gray-200',
    inputBgFocus: 'focus:bg-gray-100',
    inputBgHover: 'hover:bg-gray-100',
    inputLabel: 'text-gray-500',
    inputText: 'text-gray-900',
    inputTextFocus: 'focus:text-black',
    inputTextPlaceHolder: 'placeholder-gray-500',
  }
}

function openColorPicker(ref) {
  const e = new MouseEvent('click', { view: window, bubbles: true, cancleable: true, target: ref })
  ref.dispatchEvent(e)
  ref.focus()
}

function App() {
  const [mode, setMode] = useDarkMode()
  const colors = themes[mode]
  const [outerColor, setOuterColor] = useQueryParam('outer-color', initialOuterColor) // TODO: use query param
  const innerColor = (mode === 'dark') ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'
  const [arrowColor, setArrowColor] = useQueryParam('arrow-color', initialArrowColor) // TODO: use query param
  const logoRef = useRef()
  const outerColorRef = useRef()
  const arrowColorRef = useRef()
  const [windowX, windowY] = useMousePosition()
  useWindowSize() // triggeres recalculation if logo size changes
  const rad = calculateAngle(logoRef, windowX, windowY)
  const signum = (mode === 'dark') ? 1 : -1
  const rightShade = calculateShade(signum * rad, Math.PI / 3)
  const leftShade = calculateShade(signum * rad, -Math.PI / 3)
  const editOuterColor = () => openColorPicker(outerColorRef.current)
  const editArrowColor = () => openColorPicker(arrowColorRef.current)
  return (
    <div className="min-h-screen flex">
      <main className={["flex flex-col justify-center w-full", colors.bg].join(' ')}>
        <Logo ref={logoRef} height='100%' outerColor={outerColor} innerColor={innerColor} arrowColor={arrowColor} leftShade={leftShade} rightShade={rightShade} onOuterColor={editOuterColor} onArrowColor={editArrowColor} />
      </main>
      <div className={["relative max-w-sm w-full md:w-72 flex flex-col flex-shrink-0 z-40", colors.bgNav].join(' ')}>
        <div className="absolute top-0 right-0 m-4">
          <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} className="relative flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
            <div className={["absolute top-0 right-0 transform transition-all ease-in-out duration-500 sm:duration-700", (mode === 'dark' ? 'opacity-100' : 'opacity-0')].join(' ')}>
              <svg className={["h-6 w-6 transition-opacity ease-in-out duration-500 sm:duration-700", (mode === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'), colors.modeButtonText, colors.modeButtonTextHover].join(' ')} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className={["absolute top-0 right-0 transform transition-all ease-in-out duration-500 sm:duration-700", (mode === 'dark' ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0')].join(' ')}>
              <svg className={["h-6 w-6", colors.modeButtonText, colors.modeButtonTextHover].join(' ')} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="flex-1 h-0 overflow-auto">
          <div className={["flex-shrink-0 flex flex-col px-4 py-5", colors.bgNav].join(' ')}>
            <div className="flex items-center">
              <svg className={["mr-3 h-6 w-6", colors.title].join(' ')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <div className={["font-bold text-xl", colors.title].join(' ')}>Beauty Challenge</div>
            </div>
            <div className={["pt-2", colors.description].join(' ')}>Choose your favorite logo color combination and share it with us!</div>
          </div>
          <aside className="px-4 space-y-4">
            <div className={["landscape:hidden w-full p-2 rounded-md overflow-hidden border", colors.border, colors.bg].join(' ')}>
              <Logo height='100' outerColor={outerColor} innerColor={innerColor} arrowColor={arrowColor} leftShade={leftShade} rightShade={rightShade} onOuterColor={editOuterColor} onArrowColor={editArrowColor} />
            </div>
            {[
                { ref: outerColorRef, label: 'Outer color', color: outerColor, setColor: setOuterColor },
                { ref: arrowColorRef, label: 'Arrow color', color: arrowColor, setColor: setArrowColor },
            ].map(props => <ColorPicker key={props.label} {...props} colors={colors} />)}
          </aside>
        </div>
        <div className={["flex flex-row-reverse p-4 z-10", colors.bgButtons].join(' ')}>
          <div className="flex items-center mx-auto">
            <div className="rounded-md shadow-sm mx-2">
              <button onClick={(e) => { setOuterColor(initialOuterColor); setArrowColor(initialArrowColor) }} type="button" className={["inline-flex items-center px-4 py-2 md:py-1 border border-transparent text-base leading-6 font-medium rounded-md focus:outline-none focus:border-none focus:shadow-outline-none transition ease-in-out duration-150",  colors.resetButtonText, colors.resetButtonBg, colors.resetButtonHover, colors.resetButtonActive].join(' ')}>
                <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
            <div className="rounded-md shadow-sm mx-2">
              <button onClick={() => tweet(outerColor, arrowColor)} type="button" className={["inline-flex items-center px-4 py-2 md:py-1 border border-transparent text-base leading-6 font-medium rounded-md focus:outline-none focus:border-none focus:shadow-outline-none transition ease-in-out duration-150", colors.twitterButtonText, colors.twitterButtonBg, colors.twitterButtonHover, colors.twitterButtonActive].join(' ')}>
                <svg className="-ml-1 mr-3 h-5 w-5" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Entry point: mount president table to DOM
ReactDOM.render(<App />, document.getElementById('app'))

serviceWorker.unregister()
