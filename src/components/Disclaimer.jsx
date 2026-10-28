import { useEffect, useRef, useState } from 'react'
import { ShieldAlert } from 'lucide-react'

export const DISCLAIMER =
  'Disclaimer: This portal is an unofficial, independent informational guide built to share general student experiences. It is not affiliated with the German Jordanian University (GJU) or any official German institution. All information, guidelines, and estimates provided are for general assistance only and carry no legal or official weight. Users are solely responsible for verifying all deadlines, laws, and academic requirements directly with the relevant official authorities.'

export const DISCLAIMER_AR =
  'إخلاء مسؤولية: هذه البوابة دليل معلوماتي مستقل وغير رسمي لمشاركة تجارب الطلاب العامة، ولا ترتبط بالجامعة الألمانية الأردنية (GJU) أو بأي جهة ألمانية رسمية. كل المعلومات والإرشادات والتقديرات للمساعدة العامة فقط وليس لها أي صفة قانونية أو رسمية. المستخدم وحده مسؤول عن التحقق من كل المواعيد والقوانين والمتطلبات الأكاديمية مباشرة من الجهات الرسمية المختصة.'

const KEY = 'gy-disclaimer-accepted'

export function DisclaimerText({ className = '' }) {
  return (
    <div className={className}>
      <p dir="ltr" lang="en" className="text-start">
        {DISCLAIMER}
      </p>
      <p className="mt-2">{DISCLAIMER_AR}</p>
    </div>
  )
}

// Shown once on the first visit; acceptance is remembered in this browser.
export default function DisclaimerModal() {
  const [open, setOpen] = useState(false)
  const button = useRef(null)

  useEffect(() => {
    let seen = false
    try {
      seen = localStorage.getItem(KEY) === '1'
    } catch {
      // التخزين محجوب: نعرض الرسالة في كل زيارة.
    }
    if (!seen) setOpen(true)
  }, [])

  useEffect(() => {
    if (open) button.current?.focus()
  }, [open])

  if (!open) return null

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title" onKeyDown={(e) => e.key === 'Escape' && accept()}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-paper p-6 shadow-2xl sm:p-8">
        <p className="flex items-center gap-2 text-rust">
          <ShieldAlert className="size-6" aria-hidden />
          <span id="disclaimer-title" className="text-xl font-extrabold text-ink">
            قبل أن تبدأ
          </span>
        </p>
        <DisclaimerText className="mt-4 space-y-2 leading-relaxed text-ink-2" />
        <button ref={button} type="button" onClick={accept} className="btn-primary mt-6 w-full justify-center">
          فهمت وأوافق
        </button>
      </div>
    </div>
  )
}
