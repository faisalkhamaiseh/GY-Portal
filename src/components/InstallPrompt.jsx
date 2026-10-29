import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'

// Invites phone visitors to add the guide to their home screen. Once added
// (and opened once), the service worker keeps it working offline and on
// Wi-Fi networks that block the site's address, so it is worth asking while
// the visitor can still reach it. Shown once, after the disclaimer.

const KEY = 'gy-install-dismissed'

const copy = {
  ar: {
    title: 'ثبّت الدليل على هاتفك',
    body: 'يفتح فوراً ويعمل بلا إنترنت، وحتى على شبكات الواي فاي التي لا تفتح الموقع.',
    install: 'تثبيت التطبيق',
    ios: (icon) => <>اضغط زر المشاركة {icon} في Safari، ثم «إضافة إلى الشاشة الرئيسية».</>,
    other: 'من قائمة المتصفح اختر «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق».',
    close: 'إغلاق',
  },
  en: {
    title: 'Install the guide on your phone',
    body: 'It opens instantly and works offline, even on Wi-Fi networks that block the site.',
    install: 'Install the app',
    ios: (icon) => <>Tap the Share button {icon} in Safari, then “Add to Home Screen”.</>,
    other: 'In your browser menu, choose “Add to Home Screen” or “Install app”.',
    close: 'Close',
  },
}

export default function InstallPrompt({ lang = 'ar' }) {
  const t = copy[lang]
  const [mode, setMode] = useState(null) // null | 'prompt' | 'ios' | 'other'

  useEffect(() => {
    const installed = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone
    let dismissed = false
    try {
      dismissed = localStorage.getItem(KEY) === '1'
    } catch {
      // storage blocked: ask on every visit
    }
    if (installed || dismissed || !window.matchMedia('(max-width: 1279px)').matches) return
    // Wait until the disclaimer is accepted, then give the page a moment.
    const timer = setInterval(() => {
      if (document.documentElement.hasAttribute('data-disclaimer')) return
      clearInterval(timer)
      const ios = /iPhone|iPad|iPod/.test(navigator.userAgent)
      setMode(window.installPrompt ? 'prompt' : ios ? 'ios' : 'other')
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  if (!mode) return null

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    setMode(null)
  }
  const install = () => {
    window.installPrompt.prompt()
    window.installPrompt.userChoice.finally(dismiss)
    window.installPrompt = null
  }

  return (
    <div role="dialog" aria-labelledby="install-title" className="sheet-up fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 rounded-2xl bg-ink p-4 text-paper shadow-2xl xl:hidden">
      <div className="flex items-start gap-3">
        <img src="/icon-192.png" alt="" width={48} height={48} className="size-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p id="install-title" className="font-extrabold">
            {t.title}
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-paper/80">{t.body}</p>
        </div>
        <button type="button" onClick={dismiss} className="press -m-1 grid size-10 shrink-0 place-items-center rounded-full text-paper/70" aria-label={t.close}>
          <X className="size-5" />
        </button>
      </div>
      {mode === 'prompt' ? (
        <button type="button" onClick={install} className="press mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold font-extrabold text-ink">
          <Download className="size-4" aria-hidden /> {t.install}
        </button>
      ) : (
        <p className="mt-3 rounded-xl bg-paper/10 px-3 py-2.5 text-sm leading-relaxed">{mode === 'ios' ? t.ios(<Share className="inline size-4 align-[-2px]" aria-label="Share" />) : t.other}</p>
      )}
    </div>
  )
}
