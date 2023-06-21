var jogadores = [];
var numerosSorteados = [];
var vencedor = null;

function gerarNumerosAleatorios(quantidade, min, max) {
  if (quantidade > max - min) {
    console.log("Intervalo insuficiente...");
    return;
  }

  var numeros = [];

  while (numeros.length < quantidade) {
    var aleatorio = Math.floor(Math.random() * (max - min) + min);

    if (!numeros.includes(aleatorio)) {
      numeros.push(aleatorio);
    }
  }

  return numeros;
}

function gerarCartela() {
  var nomeJogador = prompt("Digite o nome do jogador");

  var cartela = [
    gerarNumerosAleatorios(5, 1, 15),
    gerarNumerosAleatorios(5, 16, 30),
    gerarNumerosAleatorios(5, 31, 45),
    gerarNumerosAleatorios(5, 46, 60),
    gerarNumerosAleatorios(5, 61, 75),
  ];

  jogadores.push({
    nomeJogador: nomeJogador,
    cartela: cartela,
    numerosMarcados: 0,
  });

  desenharCartela(nomeJogador, cartela);

  console.log(jogadores);
}

function reiniciarJogo() {
  jogadores = [];
  numerosSorteados = [];
  vencedor = null;
  var div = document.getElementById("body_cartelas");
  div.innerHTML = "";
  var numerosDiv = document.getElementById("numeros_sorteados");
  numerosDiv.innerHTML = "";
  var vitoriaDiv = document.getElementById("janela_vitoria");
  vitoriaDiv.style.display = "none";
  var botaoJogar = document.getElementById("botao_jogar");
  botaoJogar.disabled = false;
}


function desenharCartela(nome, cartela) {
  var div = document.getElementById("body_cartelas");

  var tabela = document.createElement("table");
  tabela.classList.add("cartela");

  var thead = document.createElement("thead");

  var thB = document.createElement("th");
  thB.innerText = "B";
  var thI = document.createElement("th");
  thI.innerText = "I";
  var thN = document.createElement("th");
  thN.innerText = "N";
  var thG = document.createElement("th");
  thG.innerText = "G";
  var thO = document.createElement("th");
  thO.innerText = "O";

  thead.appendChild(thB);
  thead.appendChild(thI);
  thead.appendChild(thN);
  thead.appendChild(thG);
  thead.appendChild(thO);

  var caption = document.createElement("caption");
  caption.innerText = nome;

  tabela.appendChild(caption);

  for (var i = 0; i < 5; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 5; j++) {
      var td = document.createElement("td");
      if (i === 2 && j === 2) {
        td.innerText = "X";
        td.classList.add("x");
        tr.appendChild(td);
      } else {
        var numero = cartela[j][i];
        td.innerText = numero;
        td.dataset.selecionado = false;
        td.addEventListener("click", function () {
          if (this.dataset.selecionado === "true") {
            this.style.backgroundColor = "";
            this.dataset.selecionado = false;
          } else {
            this.style.backgroundColor = "yellow";
            this.dataset.selecionado = true;
          }
        });
        tr.appendChild(td);
      }
    }
    tabela.appendChild(tr);
  }

  tabela.appendChild(thead);
  div.appendChild(tabela);
}

function sortearNumero() {
  if (vencedor) return;

  var numeroSorteado = null;
  do {
    numeroSorteado = Math.floor(Math.random() * 75) + 1;
  } while (numerosSorteados.includes(numeroSorteado));

  numerosSorteados.push(numeroSorteado);

  var numerosDiv = document.getElementById("numeros_sorteados");
  numerosDiv.innerText = "Números sorteados: " + numerosSorteados.join(", ");

  var cartelas = document.getElementsByClassName("cartela");
  var vencedores = [];

  for (var i = 0; i < cartelas.length; i++) {
    var cartela = cartelas[i];
    var tds = cartela.getElementsByTagName("td");

    for (var j = 0; j < tds.length; j++) {
      var td = tds[j];
      var numeroCartela = parseInt(td.innerText);

      if (numeroCartela === numeroSorteado && td.dataset.selecionado === "false") {
        td.style.backgroundColor = "blue";
        td.dataset.selecionado = true;

        var jogador = jogadores[i];
        jogador.numerosMarcados++;

        if (jogador.numerosMarcados === 24) {
          vencedores.push(jogador);
        }
      }
    }
  }

  if (vencedores.length > 0) {
    vencedor = vencedores;
    var vitoriaDiv = document.getElementById("janela_vitoria");
    var vencedoresNomes = vencedores.map(function (v) {
      return v.nomeJogador;
    });
    vitoriaDiv.innerText = "Vencedor(es): " + vencedoresNomes.join(", ") + "!";
    vitoriaDiv.style.display = "block";
  }
}
