var rotinas = localStorage.getItem("rotinas") ? JSON.parse(localStorage.getItem("rotinas")) : []
var objetivos = localStorage.getItem("objetivos") ? JSON.parse(localStorage.getItem("objetivos")) : []
var diaSemanaSelecionado

for(let j = 0; j<rotinas.length; j++)
  {
    //parte com informações já cadastradas (até a 14)
    let retanguloSemana = document.getElementById(`semana-${rotinas[j].diaSemana}`)
    let innerRetangle = document.createElement('div')
    innerRetangle.setAttribute('class', 'inner-rectangle')
    if(new Date() > new Date(rotinas[j].data)) {
      innerRetangle.setAttribute('style', 'background: #df4429;')
    }
    innerRetangle.setAttribute('id', `card-${rotinas[j].id}`)
    innerRetangle.setAttribute('onclick', `abrirVisualizacao(${rotinas[j].id})`)
    let nomeRotinaSpan = document.createElement('span')
    nomeRotinaSpan.setAttribute('class', 'spanNomeRotina')
    nomeRotinaSpan.appendChild(document.createTextNode(rotinas[j].nome.length > 10 ? rotinas[j].nome.substring(0, 10) + '...' : rotinas[j].nome))
    let excluirRotina = document.createElement("button")
    excluirRotina.setAttribute('class', 'botaoExcluir')
    excluirRotina.setAttribute("onclick", `excluirRotina(${rotinas[j].id})`)
    excluirRotina.appendChild(document.createTextNode("X"))
    innerRetangle.appendChild(excluirRotina)
    innerRetangle.appendChild(nomeRotinaSpan)
    retanguloSemana.appendChild(innerRetangle)
  }

function buttonClicked(diaSemana) {
  diaSemanaSelecionado = diaSemana.target ? diaSemana.target.attributes[1].nodeValue.split("'")[1] : null
  window.location.href = '#modalRotina'
}

//adiciona o evento de clique a todos os botões com a classe "button"
var buttons = document.getElementsByClassName("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonClicked);
}

function salvarRotina() {
  let nome = document.getElementById("nome").value
  let data = document.getElementById("data").value
  
  let rot = {
      id: rotinas[rotinas.length - 1] ? rotinas[rotinas.length - 1].id + 1 : 1,
      nome: nome,
      data: data,
      diaSemana: diaSemanaSelecionado 
  }

  rotinas.push(rot)
  localStorage.setItem("rotinas", JSON.stringify(rotinas))

  //mostrar em tela as informações salvas (até a 48)
  let retanguloSemana = document.getElementById(`semana-${diaSemanaSelecionado}`)
  let innerRetangle = document.createElement('div')
  innerRetangle.setAttribute('class', 'inner-rectangle')
  if(new Date() > new Date(rot.data)) {
    innerRetangle.setAttribute('style', 'background: #df4429;')
  }
  innerRetangle.setAttribute('id', `card-${rot.id}`)
  innerRetangle.setAttribute('onclick', `abrirVisualizacao(${rot.id})`)
  let nomeRotinaSpan = document.createElement('span')
  nomeRotinaSpan.setAttribute('class', 'spanNomeRotina')
  nomeRotinaSpan.appendChild(document.createTextNode(rot.nome.length > 10 ? rot.nome.substring(0, 10) + '...': rot.nome))
  let excluirRotina = document.createElement("button")
  excluirRotina.setAttribute('class', 'botaoExcluir')
  excluirRotina.setAttribute("onclick", `excluirRotina(${rot.id})`)
  excluirRotina.appendChild(document.createTextNode("X"))
  innerRetangle.appendChild(excluirRotina)
  innerRetangle.appendChild(nomeRotinaSpan)
  retanguloSemana.appendChild(innerRetangle)

  window.location.href = '#'
}

function excluirRotina(id) {
  let rot = rotinas.filter(r => r.id === id)[0]
  rotinas = rotinas.filter(r => r.id !== id)
  localStorage.setItem("rotinas", JSON.stringify(rotinas))
  let retanguloSemana = document.getElementById(`semana-${rot.diaSemana}`)
  retanguloSemana.removeChild(document.getElementById(`card-${rot.id}`))
  window.location.href = "#"
}

function abrirVisualizacao(id) {
  if(rotinas.filter(r => r.id === id).length > 0) {
    let elemento = rotinas.filter(r=> r.id===id)[0]
    window.location.href = '#modalVisualizacao'

    let visualizacaoContent = document.getElementById("visualizacaoContent")

    if(new Date() > new Date(elemento.data)) {
      visualizacaoContent.setAttribute('style', 'background: #df4429;')
    } else {
      visualizacaoContent.setAttribute('style', 'background: #FFED4F;')
    }

    let tituloArea = document.getElementById("tituloArea")
    if(document.getElementById("visualizacaoTitulo")) {
      tituloArea.removeChild(document.getElementById("visualizacaoTitulo"))
    }
    let titulo = document.createElement("span")
    titulo.setAttribute("class", "tituloVisualizacao")
    titulo.setAttribute("id", "visualizacaoTitulo")
    titulo.appendChild(document.createTextNode(elemento.nome))
    tituloArea.appendChild(titulo)

    if(document.getElementById('areaData')) {
      visualizacaoContent.removeChild(document.getElementById('areaData'))
    }

    let areaData = document.createElement("div")
    areaData.setAttribute('class', 'dataArea')
    areaData.setAttribute('id', 'areaData')

    let data = document.createElement('span')
    let datas = elemento.data.split('-')
    data.appendChild(document.createTextNode(`Dia final ${datas[2]}/${datas[1]}/${datas[0]}`))
    
    let diaFaltante = new Date() < new Date(elemento.data) ? (new Date(elemento.data) - new Date()) / 86400000 : (new Date() - new Date(elemento.data)) / 86400000

    let diaFaltantes = document.createElement('span')
    
    if(new Date() > new Date(elemento.data)) {
      diaFaltantes.appendChild(document.createTextNode(`${(diaFaltante).toString().split('.')[0]} dias em atraso`))
    } else {
      diaFaltantes.appendChild(document.createTextNode(`${(diaFaltante + 1).toString().split('.')[0]} dias faltantes`))
    }

    areaData.appendChild(data)
    areaData.appendChild(diaFaltantes)

    visualizacaoContent.appendChild(areaData)
  }
}

function salvarNomeObjetivo() {
  let nome = document.getElementById("nomeObjetivo").value
  
  let obj = {
      id: objetivos[objetivos.length - 1] ? objetivos[objetivos.length - 1].id + 1 : 1,
      nome: nome, 
      rotinaId: rotinas[rotinas.length - 1] ? rotinas[rotinas.length - 1].id + 1 : 1,
  }

  objetivos.push(obj)
  localStorage.setItem("objetivos", JSON.stringify(objetivos))
}