
$(function () {
    //$('.panel-body').tooltip({ selector: "[data-toggle=tooltip]", container: "body" })
    $('body').tooltip({ selector: "[data-toggle=tooltip]", container: "body" })
    $("[data-toggle=popover]").popover()

    $('.input-cpf').mask('000.000.000-00');
    $('.input-cnpj').mask('99.999.999/9999-99');
    $('.input-creditcard').mask('9999 9999 9999 9999');
    $('.input-date').mask('99/99/9999');
    $('.input-phone').mask('(00) 0000-0000');
    $('.input-cep').mask('00000-000');
    $('.input-money').maskMoney({ symbol: "R$", showSymbol: true, decimal: ",", thousands: ".", symbolStay: true });

    $(".input-lowercase").focusout(function (event) {
        //$(this).val($(this).val().toLowerCase().trim());
        $(this).val(formataNome($(this).val()).toLowerCase().trim());
    });

    $(".input-uppercase").focusout(function (event) {
        $(this).val(formataNome($(this).val()).toUpperCase().trim());
    });

    $(".input-capitalize").focusout(function (event) {
        $(this).val(formataNome($(this).val()));
    });

    $(".input-capitalize, .input-uppercase, .input-lowercase").keypress(function (event) {
        if (event.ctrlKey)
            return true;

        return isKeyAlpha(event);
    });

    $(".input-numeric, .input-date, .input-cpf, .input-cnpj, .input-cep, .input-phone, .input-money, .input-creditcard").keypress(function (event) {
        
        if (event.ctrlKey)
            return true;

        // permitimos somente números
        //var code = event.charCode || event.keyCode;
        // return /\d/.test(String.fromCharCode(code));
        //return somenteNumerico(event);

        return isKeyNumeric(event);

    });

    

    $(".input-alphanumeric").keypress(function (event) {

        if (event.ctrlKey)
            return true;

        return isKeyAlphanumeric(event);

    });

    $(".input-numeric, .input-date, .input-cpf, .input-cnpj, .input-cep, .input-phone, .input-money, .input-creditcard").keydown(function (event) {

        if (!isNumeric($(this).val()))
            $(this).val('');

    });

    $(".input-email").keypress(function (event) {

        if (event.ctrlKey)
            return true;

        return isKeyAlphanumeric2(event);

    });

    $(".input-phone").keypress(function (event) {
        var key = event.key;

        if (key === undefined) {
            var code = event.charCode || event.keyCode;
            key = String.fromCharCode(code);
        }

        var allowedSpecialKeys = '#Tab#ArrowLeft#ArrowRight#ArrowUp#ArrowDown#End#Home#Backspace#Delete#';
        if (allowedSpecialKeys.indexOf('#' + key + '#') > -1) {
            return true;
        }

        if (isKeyNumeric(event)) {
            if ($(this).val().length == 14) {
                $(this).mask('(00) 00000-0000');
            }
            else if ($(this).val().length > 14) {
                return false;
            }
            else {
                $(this).mask('(00) 0000-0000');
            }
        }

        return isKeyNumeric(event);

    });

    // TODO: melhorar: não está permitindo acentos, nº : , ;
    //$('input').keypress(function () {
    //    return /^[a-zA-Z0-9_ ]*$/.test(String.fromCharCode(event.keyCode)); 
    //});

    $('.input-date').focusout(function (event) {
        if ($(this).val() == '') return;

        if (!validaData($(this).val().trim())) {
            exibePopover($(this), "Data inválida");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }

    });

    $('.input-cpf').focusout(function (event) {
        if ($(this).val() == '') return;

        if (!validaCpf($(this).val().trim())) {
            exibePopover($(this), "CPF inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }

    });

    $('.input-cnpj').focusout(function (event) {
        if ($(this).val() == '') return;

        if (!validaCnpj($(this).val().trim())) {
            exibePopover($(this), "CNPJ inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }

    });

    $('.input-phone').focusout(function (event) {
        if ($(this).val() == '') return;

        if ($(this).val().trim().length < 14) {
            exibePopover($(this), "Número inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }
    });

    $('.input-creditcard').focusout(function (event) {
        if ($(this).val() == '') return;

        if ($(this).val().trim().length != 19) {
            exibePopover($(this), "Cartão inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }
    });

    $('.input-email').focusout(function (event) {
        if ($(this).val() == '') return;

        if (!validaEmail($(this).val().trim())) {
            exibePopover($(this), "E-mail inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }
        else {
            $(this).val($(this).val().toLowerCase().trim());
        }

    });

    $('.input-cep').focusout(function (event) {
        if ($(this).val() == '') return;

        if ($(this).val().trim().length != 9) {
            exibePopover($(this), "CEP inválido");

            if ($(this).attr('data-required') !== undefined) {
                if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                    exibeError($(this), true);
                }
            }
        }
    });

    $('.form-control').focusout(function (event) {
        if (!isNullOrEmpty($(this).val()))
            $(this).val($(this).val().trim());
    });

    // todos os controles para validação
    $('.form-control').keyup(function (event) {
        if ($(this).attr('data-required') !== undefined) {
            if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                exibeError($(this), false);
            }
        }
    });

    //// todos os controles para validação
    //$('.form-control').keypress(function (e) {
    //    var key = (window.event) ? event.key : e.key;
    //    if (key === undefined) {
    //        var code = event.charCode || event.keyCode;
    //        key = String.fromCharCode(code);
    //    }

    //    var obj = (window.event) ? event.currentTarget : e.currentTarget;
    //    if ($(obj).val().trim() == "" && key.trim() == "")
    //        return false;

    //    if ($(this).attr('class').indexOf("input-email") > -1)
    //        return isKeyEmail(e);
    //    else if ($(this).attr('class').indexOf("input-alphanumeric") > -1)
    //        return isKeyAlphanumeric(e);
    //        
    //});

    // todos os controles para validação
    $('.form-control').change(function (event) {
        if ($(this).attr('data-required') !== undefined) {
            if ($(this).attr('data-required') == "" || $(this).attr('data-required').toLowerCase() != "false") {
                exibeError($(this), false);
            }
        }
    });

});

function retornaValor(valor) {
    var n = 2;
    var x = 3;
    var s = '.';
    var c = ',';

    var valor = parseFloat(valor);

    if (isNaN(valor)) {
        return '';
    }

    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = valor.toFixed(Math.max(0, ~ ~n));

    var ret = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));

    return ret;

};

function retornaFloat(valor) {
    var valor = valor.toString();
    valor = valor.replace(".", "").replace(".", "").replace(".", "").replace(",", ".");

    return parseFloat(valor);
};

function retornaNumerico(valor) {
    return valor.replace(/[^\d]+/g, '');
}


function CallAjaxJson(url, paramJson, async, sucessCallBack, errorCallBack) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: paramJson,
        dataType: "json",
        async: async,
        success: sucessCallBack,
        error: errorCallBack
    });
}

function exibePopover(control, tooltip) {
    control.popover({ trigger: "manual", content: tooltip, placement: "bottom", html: true });
    control.popover('show');
    setTimeout(function () { control.popover('destroy') }, 5000);

}
                
function exibeCampoObrigatorio(control, tooltip) {
    exibeError(control, true);
    if (tooltip === undefined || tooltip == null && tooltip == "")
        tooltip = "Campo obrigatório";

    exibePopover(control, tooltip);
    
}

function exibeError(control, erro) {

    var div_group = control.closest('div[class^="form-group"]');

    if (erro) {
        // configuramos o estilo default
        div_group.addClass("has-error");
        div_group.find('label').attr('for', 'inputError');
        div_group.find('label').attr('class', 'control-label');

    }
    else {
        // configuramos o estilo default
        div_group.removeClass("has-error");
        div_group.find('label').removeAttr('for');
        div_group.find('label').removeAttr('class');

        control.popover('destroy');
    }
}

function somenteNumerico(e) {
    
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58)) return true;
    else {
        if (tecla == 8 || tecla == 0) return true;
        else return false;
    }
}

function isNumeric(num) {

    //num = num.replace(".", "").replace(".", "").replace(".", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace("-", "").replace("/", "");
    //var map = { ".": "", " ": "", "(": "", ")": "", "/": "", "-": "" };
    num = num.replace(/[\W\[\] ]/g, function (a) {
        return "";
    });

    if (/[^0-9]/.test(num)) {
        return false;
    }
    return true;
}


function isKeyAlphanumeric(event) {
  return !(!isKeyNumeric(event) && !isKeyAlpha(event))
}

function isKeyAlphanumeric2(event) {
    var key = event.key;
    
    if (key === undefined) {
        var code = event.charCode || event.keyCode;
        key = String.fromCharCode(code);
    }

    var allowedSpecialKeys = '#Tab#ArrowLeft#ArrowRight#ArrowUp#ArrowDown#End#Home#Backspace#Delete#';
    if (allowedSpecialKeys.indexOf('#' + key + '#') > -1) {
        return true;
    }

    if (/[^a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑA()-Z0-9 ]/.test(key)) {
        return false;
    }
    return true;
}

function isKeyNumeric(event) {
    var key = event.key;
    
    if (key === undefined) {
        var code = event.charCode || event.keyCode;
        key = String.fromCharCode(code);
    }

    var allowedSpecialKeys = '#Tab#ArrowLeft#ArrowRight#ArrowUp#ArrowDown#End#Home#Backspace#Delete#';
    
    /*IE doesn't fire events for arrow keys, Firefox does*/
    if (allowedSpecialKeys.indexOf('#' + key + '#') > -1) {
        return true;
    }

    if (/[^0-9]/.test(key)) {
        return false;
    }
    return true;
}

function isKeyAlpha(event) {
    var key = event.key;

    if (key === undefined) {
        var code = event.charCode || event.keyCode;
        key = String.fromCharCode(code);
    }

    var allowedSpecialKeys = '#Tab#ArrowLeft#ArrowRight#ArrowUp#ArrowDown#End#Home#Backspace#Delete#';

    /*IE doesn't fire events for arrow keys, Firefox does*/
    if (allowedSpecialKeys.indexOf('#' + key + '#') > -1) {
        return true;
    }

    var obj = event.currentTarget;
    if ($(obj).val().trim() == "" && key.trim() == "")
        return false;

    if (/[^a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑA-Z ]/.test(key)) {
        return false;
    }
    return true;
}

function isKeyEmail(event) {
    var key = event.key;
    
    if (key === undefined) {
        var code = event.charCode || event.keyCode;
        key = String.fromCharCode(code);
    }

    var allowedSpecialKeys = '#Tab#ArrowLeft#ArrowRight#ArrowUp#ArrowDown#End#Home#Backspace#Delete#';

    /*IE doesn't fire events for arrow keys, Firefox does*/
    if (allowedSpecialKeys.indexOf('#' + key + '#') > -1) {
        return true;
    }

    if (/[^a-z.-_@A-Z ]/.test(key)) {
        return false;
    }
    return true;
}

function comparaData(dataInicio, dataFim) {

    dataInicio = dataInicio.split("/");
    var data1 = new Date(dataInicio[2], dataInicio[1] - 1, dataInicio[0]);

    dataFim = dataFim.split("/");
    var data2 = new Date(dataFim[2], dataFim[1] - 1, dataFim[0]);

    if (data1 > data2)
        return false
    else
        return true

}

function comparaDataAtual(data) {

    var dataArray = data.split("/");
    var data1 = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);

    var data2 = new Date();
    data2.setHours(0, 0, 0, 0);

    if (data1 >= data2)
        return false
    else
        return true

}

