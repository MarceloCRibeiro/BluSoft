using System;
using System.Web.Services;

public partial class ConsultaCliente : System.Web.UI.Page
{

    #region Properties

    
    #endregion

    #region Events

    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    #endregion

    #region Methods

    private static bool VerificarSessao() // Verifica se sessão está ativa
    {
        // implementamos a rotina para validar a sessão do usuário
        return true;
    }

    #endregion

    #region WebMethods

    [WebMethod]
    public static object BuscarCliente(string tipoPesquisa, string valorPesquisa)
    {
        object resultado;
        try
        {
            // objeto retornado da consulta 
            resultado = new[] { 
                new { Codigo = 1, CPF = "445.407.433-09", RG = "12.934.465-07", Nome = "Caio Cardoso Alves", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 2, CPF = "748.034.731-61", RG = "14.650.917-46", Nome = "Emily Correia Lima", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 3, CPF = "407.654.414-54", RG = "01.337.173-62", Nome = "Luís Araujo Alves", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 4, CPF = "729.621.404-08", RG = "43.284.552-81", Nome = "João Rocha Dias", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 5, CPF = "547.173.403-37", RG = "95.165.032-53", Nome = "Estevan Barbosa Fernandes", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 6, CPF = "642.945.436-39", RG = "15.453.255-87", Nome = "Daniel Cavalcanti Costa", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 7, CPF = "206.372.340-06", RG = "88.569.132-80", Nome = "Vitória Ribeiro Oliveira", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 8, CPF = "165.632.227-73", RG = "16.419.386-00", Nome = "Anna Oliveira Goncalves", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 9, CPF = "582.326.557-39", RG = "24.252.973-86", Nome = "Otávio Dias Rocha", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}, 
                new { Codigo = 10, CPF = "318.816.763-66", RG = "73.333.934-19", Nome = "Gabriela Rocha Martins", DataNascimento = "05/06/2005", Telefone = "(99) 99999-9999", UF = "SC"}
            };

            return resultado;

        }
        catch (Exception ex)
        {
            return ex;
        }
        
    }

    #endregion

}

