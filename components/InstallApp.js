export default function InstallApp() {
  let deferredPrompt
  if (process.browser) {
    const isBrowser = window.matchMedia('(display-mode: browser)').matches
    if (isBrowser || navigator.browser) {
      window.addEventListener('beforeinstallprompt', (e) => {
        document.getElementById('installApp').style.display = 'flex'
        e.preventDefault()
        deferredPrompt = e
      })
      window.addEventListener('appinstalled', () => {
        document.getElementById('installApp').style.display = 'none'
        deferredPrompt = null
      })
    }
  }
  return (
    <div className="flex justify-center items-center" id="buttondiv">
      <button
        className="bg-blue-700 hover:bg-blue-500 text-white font-bold rounded-md px-2 py-1"
        style={{ display: 'none' }}
        id="installApp"
        onClick={async () => {
          if (deferredPrompt !== null) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
              deferredPrompt = null
            }
          }
        }}
      >
        Install App
      </button>
    </div>
  )
}
