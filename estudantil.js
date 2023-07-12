var materias = localStorage.getItem('materias') ? JSON.parse(localStorage.getItem('materias')) : []
var tarefas = localStorage.getItem("tarefas") ? JSON.parse(localStorage.getItem("tarefas")) : []

var listaMaterias = document.getElementById("listaMateriasDiv")
if(materias.length > 0) {
    materias.forEach(mat => {
        let cardMateria = document.createElement('div')
        cardMateria.setAttribute('class', 'cardMateria')
        cardMateria.setAttribute('onclick', `detalhesMateria(${mat.id}, '${mat.nome}')`)
        cardMateria.setAttribute('id', `materia-${mat.id}`)

        let areaTituloCard = document.createElement('div')
        areaTituloCard.setAttribute('class', 'areaTituloCard')

        let titulo = document.createElement('span')
        titulo.setAttribute('class', 'materiaTitulo')
        titulo.appendChild(document.createTextNode(mat.nome))

        let botaoRemover = document.createElement('button')
        botaoRemover.setAttribute('class', 'botaoRemover')
        botaoRemover.setAttribute('onclick', `removerMateria(${mat.id})`)
        botaoRemover.appendChild(document.createElement('span').appendChild(document.createTextNode('Remover')))

        areaTituloCard.appendChild(titulo)
        areaTituloCard.appendChild(botaoRemover)

        let info1 = document.createElement('span')
        let info2 = document.createElement('span')
        info1.setAttribute('class', 'infoMateria')
        info2.setAttribute('class', 'infoMateria')
        info1.appendChild(document.createTextNode(`Pontuação máxima : ${mat.pontos}`))
        info2.appendChild(document.createTextNode(`Média : ${mat.media}`))  

        cardMateria.appendChild(areaTituloCard)
        cardMateria.appendChild(info1)
        cardMateria.appendChild(info2)        

        listaMaterias.appendChild(cardMateria)
    });
}

function salvar() {
    let nome = document.getElementById("nome").value
    let pontos = document.getElementById("pontos").value
    let media = document.getElementById("media").value
    let mat = {
        id: materias[materias.length - 1] ? materias[materias.length - 1].id + 1 : 1,
        nome: nome, 
        pontos: pontos, 
        media: media
    }
    materias.push(mat)
    window.location.href = '#'

    localStorage.setItem('materias', JSON.stringify(materias))

    document.getElementById("nome").value = null
    document.getElementById("pontos").value = null
    document.getElementById("media").value = null

    let materia = document.getElementById("listaMateriasDiv")

    let cardMateria = document.createElement('div')
    cardMateria.setAttribute('class', 'cardMateria')
    cardMateria.setAttribute('onclick', `detalhesMateria(${mat.id}, '${mat.nome}')`)
    cardMateria.setAttribute('id', `materia-${mat.id}`)

    let areaTituloCard = document.createElement('div')
    areaTituloCard.setAttribute('class', 'areaTituloCard')

    let titulo = document.createElement('span')
    titulo.setAttribute('class', 'materiaTitulo')
    titulo.appendChild(document.createTextNode(mat.nome))

    let botaoRemover = document.createElement('button')
    botaoRemover.setAttribute('class', 'botaoRemover')
    botaoRemover.setAttribute('onclick', `removerMateria(${mat.id})`)
    botaoRemover.appendChild(document.createElement('span').appendChild(document.createTextNode('Remover')))

    areaTituloCard.appendChild(titulo)
    areaTituloCard.appendChild(botaoRemover)

    let info1 = document.createElement('span')
    let info2 = document.createElement('span')
    info1.setAttribute('class', 'infoMateria')
    info2.setAttribute('class', 'infoMateria')
    info1.appendChild(document.createTextNode(`Pontuação máxima : ${mat.pontos}`))
    info2.appendChild(document.createTextNode(`Média : ${mat.media}`))  

    cardMateria.appendChild(areaTituloCard)
    cardMateria.appendChild(info1)
    cardMateria.appendChild(info2)               

    materia.appendChild(cardMateria)
}

