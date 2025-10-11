const API_URL = 'http://localhost:3000/api'

function decodeAjaxHtmlString(raw) {
    if (raw.startsWith('"') && raw.endsWith('"')) {
        raw = raw.slice(1, -1);
    }

    let unescaped = raw
        .replace(/\\\\\\/g, "")
        .replace(/\\"/g, "")
        .replace(/\\\\n/g, "")

    unescaped = unescaped.replace(/src="\/(.*?)"/g, `src="${API_URL}/proxy-bh-request/$1"`);
    return unescaped//.replace(/https:\/\/biologhelp\.pl/g, "http://localhost:8000/proxy-bh-request");
}

const fetchTasks = async (url, categories) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({categories: categories}),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (!response.ok) return;
    let raw = await response.text();

    const tempContainer = document.createElement("main");
    tempContainer.innerHTML = decodeAjaxHtmlString(raw);

    const viewContent = tempContainer.querySelector(".view-content");
    const tasks = Array.from(viewContent.children)
    if (viewContent) {
        tasks.forEach(async (element) => {
            const article = element.querySelector("article");
            const taskId = article.getAttribute("data-nodeid");

            const taskAnswerResponse = await fetch(`${API_URL}/proxy-bh-request/ag/node/task/tasks_browser/${taskId}/group_answer`);
            let taskAnswer = "";
            if (!taskAnswerResponse.ok) return;

            try {
                taskAnswer = await taskAnswerResponse.text();
                taskAnswer = JSON.parse(taskAnswer);
                taskAnswer = decodeAjaxHtmlString(taskAnswer["content"]);

                const answerBox = article.querySelector(".agroup");
                answerBox.innerHTML = `
                        <div style="height: 3px; border-bottom: black solid 2px; margin-top: 16px; margin-bottom: 48px;"></div>
                        <h2 style="">Odpowiedź</h2>
                        <div class="agroup__panels">
                            <section id="ag-panel-node-${taskId}-group-answer" class="agroup__panel agroup__panel--group_answer agroup__panel--loaded agroup__panel--open">
                                ${taskAnswer}
                            </section>
                        </div>
                    `;

                const container = answerBox.querySelector(`#ag-panel-node-${taskId}-group-answer`).children[0].children;

                if (container) {
                    const children = Array.from(container);
                    let odd = true;
                    children.forEach((el) => {
                        if (el.matches("p") && el.querySelector("b > u")) {
                            odd = !odd;
                        }

                        if (odd) {
                            el.classList.add("marked-answer");
                        }
                    });
                }
            } catch (err) { }
        });

        document.getElementById("tasks").appendChild(viewContent);
    }

    return tasks.length
};

document.addEventListener('DOMContentLoaded', async () => {

    const href = new URL(window.location.href);

    const categories = []
    href.searchParams.forEach((param, key) => {
        if(key == 'category') categories.push(Number(param))
    })
    
    let baseUrl = `${API_URL}/tasks/`
    baseUrl += href.searchParams.get('mode')

    let total = 0

    for(let i = 0; i < 9; i++) {
        let url = `${baseUrl}?page=${i}`
        const tasksCount = await fetchTasks(url, categories)
        total += tasksCount
        document.getElementById("counter").innerText = `Znaleziono ${total} zadań`
        if(tasksCount < 10) break;
    }
})


