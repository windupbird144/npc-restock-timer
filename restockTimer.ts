/**
 * Displays a timer to show how long it took you to restock an item on neopetsclassic.
 * The timer is shown on the page that says "<Item> has been added to your inventory" page.
 * Limitation: The exact time when your restock is confirmed is only known on the neopetsclassic
 * server. We can only approximate it here.
 */
type Timer = {
    start: number,
    stop: number
}

// If you change the way time is measured, update the version
const timingVersion = "0"

const newTimer = () => <Timer>{start: Date.now(), stop: -1}
const stopTimer = (t: Timer) => <Timer>{start: t.start, stop: Date.now()}
const durationMs = (t: Timer) => t.stop - t.start
const isRunning = (t: Timer) => t.stop > -1
const save = (t: Timer) => localStorage.setItem('timer', JSON.stringify(t))
const load = () => JSON.parse(localStorage.getItem('timer')) as Timer | null

// Reset the timer and saves it. Only runs when you visit or refresh a shop
function resetTimer() {
    const path  = window.location.pathname
    if (path.includes('viewshop')) {
        save(newTimer())
        return true
    }  
}

// Stops the timer and displays the duration on the page
function stopAndDisplayTimer() {
    const now = new Date()
    const target = document.querySelector(`button[onclick*='viewshop']`)
    if (!target) {
        return
    }
    let timer = load()
    if (!timer) {
        return
    }
    timer = stopTimer(timer)
    const seconds = (durationMs(timer) / 1000).toFixed(3)
    const msg = `You restocked this item in ${seconds} seconds.`
    const html = `<div title="timing version ${timingVersion}"><br><b>${msg}</b></div>`
    target.insertAdjacentHTML('afterend', html)
}

// If you run resetTimer, do not run stopAndDisplayTimer and vice verse
resetTimer() || stopAndDisplayTimer()
