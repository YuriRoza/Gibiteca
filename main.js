function adicionarGibi(){
    //entrada
    var inNome = document.querySelector("#inNome");
    var inRoteirista = document.querySelector("#inRoteirista");
    var inDesenhista = document.querySelector("#inDesenhista");
    var inEditora = document.querySelector("#inEditora");
    var inEditoraBr = document.querySelector("#inEditoraBr");
    var inPaginas = document.querySelector("#inPaginas");

    //seta os itens
    var nome = inNome.value;
    var roteirista = inRoteirista.value;
    var desenhista = inDesenhista.value;
    var editora = inEditora.value;
    var editoraBr = inEditoraBr.value;
    var paginas = inPaginas.value;

    //necessário preencher tudo
    if (nome == "" || roteirista == "" || desenhista == "" || editora == "" || editoraBr == "" || paginas == ""){
        alert("Por favor, preencha todos os dados corretamente !");
        inNome.focus();
        return;
    }

    var tbGibis = document.querySelector("#tbGibis");

    inserirLinha(tbGibis, nome, roteirista, desenhista, editora, editoraBr, paginas); //insere as linhas na tabela

    salvarGibi(nome, roteirista, desenhista, editora, editoraBr, paginas); //função de salvar no local storage

    //limpa o formulário e seta o focus no nome
    inNome.value = "";
    inRoteirista.value = "";
    inDesenhista.value = "";
    inEditora.value = "";
    inEditoraBr.value = "";
    inPaginas.value = "";
    inNome.focus();
}

const btAdicionar = document.querySelector('#btAdicionar');
btAdicionar.addEventListener("click", adicionarGibi);


//função de adicionar as linhas
function inserirLinha(tabela, nome, roteirista, desenhista, editora, editoraBr, paginas){
    //adiciona linha ao final da tabela
    var linha = tabela.insertRow(-1);
    //seta as colunas
    var col1 = linha.insertCell(0);
    var col2 = linha.insertCell(1);
    var col3 = linha.insertCell(2);
    var col4 = linha.insertCell(3);
    var col5 = linha.insertCell(4);
    var col6 = linha.insertCell(5);
    var col7 = linha.insertCell(6);

    //passa os conteúdos para cada célula da tabela
    col1.textContent = nome;
    col2.textContent = roteirista;
    col3.textContent = desenhista;
    col4.textContent = editora;
    col5.textContent = editoraBr;
    col6.textContent = paginas;
    col7.innerHTML = "<input type='checkbox'>";
}

function salvarGibi(nome, roteirista, desenhista, editora, editoraBr, paginas){
    //recupera os dados de localStorage
    if (localStorage.getItem("gibisNome")){
        var gibisNome = localStorage.getItem("gibisNome") + ";" + nome;
        var gibisRoteirista = localStorage.getItem("gibisRoteirista") + ";" + roteirista;
        var gibisDesenhista = localStorage.getItem("gibisDesenhista") + ";" + desenhista;
        var gibisEditora = localStorage.getItem("gibisEditora") + ";" + editora;
        var gibisEditoraBr = localStorage.getItem("gibisEditoraBr") + ";" + editoraBr;
        var gibisPaginas = localStorage.getItem("gibisPaginas") + ";" + paginas;
        //grava
        localStorage.setItem("gibisNome", gibisNome);
        localStorage.setItem("gibisRoteirista", gibisRoteirista);
        localStorage.setItem("gibisDesenhista", gibisDesenhista);
        localStorage.setItem("gibisEditora", gibisEditora);
        localStorage.setItem("gibisEditoraBr", gibisEditoraBr);
        localStorage.setItem("gibisPaginas", gibisPaginas);
    } else {  //salva se for a primeira inclusão
        localStorage.setItem("gibisNome", nome);
        localStorage.setItem("gibisRoteirista", roteirista);
        localStorage.setItem("gibisDesenhista", desenhista);
        localStorage.setItem("gibisEditora", editora);
        localStorage.setItem("gibisEditoraBr", editoraBr);
        localStorage.setItem("gibisPaginas", paginas);
    }
}

function restaura(){

    if(localStorage.getItem("gibisNome")){
        var nomes = localStorage.getItem("gibisNome").split(";");
        var roteiristas = localStorage.getItem("gibisRoteirista").split(";");
        var desenhistas = localStorage.getItem("gibisDesenhista").split(";");
        var editoras = localStorage.getItem("gibisEditora").split(";");
        var editorabrs = localStorage.getItem("gibisEditoraBr").split(";");
        var paginass = localStorage.getItem("gibisPaginas").split(";");

        var tbGibis = document.querySelector("#tbGibis");

        var tam = nomes.length;
        for (var i = 0; i < tam; i++){
            inserirLinha(tbGibis, nomes[i], roteiristas[i], desenhistas[i], editoras[i], editorabrs[i], paginass[i]);
        }
    }
}
restaura();

var checkTodos = document.querySelector("#checkTodos"); //marca tudo

checkTodos.addEventListener("change", function(){
    var tbGibis = document.querySelector("#tbGibis");
    var checkExcluir = tbGibis.getElementsByTagName("input");

    var status = checkTodos.checked;

    var tam = checkExcluir.length;

    for(var i = 1; i < tam; i++){
        checkExcluir[i].checked = status
    }
    
})


function excluir(){
    var tbGibis = document.querySelector("#tbGibis");
    var checkExcluir = tbGibis.getElementsByTagName("input");

    var selecao = false;
    var tam = checkExcluir.length;

    for(var i = 1; i < tam; i++){
        if (checkExcluir[i].checked){
            selecao = true;
            break;
        }
    }

    if (!selecao){
        alert("Por favor, selecione algo para excluir");
        return;
    }

    if (confirm("Quer mesmo exlcuir os gibis selecionados da lista?")){
        localStorage.removeItem("gibisNome");
        localStorage.removeItem("gibisRoteirista");
        localStorage.removeItem("gibisDesenhista");
        localStorage.removeItem("gibisEditora");
        localStorage.removeItem("gibisEditoraBr");
        localStorage.removeItem("gibisPaginas");

        var tam = checkExcluir.length
        for (var i = 1; i < tam; i++){
            if(!checkExcluir[i].checked){
                nome = tbGibis.rows[i].cells[0].textContent;
                roteirista = tbGibis.rows[i].cells[1].textContent;
                desenhista = tbGibis.rows[i].cells[2].textContent;
                editora = tbGibis.rows[i].cells[3].textContent;
                editoraBr = tbGibis.rows[i].cells[4].textContent;
                paginas = tbGibis.rows[i].cells[5].textContent;

                salvarGibi(nome, roteirista, desenhista, editora, editoraBr, paginas);
            }
        }

        for (i = tam -1; i > 0; i--){
            if(checkExcluir[i].checked){
                tbGibis.deleteRow(i);
            }   
        }
        checkExcluir[0].checked = false;
        }
    }

    const btExcluir = document.querySelector('#btExcluir');
    btExcluir.addEventListener("click", excluir);

function hora(){
    var msg = document.querySelector("#msg");
    var data = new Date();
    var hora = data.getHours();
    var minutos = data.getMinutes();

    msg.innerHTML = `Agora são ${hora}:${minutos}`
}