$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function scrollPlacar() {
  var posicao = $(".placar").offset().top;
  $("html,body").animate({
    scrollTop: posicao + "px"
  }, 1000);
}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
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
  scrollPlacar();
}

function sincronizaPlacar() {
  var placar = [];
  var linhas = $("tbody>tr");
  linhas.each(function() {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras
    }

    placar.push(score);
  });

  var dados = {
    placar: placar
  }

  $.post("http://localhost:3000/placar", dados, function() {
    console.log("Salvo!");
    $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao Sincronizar!");
  })
  .always(function() {
    setTimeout(function () {
      $(".tooltip").tooltipster("close");
    },1200);
  })
  .fail(function () {
    $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao Sincronizar!");

  });

}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function(data) {
    $(data).each(function() {
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removerPlacar);
      $("tbody").append(linha);
    });
  });
}
