$(document).ready(function(){
    //faccio partire la funzione che mi inserisce le voci
    getData();
    //premo tasto enter o invio e creo nuova voce
    $("#enter").click(function(){
        var newNote = $(".newnote").val();
        createElement(newNote);
    });
    $(document).on('keydown', ".newnote", function(){
        if (event.which == 13 || event.keyCode == 13) {
            var newNote = $(".newnote").val();
            createElement(newNote);
        }
    })
//al click del trash cancella la nota corrispondente
    $(document).on('click', 'i.fa-trash', function(){
        var elemento = $(this);
        var idtoDo = elemento.parent().attr('data-id');
        deleteElement(idtoDo);
    });
// quando clicco su una voce questa diventa una barra di input+tasto
    $(document).on('click', '#note', function(){
        var elemento = $(this);
        var idtoDo = elemento.parent().attr('data-id');
        var edit ='<input class="editnote" type="text" name="" value="">' + '<button id="edit" type="button" name="button">Edit</button>';
        elemento.replaceWith(edit);
    });
// quando clicco su edit o premo invio modifica la voce con contenuto input
    $(document).on('click', '#edit', function(){
        var edit = $(this);
        var newNote = $(".editnote").val();
        var idtoDo = edit.parent().attr('data-id');
        edit.replaceWith('<span id="note">{{text}}</span>');
        updateElement(newNote, idtoDo, edit);
    });

    $(document).on('keydown', '.editnote', function(){
        if (event.which == 13 || event.keyCode == 13) {
            var edit = $(".editnote");
            var newNote = $(".editnote").val();
            var idtoDo = edit.parent().attr('data-id');
            edit.replaceWith('<span id="note">{{text}}</span>');
            updateElement(newNote, idtoDo, edit);
        };
    });
//si sarebbe potuto fare anche con una classe hidden da dare prima
//alla voce e poi alla barra di input
});


//FUNZIONI

//funzione che esegue chiamata ajax e stampa todolist
function getData(){
    var source = $("#template").html();
    var template = Handlebars.compile(source);
    $.ajax(
        {
            url: "http://157.230.17.132:3016/todos",
            method: "GET",
            success: function(risposta){
                for (var i = 0; i < risposta.length; i++) {
                    var todo = {
                        id: risposta[i].id,
                        text: risposta[i].text,
                    }
                    var html = template(todo);
                    $("#list").append(html);
                }
            }
        }
    )
};
//funzione che crea la nuova voce nella todolist e refresha la lista
function createElement(input){
    $.ajax(
        {
            url: "http://157.230.17.132:3016/todos",
            method: "POST",
            data: {
                text: input,
            },
            success: function(risposta){
                var newOne = risposta.text;
                replace();
            }
        })
}
//funzione che cancella l'elemento selezionato e refresha la todolist
function deleteElement(id){
    $.ajax(
        {
            url: "http://157.230.17.132:3016/todos/"+id,
            method: "DELETE",
            success: function(risposta){
                replace();
            }
        }
    )
}

//funzione modifica nota

function updateElement(edited, id, bar){
    $.ajax(
        {
            url: "http://157.230.17.132:3016/todos/"+id,
            method: "PATCH",
            data: {
                text: edited,
            },
            success: function(risposta){
                replace();
            },
        }
    )
}

//refresh della lista
function replace(){
    $("#list").empty();
    getData();
}
