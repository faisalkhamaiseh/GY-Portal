import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

// يشارك الصفحة الحالية عبر قائمة المشاركة في الهاتف، أو ينسخ الرابط.
export default function ShareButton({ title, className = 'btn-ghost', label = 'مشاركة' }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: title || document.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
    } catch {
      // أُلغيت المشاركة أو الحافظة محجوبة: نعرض الرابط للنسخ اليدوي.
      if (!navigator.share) window.prompt('انسخ هذا الرابط:', url)
      else return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={share} className={className}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'تم نسخ الرابط' : label}
    </button>
  )
}
