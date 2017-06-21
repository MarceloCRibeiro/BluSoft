using System;
using System.Web.Services;

public partial class Cliente : System.Web.UI.Page
{

    #region Properties

    
    #endregion

    #region Events

    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    #endregion

    #region Methods


    #endregion

    #region WebMethods

    [WebMethod(EnableSession = true)]
    public static bool CadastraCliente(string cpf, string rg, string nome, string nascimento, string uf)
    {
        
        try
        {
            
        
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return true;

    }

    #endregion

}

