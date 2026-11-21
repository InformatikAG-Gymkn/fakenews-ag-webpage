let tasks = [];
let currentIndex = 0;
let score = 0;

async function loadTasks() {
    try {
        const response = await fetch('../../data/texts/text-archive.json');
        const data = await response.json();
        if (!data.texts || !Array.isArray(data.texts)) {
            throw new Error('Invalid data structure: texts array not found');
        }
        tasks = data.texts.sort(() => Math.random() - 0.5).slice(0, 15);
        showQuestion();
    } catch (error) {
        console.error('Error loading tasks:', error);
        document.getElementById("box").innerHTML = '<p>Fehler beim Laden der Fragen.</p>';
    }
}

function updateProgressBar() {
    const progress = ((currentIndex) / tasks.length) * 100;
    document.getElementById("progress-fill").style.width = progress + '%';
}

function showQuestion() {
    const box = document.getElementById("box");
    var message = "";
    if (currentIndex >= tasks.length) {
        if (score < 7) {
            message = "Ganz schön schwierig das alles zu erkennen... Ein gutes Bauchgefühl und das gewisse Grundwissen: das beste Rezept um KI Texte zu erkennen 🍳";
        }
        else if (score >= 7 && score <= 12) {
            message = "Solider Mittelbereich, so kann es doch weitergehen 👍🏼";
        }
        else {
            message = "Wir haben es hier mit herausragendem Fachwissen zu tun. Klasse 💪🏼"
        }
        box.innerHTML = `<h2>Quiz beendet! 🎉</h2><p>Dein Score: ${score} von ${tasks.length} Fragen richtig! </br></br>${message}</p>`;
        return;
    }
    const task = tasks[currentIndex];
    box.innerHTML = `<div id="progress-bar" style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e0e0e0; border-radius: var(--pill-radius) var(--pill-radius) 0 0;"><div id="progress-fill" style="height: 100%; background: var(--accent); width: 0%; transition: width 0.3s ease;"></div></div><p>${task.text}</p><div class="quiz-actions"><button onclick="answerQuestion('true')" style="padding: 12px; background: var(--accent); color: white; border: none; border-radius: var(--pill-radius); cursor: pointer; font-weight: 600;">KI</button><button onclick="answerQuestion('false')" style="padding: 12px; background: var(--accent); color: white; border: none; border-radius: var(--pill-radius); cursor: pointer; font-weight: 600;">Nicht KI</button></div>`;
    updateProgressBar();
}

function answerQuestion(answer) {
    const task = tasks[currentIndex];
    const box = document.getElementById("box");
    if (answer === task.ai) {
        score++;
        box.innerHTML = `<div id="progress-bar" style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e0e0e0; border-radius: var(--pill-radius) var(--pill-radius) 0 0;"><div id="progress-fill" style="height: 100%; background: var(--accent); width: 0%; transition: width 0.3s ease;"></div></div>✅ Richtig :D <p><strong>Quelle:</strong> ${task.source}</p>`;
    }
    else {
        box.innerHTML = `<div id="progress-bar" style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e0e0e0; border-radius: var(--pill-radius) var(--pill-radius) 0 0;"><div id="progress-fill" style="height: 100%; background: var(--accent); width: 0%; transition: width 0.3s ease;"></div></div>❌ Leider falsch :( <p><strong>Quelle:</strong> ${task.source}</p>`;
    }
    updateProgressBar();
    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 2000);
}

loadTasks();