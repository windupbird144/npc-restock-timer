const fs = require("fs")

template = (yourCode) => `// ==UserScript==
// @name         Restock timer
// @namespace    https://github.com/windupbird144/
// @version      0.4
// @description  Displays the time it took you to restock an item on neopetsclassic
// @author       github.com/windupbird144/
// @match        https://neopetsclassic.com/*
// @grant        none
// @license      https://unlicense.org/
// ==/UserScript==

(function() {
    /**
     * Displays a timer to show how long it took you to restock an item on neopetsclassic.
     * The timer is shown on the page that says "<Item> has been added to your inventory" page.
     * Limitation: The exact time when your restock is confirmed is only known on the neopetsclassic
     * server. We can only approximate it here.
     */
    ${yourCode}
})();`

s = fs.readFileSync('./restockTimer.js', 'utf-8')
s = s.replace(/\n/g, "\n\t")
s = template(s)
fs.writeFileSync('./restockTimer.js', s, 'utf-8')