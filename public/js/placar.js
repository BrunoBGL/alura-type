$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function scrollPlacar() {
  var posicao = $(".placar").offset().top;
  console.log(posicao);
  $("html,body").animate({
    scrollTop: posicao + "px"
  }, 1000);
}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Bichão";
  var numeroPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numeroPalavras);

  corpoTabela.append(linha);
  linha.find(".botao-remover").click(removerPlacar);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function novaLinha(usuario, numeroPalavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaNumeroParavras = $("<td>").text(numeroPalavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaNumeroParavras);
  linha.append(colunaRemover);

  return linha;
}

function removerPlacar(event) {
  event.preventDefault();

  var linha = $(this).parent().parent();
  linha.fadeOut(1000);
  setTimeout(function() {
    linha.remove();
  }, 1000);
}

function mostraPlacar() {
  $(".placar").stop().slideToggle(2000);
}

function sincronizaPlacar() {
  $("#spinner").toggle();
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
