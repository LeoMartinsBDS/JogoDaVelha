/**
 * Created by Leonardo on 14/01/2018.
 */
var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready(function () {

    $('#btn_iniciar_jogo').click(function(){

            //valida a digitação dos apelidos
        if($('#entrada_apelido_jg1').val() == '')
        {
            alert('Apelido do jogador 1 não foi preenchido');
            return false;
        }
        if($('#entrada_apelido_jg2').val() == '')
        {
            alert('Apelido do jogador 2 não foi preenchido');
            return false;
        }

        //exibir os apelidos
        //o .html pega os valores de tudo que não for do tipo input e altera o valor de acordo com o desejado
        $('#nome_jogador_1').html($('#entrada_apelido_jg1')).val();
        $('#nome_jogador_2').html($('#entrada_apelido_jg2')).val();

        $('#pagina_inicial').hide();
        $('#palco_jogo').show();

        $('.jogada').click(function () {

            var id_campo_clicado = this.id;
            $('#'+id_campo_clicado).off();
            jogada(id_campo_clicado);
        });

        function jogada(id) {
            var icone = '';
            var ponto = 0;

            if((rodada % 2) == 1)
            {
                icone = 'url("imagens/marcacao_1.png")';
                ponto = -1;
            }
            else
            {
                icone = 'url("imagens/marcacao_2.png")';
                ponto = 1;
            }
            rodada++;

            $('#'+id).css('background-image', icone);

            var linha_coluna = id.split('-');

            matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

            verifica_combinacao();
        }
        
        function verifica_combinacao() {

            //verifica horizontal
            var pontos = 0;
            for(var i = 1; i <=3; i++)
            {
                pontos = pontos + matriz_jogo['a'][i];
            }
            ganhador(pontos);

            pontos = 0;
            for(var i = 1; i <=3; i++)
            {
                pontos = pontos + matriz_jogo['b'][i];
            }
            ganhador(pontos);

            pontos = 0;
            for(var i = 1; i <=3; i++)
            {
                pontos = pontos + matriz_jogo['c'][i];
            }
            ganhador(pontos);

            //verificar vertical
            for(var l = 0; l <= 3; l++)
            {
                pontos = 0
                pontos = pontos + matriz_jogo['a'][l];
                pontos = pontos + matriz_jogo['b'][l];
                pontos = pontos + matriz_jogo['c'][l];

                ganhador(pontos);
            }

            //verificar diagonais
            pontos = 0;
            pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
            ganhador(pontos);

            pontos = 0;
            pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
            ganhador(pontos);
        }

        function ganhador(pontos){
            if(pontos == -3){
                var jogador1 = $('#entrada_apelido_jg1').val();
                alert(jogador1+ ' é o vencedor');
                $('.jogada').off();
            }
            else if(pontos == 3)
            {
                var jogador2 = $('#entrada_apelido_jg2').val();
                alert(jogador2+ ' é o vencedor');
                $('.jogada').off();
            }

        }
    });
});