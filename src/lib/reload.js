// After a new release, a tab that was already open can ask for page files that
// no longer exist. Reloading fetches the new release. The timestamp stops a
// reload loop when files are missing for another reason (offline, blocked).
const KEY = 'gy-reloaded-at'

export const isMissingFile = (error) =>
  /dynamically imported module|Loading chunk|Importing a module script failed|error loading dynamically/i.test(String(error?.message))

// Reloads unless the page already reloaded in the last minute. Returns
// whether it did.
export function reloadOnce() {
  try {
    if (Date.now() - (Number(sessionStorage.getItem(KEY)) || 0) < 60_000) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    // No storage, so no way to stop a loop: show the error page instead.
    return false
  }
  window.location.reload()
  return true
}