function removerMateria(matId) {
    materias = materias.filter(m => m.id !== matId)
    let materia = document.getElementById("listaMateriasDiv")
    materia.removeChild(document.getElementById(`materia-${matId}`))
    localStorage.setItem('materias', JSON.stringify(materias))
    document.getElementById("classeBody").removeChild(document.getElementById("areaTarefa"))

    tarefas = tarefas.filter(tar => tar.materiaId !== matId)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

var idMateriaSelecionada = 0

function detalhesMateria(matId, matNome) {
    let classeBody = document.getElementById("classeBody")
    if(materias.filter(mat => mat.id === matId).length > 0) {
        idMateriaSelecionada = matId
        
        if(!document.getElementById("divider")) {
            let divider = document.createElement("div")
            divider.setAttribute("id", "divider")
            divider.setAttribute("class", "divider")
            classeBody.appendChild(divider)
        }

        let areaTarefa = document.getElementById("areaTarefa")
        if(!areaTarefa) {
            areaTarefa = document.createElement("div")
            areaTarefa.setAttribute("id", "areaTarefa")
            areaTarefa.setAttribute("class", "areaTarefa")
            classeBody.appendChild(areaTarefa)
        }

        if(document.getElementById("tituloDetalhe")) {
            areaTarefa.removeChild(document.getElementById("tituloDetalhe"))
        }
        let tituloDetalhe = document.createElement("span")
        tituloDetalhe.setAttribute("id", "tituloDetalhe")
        tituloDetalhe.appendChild(document.createTextNode(`Detalhe da matéria: ${matNome}`))
        areaTarefa.appendChild(tituloDetalhe)

        if(document.getElementById("botaoTarefa")) {
            areaTarefa.removeChild(document.getElementById("botaoTarefa"))
        }
        let botaoTarefa = document.createElement("button")
        botaoTarefa.setAttribute("id", "botaoTarefa")
        botaoTarefa.setAttribute("class", "botaoTarefa")
        botaoTarefa.setAttribute("onclick", "window.location.href = '#modalTarefa'")
        botaoTarefa.appendChild(document.createTextNode("AdicionarTarefa"))

        areaTarefa.appendChild(botaoTarefa)

        if(document.getElementById("tabelaTarefa")) {
            areaTarefa.removeChild("tabelaTarefa")
        }
        let tabela = document.createElement("table")
        tabela.setAttribute("id", "tabelaTarefa")

        let headers = document.createElement("tr")
        let hTarefa = document.createElement("th")
        let hNota = document.createElement("th")
        let hTotal = document.createElement("th")
        hNota.setAttribute("style", "border-left: 1px solid black; border-right: 1px solid black;")
        hTarefa.appendChild(document.createTextNode("Tarefa"))
        hNota.appendChild(document.createTextNode("Nota"))
        hTotal.appendChild(document.createTextNode("Total"))
        headers.appendChild(hTarefa)
        headers.appendChild(hNota)
        headers.appendChild(hTotal)

        for(let tarefa of tarefas) {
            if(tarefa.materiaId === idMateriaSelecionada) {
                let linha = document.createElement("tr")
                let tarNome = document.createElement("td")
                let tarNota = document.createElement("td")
                let tarTotal = document.createElement("td")
                tarNota.setAttribute("style", "border-left: 1px solid black; border-right: 1px solid black;")
                tarNome.appendChild(document.createTextNode(tarefa.nome))
                tarNota.appendChild(document.createTextNode(tarefa.nota))
                tarTotal.appendChild(document.createTextNode(tarefa.pontos))
                linha.appendChild(tarNome)
                linha.appendChild(tarNota)
                linha.appendChild(tarTotal)
                tabela.appendChild(linha)
            }
        }
        tabela.appendChild(headers)
        areaTarefa.appendChild(tabela)
    } else {
        if(document.getElementById("divider")) {
            classeBody.removeChild(document.getElementById("divider"))
        }
        if(document.getElementById("areaTarefa")) {
            classeBody.removeChild(document.getElementById("areaTarefa"))
        }
    }
}

function salvarTarefa() {
    let nome = document.getElementById("nomeTarefa").value
    let pontos = document.getElementById("pontosTotal").value
    let nota = document.getElementById("nota").value

    let tar = {
        id: tarefas[tarefas.length - 1] ? tarefas[tarefas.length - 1].id + 1 : 1,
        nome: nome, 
        pontos: pontos, 
        nota: nota,
        materiaId: idMateriaSelecionada
    }

    tarefas.push(tar)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    let tabela = document.getElementById("tabelaTarefa")
    let linha = document.createElement("tr")
    let tarNome = document.createElement("td")
    let tarNota = document.createElement("td")
    let tarTotal = document.createElement("td")
    tarNota.setAttribute("style", "border-left: 1px solid black; border-right: 1px solid black;")
    tarNome.appendChild(document.createTextNode(tar.nome))
    tarNota.appendChild(document.createTextNode(tar.nota))
    tarTotal.appendChild(document.createTextNode(tar.pontos))
    linha.appendChild(tarNome)
    linha.appendChild(tarNota)
    linha.appendChild(tarTotal)
    tabela.appendChild(linha)

    window.location.href = '#'
}