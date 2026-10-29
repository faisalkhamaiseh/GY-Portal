// Opens and closes a <dialog>, also on phones whose browser predates
// showModal() (iOS before 15.4, older Android browsers). There the dialog is
// shown with the `dialog-fallback` style (index.css), and Escape or a tap
// outside closes it with the same `close` event a native dialog fires.

export function showDialog(d) {
  if (!d || d.hasAttribute('open')) return
  if (typeof d.showModal === 'function') return d.showModal()
  d.classList.add('dialog-fallback')
  d.setAttribute('open', '')
  const onKey = (e) => e.key === 'Escape' && hideDialog(d)
  const onTap = (e) => !d.contains(e.target) && hideDialog(d)
  // Capture phase: the search box handles Escape itself and stops it there.
  document.addEventListener('keydown', onKey, true)
  // Defer so the tap that opened the dialog does not close it straight away.
  setTimeout(() => document.addEventListener('click', onTap), 0)
  d._cleanup = () => {
    document.removeEventListener('keydown', onKey, true)
    document.removeEventListener('click', onTap)
  }
}

export function hideDialog(d) {
  if (!d || !d.hasAttribute('open')) return
  if (typeof d.close === 'function') return d.close()
  d._cleanup?.()
  d.removeAttribute('open')
  d.dispatchEvent(new Event('close'))
}
