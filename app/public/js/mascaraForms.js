$(document).ready(function(){
    $('.cpf').mask("000.000.000-00");
    $('.telefone').mask("(00)00000-0000");
    $('.email').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });
})