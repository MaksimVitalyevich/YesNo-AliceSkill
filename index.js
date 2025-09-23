import express from "express"
import quest from './quest.js'
import { runConsoleGame } from "./consolegame.js"

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
    const body = req.body
    const session = body.session
    const state = session.state || {}

    if (session.new || state.step === undefined) {
        state.step = 0
        return res.json({
            version: body.version,
            session: { ...session, state },
            response: { text: quest[state.step].text, end_session: false }
        })
    }

    const answer = body.request.command.toLowerCase()
    let nextStep

    if (answer === "да" || answer === "yes") nextStep = quest[state.step].yes
    else if (answer === "нет" || answer === "no") nextStep = quest[state.step].no
    else {
        return res.json({
            version: body.version,
            session: { ...session, state },
            response: { text: "Скажи 'Да' или 'Нет'.", end_session: false }
        })
    }

    state.step = nextStep
    const step = quest[state.step]

    if (step.end) {
        return res.json({
            version: body.version,
            session: { ...session, state },
            response: { text: step.text, end_session: true }
        })
    }

    res.json({
        version: body.version,
        session: { ...session, state },
        response: { text: step.text, end_session: false }
    })
})

const PORT = 3000
console.log(`Алиса доступна и подключается. Игра запустится через 5 сек.`)
app.listen(PORT, () => console.log(`Alice skill Server now listening on: ${PORT}`))

setTimeout(() => {
    console.clear(),
    runConsoleGame()
}, 5000)