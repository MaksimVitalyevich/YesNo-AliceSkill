import quest from "./quest.js"
import readline from "readline"
import fs from "fs"

export function runConsoleGame() {
    let current = 0
    const PROGRESS_FILE = "./progress.json"

    // Индекс шага -> номер концовки
    const endingsMap = {
        7: 1, 8: 2, 13: 3, 16: 4, 17: 5, 21: 6, 23: 7, 24: 8, 25: 9
    }
    const TOTAL_ENDINGS = Object.keys(endingsMap).length // 9

    function loadProgress() {
        try {
            const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"))
            return new Set(data.foundEndings || [])
        } catch {
            return new Set()
        }
    }

    function saveProgress() {
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ foundEndings: [...foundEndings] }, null, 2), "utf8")
    }

    let foundEndings = loadProgress()

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    function formatFound() {
        const array = [...foundEndings].sort((a, b) => a-b)
        return array.length ? array.join(", ") : "-"
    }

    function askReplay() {
        rl.question("Переиграть сценарии? \x1b[1;32myes\x1b[0m / \x1b[1;31mno\x1b[0m / \x1b[1;33mclear\x1b[0m:\t", (answer) => {
            if (answer.trim().toLowerCase() === "yes") {
                current = 0
                console.clear()
                playStep()
            } else if (answer.trim().toLowerCase() === "no") {
                console.log("\n Игра окончена. Финальная ваша статистика:")
                console.log(` Уникально найдено концовок: ${foundEndings.size} из ${TOTAL_ENDINGS}`)
                console.log(` Найденные: ${formatFound()}`)
                rl.close()
            } else if (answer.trim().toLowerCase() === "clear") {
                foundEndings.clear()
                saveProgress()
                console.log("\n Ваш прогресс очищен!")
                askReplay()
            } else {
                console.log("Ответ принимается только 'yes' ИЛИ 'no'!")
                askReplay()
            }
        })
    }

    function playStep() {
        const step = quest[current]

        console.clear()
        console.log("---------------------------------------------------------------------------------------------------")
        console.log(step.text)
        console.log("-------------------------------------------------------------------------------------------------\n")

        if (step.end) {
            const endNum = endingsMap[current] ?? null
            if (endNum) {
                foundEndings.add(endNum)
                saveProgress()
            }

            console.log("\n---------------------------------------------------------------------------------------------")
            console.log("Alice: ТЫ ДОШЁЛ ДО ОДНОЙ ИЗ КОНЦОВОК!")
            console.log(step.text.toUpperCase())
            console.log("---------------------------------------------------------------------------------------------\n")
            console.log("==================================== КОНЕЦ ИГРЫ ===============================================")
        
            setTimeout(() => {
                console.log(`\n Открытая концовка: ${endNum ?? "(Нестандарт)"}`)
                console.log(` Уникально найдено концовок: ${foundEndings.size} из ${TOTAL_ENDINGS}`)
                console.log(` Найденные: ${formatFound()}`)
                askReplay()
            }, 10000)

            return
        }

        rl.question("Твой выбор: \x1b[1;32myes\x1b[0m / \x1b[1;31mno\x1b[0m\t", (answer) => {
            if (answer.trim().toLowerCase() === "yes") current = step.yes
            else if (answer.trim().toLowerCase() === "no") current = step.no
            else {
                console.log("Вводить можно только 'yes' или 'no'!")
                return playStep()
            }

            setTimeout(() => {
                console.clear()
                playStep()
            }, 2500)
        })
    }

    playStep()
}