function validaData(data) {
    if (data == "") {
        return false;
    }

    var currVal = data;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    var dtDay = dtArray[1];
    var dtMonth = dtArray[3];
    var dtYear = dtArray[5];

    var mydate = new Date();
    var year = mydate.getYear();
    if (year < 1000)
        year += 1900;
    var anoAtual = year;

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }

    //var idade = anoAtual - dtYear;
    //if (idade < 18) {
    //    return false;
    //}

    return true;
}

function validaData2() {
    var aAr = typeof (arguments[0]) == "string" ? arguments[0].split("/") : arguments,
        lDay = parseInt(aAr[0]), lMon = parseInt(aAr[1]), lYear = parseInt(aAr[2]),
        BiY = (lYear % 4 == 0 && lYear % 100 != 0) || lYear % 400 == 0,
        MT = [1, BiY ? -1 : -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
    return lMon <= 12 && lMon > 0 && lDay <= MT[lMon - 1] + 30 && lDay > 0;
}

function validaCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito 
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function validaCnpj(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

function validaEmail(email) {
    var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
    if (er.exec(email)) return true;
    else return false;
}

function formataNome(str) {
    str = str.replace(/\s\s+/g, ' ').replace(/  +/g, ' ').trim();

    return str.replace(/\w\S*/g, function (txt) {
        //console.log(txt);
        txt = txt.toLowerCase();
        var myarr = ["da", "de", "di", "do", "du", "das", "dos", "el", "del", "der", "la", "le", "les", "los", "van", "von" ];
        if (myarr.indexOf(txt) > -1)
            return txt;
        else
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

        //string.replace(/\s\s+/g, ' ');

    });
}

function removerAcentos(key) {
    var map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };

    return key.replace(/[\W\[\] ]/g, function (a) { return map[a] || a });

}


function request(name) {
    var url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    
    if (!results) return '';
    
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));

}

