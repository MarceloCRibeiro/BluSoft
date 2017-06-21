<%@ Page Language="C#" AutoEventWireup="true" EnableEventValidation="false" CodeFile="ConsultaCliente.aspx.cs"
    Inherits="ConsultaCliente" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge; IE=11; IE=10; IE=9; IE=8; IE=7" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
   <title>BluSoft</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="css/sb-admin-2.min.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="css/metisMenu/metisMenu.min.css" />
    <link rel="stylesheet" type="text/css" href="css/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/default.css" />
    <link href="css/dataTables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="css/dataTables/dataTables.responsive.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-datetimepicker.css" />
    
    <link rel="stylesheet" type="text/css" href="css/cssProposta.css" />

    <script language="javascript" type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
    <script language="javascript" type="text/javascript" src="js/jquery.mask.min.js"></script>
    <script language="javascript" type="text/javascript" src="js/jquery.maskMoney.js"></script>
    <script language="javascript" type="text/javascript" src="js/bootstrap.js"></script>
    
    <script language="javascript" type="text/javascript" src="js/metisMenu/metisMenu.js"></script>
    <script language="javascript" type="text/javascript" src="js/sb-admin-2.js"></script>
    <script language="javascript" type="text/javascript" src="js/default.js"></script>
    <script src="js/dataTables/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="js/dataTables/dataTables.bootstrap.min.js" type="text/javascript"></script>
    <script src="js/dataTables/dataTables.responsive.js" type="text/javascript"></script>
    
    <script type="text/javascript" src="Scripts/moment.min.js"></script>
    <script type="text/javascript" src="Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap-datetimepicker.js"></script>

    <script language="javascript" type="text/javascript">
        var TabelaResultado = null;

        $(document).ready(function () {
            CarregaForm();
        });

        function CarregaForm() {

            $(".loading").fadeIn("slow");

            

            $("#txtPesquisa").keypress(function (event) {

                if (event.ctrlKey)
                    return true;

                var busca = $("[name=optBusca]:checked").val();
                if (busca != 'NOME') {
                    return isKeyNumeric(event);
                }

            });

            $("#txtPesquisa").keydown(function (event) {
                var busca = $("[name=optBusca]:checked").val();
                if (busca != 'NOME') {
                    if (!isNumeric($(this).val()))
                        $(this).val('');
                }

            });


            $("#btnBuscar").off("click").on("click", function () {
                consultaCliente();
            });


            // configuramos a máscara para o controle de pesquisa
            var busca = $("[name=optBusca]:checked").val()
            if (busca == 'CPF') {
                $('#txtPesquisa').mask('999.999.999-99', { placeholder: 'CPF do cliente' });
            }
            else if (busca == 'NOME') {
                $('#txtPesquisa').attr('placeholder', 'Nome do cliente');
                $("#txtPesquisa").unmask();
            }

            // método para carregar o tipo de pesquisa
            $('input[type=radio][name=optBusca]').change(function () {

                if (this.value == 'CPF') {
                    $('#txtPesquisa').mask('999.999.999-99', { placeholder: 'Informe o CPF' });
                
                }
                else if (this.value == 'NOME') {
                    $('#txtPesquisa').attr('placeholder', 'Informe o nome');
                    $("#txtPesquisa").unmask();

                }

                $('#txtPesquisa').val('');
                exibeError($('#txtPesquisa'), false);
                $('#txtPesquisa').focus();

            });

            $("input[name=optBusca][id=optCPF]").prop('checked', true);
            $('#txtPesquisa').mask('999.999.999-99', { placeholder: 'CPF do cliente' });
            $("#txtPesquisa").val('');
            $('#txtPesquisa').focus();

            $(".loading").fadeOut("slow");

        }

        function consultaCliente() {

            try {

                if (ValidaPesquisa()) {

                    $(".loading").fadeIn("slow");
                    $("#divListaResultado").slideUp();

                    var tipoPesquisa = $("[name=optBusca]:checked").val();
                    var valorPesquisa = "";

                    var param = JSON.stringify({
                        valorPesquisa: valorPesquisa,
                        tipoPesquisa: tipoPesquisa
                    });

                    setTimeout(function () {

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: 'ConsultaCliente.aspx/BuscarCliente',
                            data: param,
                            dataType: "json",
                            async: false,
                            success: function (response) {
                                // obtemos o resultado do método
                                var listaResultado = response.d;

                                // verificamos o resultado do método
                                if (listaResultado != null && listaResultado.length > 0) {
                                    // limpamos todos os registros na grid(table)
                                    $("#table-resultado tbody tr").remove();

                                    $(".loading").fadeOut("slow");

                                    // inserimos um registro na grid
                                    carregaPesquisa(listaResultado);
                                    
                                    // exibimos a div com a grid 
                                    $("#divListaResultado").slideDown();
                                }
                                else {
                                    $(".loading").fadeOut("slow");
                                    exibeCampoObrigatorio($('#txtPesquisa'), "Sem resultado(s) para esta pesquisa!");
                                }

                            },
                            error: function (response) {
                                $("#table-resultado tbody tr").remove();

                                $(".loading").fadeOut("slow");

                                // Exibe uma mensagem de erro
                                //$("#MensagemErro").modal("show");
                                //$("#TextoMensagemErro").text('Mensagem de Erro!');

                                window.location.href = "Erro.aspx";

                            }
                        })

                    }, 500);

                }

                $(".loading").fadeOut("slow");

            }
            catch (Erro) {
                $(".loading").fadeOut("slow");
                $("#MensagemErro").text('Erro ao validar os dados do cliente!');
                $("#modalErro").modal("show");
                return false;
            }
        }

        function carregaPesquisa(listaResultado) {

            // para cada registro retornado
            $.each(listaResultado, function (index, item) {
                // inserimos um registro na grid
                insereTablePesquisa(item.Codigo, item.CPF, item.RG, item.Nome, item.DataNascimento, item.UF);
            })


        }

        //////////////////////////////////////////////////////////////
        /// Método responsável por validar os campos do formulário ///
        //////////////////////////////////////////////////////////////
        function ValidaPesquisa() {

            var busca = $("[name=optBusca]:checked").val();

            if (busca == 'CPF') {

                if ($('#txtPesquisa').val() == "") {
                    exibeError($('#txtPesquisa'), true);
                    $('#txtPesquisa').focus();
                    return false;
                }

                if (!validaCpf($('#txtPesquisa').val().trim())) {
                    exibeCampoObrigatorio($('#txtPesquisa'), "CPF inválido!");
                    $('#txtPesquisa').focus();
                    return false;
                }
            }

            else if (busca == 'NOME') {
                if ($('#txtPesquisa').val() == "") {
                    exibeError($('#txtPesquisa'), true);
                    $('#txtPesquisa').focus();
                    return false;
                }

                if ($('#txtPesquisa').val().trim().length < 3) {
                    exibeCampoObrigatorio($('#txtPesquisa'), "Informe o mínimo 3 caracteres!");
                    return false;
                }

                $('#txtPesquisa').val(formataNome($('#txtPesquisa').val()));

            }
            
            $(".loading").fadeIn("slow");
            return true;

        }

        
        ////////////////////////////////////////////////////////////
        /// Método responsável por adicionar um registro na grid ///
        ////////////////////////////////////////////////////////////
        function insereTablePesquisa(codigo, cpf, rg, nome, nascimento, telefone, uf) {
            // obtemos a quantidade de registro
            var indice = $("#table-resultado tr").length

            // montamos o html da tabela que será nosso grid
            var text = "";
            text += "<tr>";
            text += "   <td>" + cpf + "</td>";
            text += "   <td>" + nome + "</td>";
            text += "   <td>" + nascimento + "</td>";
            text += "   <td>" + uf + "</td>";
            text += "   <td><span class='glyphicon glyphicon-check selecionarItem' data-cod='" + codigo + "' data-nome='" + nome + "' data-toggle='tooltip' data-placement='top' title='editar' />&nbsp;&nbsp;<span class='glyphicon glyphicon-trash color-red removerItem' data-cod='" + codigo + "' data-toggle='tooltip' data-placement='top' title='remover' /></td>";
            text += "</tr>";

            // obtemos o controle tr da table
            var table = $("#table-resultado tbody");

            // adicionamos uma linha
            table.append(text);

            // criamos um registro json do registro inserido
            var item = { 'Codigo': codigo, 'CPF': cpf, 'RG': rg, 'Nome': nome, 'DataNascimento': nascimento, 'Telefone': telefone, 'UF': uf };

            var lista = $('input#hdnListaCartao').val();
            if (lista == "") {
                lista = [];
            }
            else {
                lista = $.parseJSON(lista);
            }
            // adicionamos um registro com o item inserido
            lista.push(item);

            // guardamos o item no hidden
            $('input#hdnListaCartao').val(JSON.stringify(lista));

            // evendo click responsavel por selecionar um item no grid
            $(".selecionarItem").off("click").on("click", function () {
                // ocultamos as tooltips
                $('.tooltip').hide();

                // zeramos a variavel que contém o item selecionado
                CartaoItem = null;

                // obtemos o valor do atributo 'data-cod_cartao' que contem o código da linha selecionada
                var codigo = $(this).attr('data-cod');

                var lista = $('input#hdnListaCartao').val();
                lista = $.parseJSON(lista);

                // obtemos o item selecionado na lista
                var itemLista = lista.filter(function (item, i) {
                    if (item.Codigo == codigo) {
                        return item;
                    }
                });

                // se item foi encontrado
                if (itemLista != null && itemLista.length > 0) {
                    // obtemos 
                    $('#txtNome').val(cartao[0].Nome);
                    $('#txtLimite').val(retornaValor(cartao[0].Limite));

                    // setamos a variável com item selecionado
                    CartaoItem = cartao[0];

                    // alteramos o estilo
                    $("#table-resultado tbody tr").removeClass();
                    $(this).parent().parent().addClass('info');

                    // exibimos a div com os dados do cartão
                    $('#divCartaoItem').slideDown();
                    //$('#divCartaoItem').fadeIn("slow");

                }

            });

            // evendo click responsavel por remover um item no grid
            $(".removerItemCartao").off("click").on("click", function () {
                // ocultamos as tooltips
                $('.tooltip').hide();
                // ocultamos as divs
                $('#divTableCartao').slideUp();
                $('#divCartaoItem').slideUp();

                // obtemos o valor do atributo 'data-cod_cartao' que contem o código do cartão da linha selecionada
                var codigo = $(this).attr('data-cod_cartao');
                var item_cartao = 0;

                var listaCartao = $('input#hdnListaCartao').val();
                listaCartao = $.parseJSON(listaCartao);

                // obtemos o item selecionado na lista 
                var cartao = listaCartao.filter(function (item, i) {
                    if (item.Codigo == codigo) {
                        item_cartao = i;
                        return item;
                    }
                });

                // se item foi encontrado
                if (cartao != null && cartao.length > 0) {
                    if (cartao[0].Codigo == codigo)
                        // removemos o item da lista
                        listaCartao.splice(item_cartao, 1);
                }

                // iniciamos a inserção da nova lista 
                $('input#hdnListaCartao').val('');
                $("#table-resultado tbody tr").remove();

                if (listaCartao.length > 0) {
                    var text = "";
                    for (var i = 0; i < listaCartao.length; i++) {
                        insereTablePesquisa(listaCartao[i].Codigo, listaCartao[i].Cartao, listaCartao[i].Bandeira, listaCartao[i].Produto, listaCartao[i].Nome, listaCartao[i].Limite);
                    }

                    // exibimos a div com a grid 
                    $('#divTableCartao').slideDown();

                }
                // se a lista está vazia
                if (listaCartao.length == 0)
                    // ocultamos a div com a grid
                    $('#divTableCartao').slideUp();

            });

        }



