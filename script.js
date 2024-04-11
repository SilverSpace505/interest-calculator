utils.setup()
utils.setStyles()

var su = 0
var lastTime = 0
var delta = 0

var logs = ["Results will appear here"]
var logsBg = new ui.Canvas()
logsBg.colour = [127, 127, 127, 1]
var moneyT = new ui.TextBox("Starting Money")
var interestT = new ui.TextBox("Interest")
var stepsT = new ui.TextBox("Steps")
var calculateB = new ui.Button("rect", "Calculate")
calculateB.bgColour = [127, 127, 127, 1]
var digits = "0123456789.".split("")
var lines2 = 0

function log(...text) {
    logs.push(text.join(" "))
    while (logs.length > 100) {
        logs.splice(0, 1)
    }
    let height = -ui.measureText(25*su, logs.join(" \n"), {wrap: 480*su}).lines*25*su-20*su+600*su
    logsBg.bounds.minY = height
    logsBg.off.y = height
    logsBg.update()
}

function update(timestamp) {
    requestAnimationFrame(update) 

    utils.getDelta(timestamp)
    ui.resizeCanvas()
    ui.getSu()

    ui.text(canvas.width/2, 50*su, 50*su, "Interest Calculator", {align: "center"})
    ui.text(canvas.width/2, 100*su, 25*su, "Enter in the starting money, interest, and steps (years) and click calculate", {align: "center"})
    ui.text(canvas.width/2-410*su, canvas.height/2+100*su, 20*su, "(Years/Months, there's 12 months in a year) ->", {align: "right"})

    moneyT.set(canvas.width/2-200*su, canvas.height/2-100*su, 400*su, 50*su)
    interestT.set(canvas.width/2-200*su, canvas.height/2, 400*su, 50*su)
    stepsT.set(canvas.width/2-200*su, canvas.height/2+100*su, 400*su, 50*su)

    moneyT.hover()
    moneyT.draw()

    interestT.hover()
    interestT.draw()

    stepsT.hover()
    stepsT.draw()

    calculateB.set(canvas.width/2-200*su, canvas.height/2+200*su, 400*su, 50*su)
    calculateB.textSize = 40*su
    calculateB.basic()
    calculateB.draw()

    if (calculateB.hovered() && input.mouse.lclick) {
        calculateB.click()
        calculate(parseFloat(moneyT.text), parseFloat(interestT.text)/100, parseFloat(stepsT.text))
    }

    logsBg.bounds.minY = -lines2*25*su-20*su+600*su
    logsBg.set(canvas.width/2+20*su+250*su, canvas.height/2, 500*su, 600*su)
    logsBg.draw()

    ui.setC(logsBg)

    lines2 = ui.text(10*su, 20*su, 25*su, logs.join(" \n"), {wrap: 480*su}).lines

    logsBg.drawScroll({x: 10*su, y: 10*su}, 10*su)
    logsBg.drawBorder(10*su, [0, 0, 0, 1])
    ui.setC()
   

   

    input.updateInput()
}
input.scroll = (x, y) => {
    if (logsBg.hovered()) {
        logsBg.scroll(x, y)
    }
}
input.checkInputs = (event) => {
    input.cistart()
    
    moneyT.checkFocus(event)
    interestT.checkFocus(event)
    stepsT.checkFocus(event)
    
    input.ciend()
}
requestAnimationFrame(update)
function calculate(money, interest, steps) {
    var simulate = money
    log("equation", `${money} x (1 + ${interest*100} ÷ 100)**${steps}`)
    log(steps + " steps starting at " + simulate + " with " + interest*100+ "% interest")
    for (let i = 0; i < steps; i++) {
        simulate += simulate*interest
        log("step", i+1, simulate)
    }

    log("calculated", money*(interest+1)**steps)
    log("\n")
}