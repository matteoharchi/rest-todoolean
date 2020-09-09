$(document).ready(function(){
    getData();
    $("#enter").click(function(){
        var newNote = $(".newnote").val();
        createElement(newNote);
    })

    $(document).on('click', 'i.fa-trash', function(){
        var elemento = $(this);
        var idtoDo = elemento.parent().attr('data-id');
        deleteElement(idtoDo);
    })
});

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
                $("#list").empty();
                getData();
            }
        })
}

function deleteElement(id){
    $.ajax(
        {
            url: "http://157.230.17.132:3016/todos/"+id,
            method: "DELETE",
            success: function(risposta){
                $("#list").empty();
                getData();
            }
        }
    )
}
// function updateAndPrint(input){

//     $.ajax(
//         {
//             url: "http://157.230.17.132:3016/todos",
//             method: "UPDATE",
//             data: {
//                 text: input,
//             },success: function(){

//             }
//     })
// }
