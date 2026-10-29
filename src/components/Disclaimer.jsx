import { useEffect, useRef, useState } from 'react'
import { ShieldAlert } from 'lucide-react'

export const DISCLAIMER =
  'Disclaimer: This portal is an unofficial, independent informational guide built to share general student experiences. It is not affiliated with the German Jordanian University (GJU) or any official German institution. All information, guidelines, and estimates provided are for general assistance only and carry no legal or official weight. Users are solely responsible for verifying all deadlines, laws, and academic requirements directly with the relevant official authorities.'

export const DISCLAIMER_AR =
  'إخلاء مسؤولية: هذه البوابة دليل معلوماتي مستقل وغير رسمي لمشاركة تجارب الطلاب العامة، ولا ترتبط بالجامعة الألمانية الأردنية (GJU) أو بأي جهة ألمانية رسمية. كل المعلومات والإرشادات والتقديرات للمساعدة العامة فقط وليس لها أي صفة قانونية أو رسمية. المستخدم وحده مسؤول عن التحقق من كل المواعيد والقوانين والمتطلبات الأكاديمية مباشرة من الجهات الرسمية المختصة.'

const KEY = 'gy-disclaimer-accepted'

export function DisclaimerText({ className = '', lang = 'ar' }) {
  return (
    <div className={className}>
      <p dir="ltr" lang="en" className="text-start">
        {DISCLAIMER}
      </p>
      {lang === 'ar' && <p className="mt-2">{DISCLAIMER_AR}</p>}
    </div>
  )
}

// Shown once on the first visit. The markup is always in the pre-rendered page;
// an inline script in index.html sets <html data-disclaimer> before first paint
// when the visitor has not accepted yet, and CSS shows the dialog only then.
export default function DisclaimerModal({ lang = 'ar' }) {
  const en = lang === 'en'
  const [open, setOpen] = useState(true)
  const button = useRef(null)

  useEffect(() => {
    if (document.documentElement.dataset.disclaimer) button.current?.focus()
    else setOpen(false)
  }, [])

  if (!open) return null

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    delete document.documentElement.dataset.disclaimer
    setOpen(false)
  }

  return (
    <div className="disclaimer fixed inset-0 z-[100] place-items-end bg-ink/70 sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title" onKeyDown={(e) => e.key === 'Escape' && accept()}>
      <div className="sheet-up max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl sm:p-8">
        <span className="mx-auto mb-4 block h-1.5 w-10 rounded-full bg-line sm:hidden" aria-hidden />
        <p className="flex items-center gap-2 text-rust">
          <ShieldAlert className="size-6" aria-hidden />
          <span id="disclaimer-title" className="text-xl font-extrabold text-ink">
            {en ? 'Before you start' : 'قبل أن تبدأ'}
          </span>
        </p>
        <DisclaimerText lang={lang} className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-2" />
        <button ref={button} type="button" onClick={accept} data-accept-disclaimer className="btn-primary mt-6 min-h-12 w-full justify-center">
          {en ? 'I understand and agree' : 'فهمت وأوافق'}
        </button>
      </div>
    </div>
  )
}