</script>

</head>

<body class="fadeIn">
    <form id="form1" autocomplete="off" runat="server">
    <asp:ScriptManager runat="server">
    </asp:ScriptManager>
    
    <div class="loading"></div>
    
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <h3 id="divTitulo" class="page-header">
                        Cliente</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel-body">
                        <div class="row row-margin">
                            <div class="panel panel-default">
                                <div class="panel-heading panel-font">
                                    Consulta Cliente
                                </div>

                                <div class="panel-body">
                                    <div class="form-group">
                                        <label class="radio-inline">
                                            <input runat="server" type="radio" name="optBusca" id="optCPF" value="CPF" />CPF
                                        </label>
                                        <label class="radio-inline">
                                            <input runat="server" type="radio" name="optBusca" id="optNome" value="NOME" />Nome
                                        </label>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input ID="txtPesquisa" data-required="true" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <button type="button" id="btnBuscar" usesubmitbehavior="False" class="btn btn-default">
                                                    <i class="fa fa-search"></i> Buscar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div id="divListaResultado" class="row display-none">
                                                <div class="col-md-8 bs-glyphicons">
                                                    <hr />
                                                    <table width="100%" class="table table-striped table-hover" id="table-resultado">
                                                        <thead>
                                                            <tr>
                                                                <th style="width: 130px">
                                                                    CPF
                                                                </th>
                                                                <th style="width: 200px">
                                                                    Nome
                                                                </th>
                                                                <th style="width: 130px; text-align: center">
                                                                    Data Nascimento
                                                                </th>
                                                                <th style="width: 100px; text-align: center">
                                                                    Região
                                                                </th>
                                                                <th style="width: 10px; text-align: center">
                                                                    Ações
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- mensagem de sucesso -->
    <div class="modal fade alert" id="MensagemSucesso" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog alert-info" style="width: 450px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;</button>
                    <h4 class="modal-title" id="myModalLabel">
                        Titulo da Mensagem</h4>
                </div>
                <div class="modal-body align-center" style="font-size: 18px !important;" id="TextoMensagemSucesso">
                    Mensagem de Sucesso!
                </div>
                <div class="modal-footer">
                    <button id="btnOk" type="button" class="btn btn-primary center-block" data-dismiss="modal">
                        OK</button>
                </div>
            </div>
        </div>
    </div>
    <!-- mensagem de erro -->
    <div class="modal fade alert" id="MensagemErro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog alert-danger" style="width: 450px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;</button>
                    <h4 class="modal-title">
                        Titulo da Mensagem
                    </h4>
                </div>
                <div class="modal-body align-center" style="font-size: 18px !important;" id="TextoMensagemErro">
                    Mensagem de Erro
                </div>
                <div class="modal-footer">
                    <button id="btnErro" type="button" class="btn btn-danger center-block" data-dismiss="modal">
                        OK</button>
                </div>
            </div>
        </div>
    </div>
</form>
</body>

</html>
