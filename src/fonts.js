// Self-hosted fonts: no third-party request blocks the first paint. Three
// weights cover the whole design (600 renders as 700, 700/900 as 800), and each
// weight is split by unicode-range, so a page only downloads the Arabic or
// Latin files it actually uses.
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import '@fontsource/cairo/800.css'
