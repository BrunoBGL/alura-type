$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
  $("#spinner").toggle();

  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
  .fail(function() {
    $("#erro").toggle();
    setTimeout(function() {
      $("#erro").toggle();
    },2500);
  })
  .always(function(){
    $("#spinner").toggle();
  });

}

function trocaFraseAleatoria(data) {
  var frase = $(".frase");
  var numeroAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempo(data[numeroAleatorio].tempo);
}

function atualizaTempo(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function buscaFrase() {
  $("#spinner").toggle();
  var id = $("#frase-id").val();
  var dados = {id: id};

  $.get("http://localhost:3000/frases",dados, trocaFrase)
  .fail(function() {
    $("#erro").toggle();
    setTimeout(function() {
      $("#erro").toggle();
    },2500);
  })
  .always(function(){
    $("#spinner").toggle();
  });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempo(data.tempo);
}
