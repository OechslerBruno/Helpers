	function (dataDe, dataAte) {
        //console.log(dataDe);
        //console.log(dataAte);
        if (dataDe == "") {
            swal("Atenção", "Informe a 'Data de'", "warning");
            return false;
        }
        else if (dataAte == "") {
            swal("Atenção", "Informe a 'Data até'", "warning");
            return false;
        }
        else {
            var dataInicio = FormataData(dataDe);
            var dataFim = FormataData(dataAte);
            if (dataInicio > dataFim) {
                swal("Data informada inválida", "'Data de' não pode ser maior que 'Data até'.", "warning");
                return false;
            }
        }
        return true;
    }

    function FormataData(dataString) {
        var dtSplit = dataString.split('/');
        if (dtSplit.length == 3) return dtSplit[2] + "/" + dtSplit[1] + "/" + dtSplit[0];
    }