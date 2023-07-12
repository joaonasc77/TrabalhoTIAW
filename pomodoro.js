var intervalo;
var timerEmAndamento = false;
var MinEstudo=localStorage.getItem("configPomodoro") ? JSON.parse(localStorage.getItem("configPomodoro")).concentracao ? JSON.parse(localStorage.getItem("configPomodoro")).concentracao :60 : 60;
var MinDescanso=localStorage.getItem("configPomodoro") ? JSON.parse(localStorage.getItem("configPomodoro")).descanso ?JSON.parse(localStorage.getItem("configPomodoro")).descanso : 10: 10;

var duracaoEstudo = 60 * MinEstudo; // Duração do estudo em segundos (1 minuto)
var duracaoDescanso = 60 * MinDescanso; // Duração do descanso em segundos (10 minutos)

var tempoRestante = duracaoEstudo; // Tempo restante do timer
var emEstudo = true; // Variável para controlar se está no período de estudo

function iniciarTimer() {
    var display = document.querySelector("#timerEstudo");
    var botaoStart = document.querySelector("#startButton");
    var imagemStart = document.querySelector("#startImage");

    if(!(document.getElementById('vermelhoArea') || document.getElementById('verdeArea'))) {
      let baixoParte = document.getElementById("baixoParte")
      
      let areaInformacao = document.createElement('div')
      areaInformacao.setAttribute('class', 'areaVermelho')
      areaInformacao.setAttribute('id', 'vermelhoArea')
      let span = document.createElement('span')
      span.appendChild(document.createTextNode('Momento de concentração'))
      areaInformacao.appendChild(span)
      baixoParte.append(areaInformacao)
    }
  
    if (!timerEmAndamento) {
      intervalo = comecaTimer(tempoRestante, display, function() { 
        // Callback executado ao terminar o timer
        pausarTimer(display);
        if (emEstudo) {
          // Terminou o tempo de estudo, iniciar o tempo de descanso
          tempoRestante = duracaoDescanso;

          let baixoParte = document.getElementById("baixoParte")

          baixoParte.removeChild(document.getElementById('vermelhoArea'))

          let areaInformacao = document.createElement('div')
          areaInformacao.setAttribute('class', 'areaVerde')
          areaInformacao.setAttribute('id', 'verdeArea')
          let span = document.createElement('span')
          span.appendChild(document.createTextNode('Descanso'))
          areaInformacao.appendChild(span)
          baixoParte.append(areaInformacao)
        } else {
          // Terminou o tempo de descanso, iniciar o tempo de estudo
          tempoRestante = duracaoEstudo;
          
          let baixoParte = document.getElementById("baixoParte")

          baixoParte.removeChild(document.getElementById('verdeArea'))
          
          let areaInformacao = document.createElement('div')
          areaInformacao.setAttribute('class', 'areaVermelho')
          areaInformacao.setAttribute('id', 'vermelhoArea')
          let span = document.createElement('span')
          span.appendChild(document.createTextNode('Momento de concentração'))
          areaInformacao.appendChild(span)
          baixoParte.append(areaInformacao)
        }
        emEstudo = !emEstudo; // Alternar entre estudo e descanso
        iniciarTimer();
      });
  
      timerEmAndamento = true;
      imagemStart.src = "../assets/Pause.png";
      imagemStart.alt = "Pause";
    } else {
      pausarTimer(display);
    }
  }

// Função para pausar o timer
function pausarTimer(display) {
  if (timerEmAndamento) {
    clearInterval(intervalo);
    timerEmAndamento = false;

    var minutos = parseInt(display.textContent.split(":")[0]);
    var segundos = parseInt(display.textContent.split(":")[1]);

    tempoRestante = minutos * 60 + segundos;

    var imagemStart = document.querySelector("#startImage");
    imagemStart.src = "../assets/Start.png";
    imagemStart.alt = "Start";
  }
}

// Função para iniciar o timer
function comecaTimer(duracao, display, callback) {
  var timer = duracao;
  var minutos, segundos;

  var intervalo = setInterval(function () {
    minutos = parseInt(timer / 60, 10);
    segundos = parseInt(timer % 60, 10);

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    display.textContent = minutos + ":" + segundos;

    if (--timer < 0) {
      clearInterval(intervalo);
      callback(); // Chamar o callback ao terminar o timer
    }
  }, 1000);

  return intervalo;
}
function salvar() {
  let concentracao = document.getElementById("concentracao").value
  let descanso = document.getElementById("descanso").value
  this.MinEstudo=concentracao
  this.MinDescanso=descanso
  let config={
    concentracao:concentracao,
    descanso:descanso,
  }
  this.emEstudo=true
  this.tempoRestante= 60* concentracao
  window.location.href = '#'

  localStorage.setItem('configPomodoro', JSON.stringify(config))

  document.getElementById("concentracao").value = null
  document.getElementById("descanso").value = null
  
}