function isNullOrEmpty(str) {
    return (!str || 0 === str.trim().length);
}

function toLocaleDateString(date) {
    var localDate = new Date(date);
    localDate = new Date(localDate.valueOf() + localDate.getTimezoneOffset() * 60000);

    var ret = localDate.toLocaleDateString();

    if (ret.indexOf('-') > -1) {
        var aux = ret.split("-");

        var day = ("0" + aux[2]).slice(-2);
        var month = ("0" + aux[1]).slice(-2);
        var year = aux[0];
        
        ret = day + "/" + month + "/" + year;

    }

    return ret.replace(/[^\w\d\/s]/g, "")

}

function toFormatString(date) {
    
    var ret = date.toLocaleDateString();

    if (ret.indexOf('-') > -1) {
        var aux = ret.split("-");

        var day = ("0" + aux[2]).slice(-2);
        var month = ("0" + aux[1]).slice(-2);
        var year = aux[0];

        ret = day + "/" + month + "/" + year;

    }

    return ret.replace(/[^\w\d\/s]/g, "")

}

function showDialog(titulo, mensagem, onClose) {
    $('<div>' + mensagem + '</div>').dialog({
        title: titulo,
        closeText: 'Fechar',
        modal: true,
        resizable: false,
        draggable: false,
        dialogClass: "dialogPositionFixed",
        close: function (event, ui) {
            if (typeof (onClose) == "string" && onClose != "") {
                window.location.href = onClose;
            } else if (typeof (onClose) == "function") {
                onClose();
            }
        },
        buttons:
        {
            "Ok": function () {
                $(this).dialog('close');
            }
        }
    });
}

