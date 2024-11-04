// Lista de senhas válidas
const senhasValidas = ['senha1', 'senha2', 'senha3']; // Adicione mais senhas conforme necessário

// Função para validar a senha
function validarSenha(senhaInput) {
    return senhasValidas.includes(senhaInput);
}
