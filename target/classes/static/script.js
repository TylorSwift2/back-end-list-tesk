const apiUrl = "http://localhost:8080/tarefas";

function adicionarTarefa() {
    const tarefa = document.getElementById("novaTarefa").value;
    fetch(apiUrl + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarefa: tarefa })

    })
    .then(() => listarTarefas())
    .catch(error => console.error("Erro ao adicionar tarefa:", error));
}

function listarTarefas() {
    fetch(apiUrl + "/listar")
    .then(response => response.json())
    .then(data => {
        console.log("Dados recebidos:", data); // Debug
        const lista = document.getElementById("listaTarefas");
        lista.innerHTML = "";

        if (Array.isArray(data)) {
            data.forEach((tarefa, index) => {
                lista.innerHTML += `<li>${tarefa} <button onclick="removerTarefa(${index})">❌</button></li>`;
            });
        } else {
            console.error("Erro: a API não retornou uma lista de tarefas.", data);
        }
    })
    .catch(error => console.error("Erro ao listar tarefas:", error));
}

function removerTarefa(index) {
    fetch(apiUrl + "/removerIndex", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }) // Envia como objeto JSON para melhor interpretação
    })
    .then(() => listarTarefas());
}

function removerTodas() {
    fetch(apiUrl + "/removerTudo", { method: "DELETE" })
    .then(() => listarTarefas());
}

listarTarefas();
