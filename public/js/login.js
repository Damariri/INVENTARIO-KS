$(document).ready(function(){

    $("#continuarBoton").on("click", function(){
        let invalido = "";
        while (true){
            if ($("#usuario").val() == ""){
                invalido = "Verificar usuario.";
                break;
            }
            if($("#contrasena").val() == ""){
                invalido = "Verificar contraseña.";
                break;
            }
            break;
        }
        if(invalido == ""){
            $.ajax({
                url: '/login', 
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    usuario: $("#usuario").val(),
                    contrasena: $("#contrasena").val()
                }),
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    if(data.Exito){
                        // Mandar a pagina principal
                        console.log("Solicitud POST exitosa");
                        window.location.href = 'index'; 
                    }else{
                        $(".mostrarError").css({
                            "opacity": "1",
                            "margin-top": "0px"
                        });
                        $(".mostrarError").text("usuario o contraseña inválidos.");
                        console.error("Solicitud POST DENEGADA");
                    }
                    $(".mostrarError").text(data.msg);
                    $(".mostrarError").css({
                        "opacity": "1",
                        "margin-top": "0px"
                    });
                    
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }else{
            $(".mostrarError").text(invalido);
            $(".mostrarError").css({
                "opacity": "1",
                "margin-top": "0px"
            });
        }
    });
});