import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

// Shares the current page with the phone's share sheet, or copies the link.
export default function ShareButton({ title, className = 'btn-ghost', label = 'Share' }) {
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
      // Cancelled share sheet or blocked clipboard: fall back to a prompt.
      if (!navigator.share) window.prompt('Copy this link:', url)
      else return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={share} className={className}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'Link copied' : label}
    </button>
  )
}
