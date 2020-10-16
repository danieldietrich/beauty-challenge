module.exports = {
  future: {
    defaultLineHeights: true,
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
  purge: [
    './src/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        'landscape': {'raw': '(orientation: landscape) and (max-height: 480px)'},
        // => @media (orientation: landscape) { ... }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
