document.getElementById('generateSRT').addEventListener('click', function() {
    const senhaInput = document.getElementById('senha').value;

    // Chama a função validarSenha para verificar a senha
    if (!validarSenha(senhaInput)) {
        alert('Senha incorreta! Para comprar acesso vitalício, entre em contato.');
        return; // Interrompe a execução se a senha estiver incorreta
    }

    const inputText = document.getElementById('inputText').value;
    const duration = parseInt(document.getElementById('duration').value) || 4; // Pega o valor da duração ou usa 4 como padrão
    
    const sentences = inputText.split(/(?<=[.!?])/); // Divide o texto em frases usando pontuação
    let srtOutput = '';
    let startTime = 0;

    sentences.forEach((sentence, index) => {
        const words = sentence.trim().split(' '); // Divide a frase em palavras
        let currentSentence = '';
        let wordCount = 0;

        // Adiciona palavras até que o tempo total exceda a duração
        words.forEach(word => {
            currentSentence += (currentSentence ? ' ' : '') + word; // Adiciona espaço se não for a primeira palavra
            wordCount++;
            
            if (wordCount > 5) { // Ajuste aqui para mudar a quantidade de palavras por legenda
                const start = new Date(startTime * 1000).toISOString().substr(11, 8) + ',000';
                const end = new Date((startTime + duration) * 1000).toISOString().substr(11, 8) + ',000';
                
                srtOutput += `${Math.floor(startTime / duration) + 1}\n${start} --> ${end}\n${currentSentence.trim()}\n\n`;
                startTime += duration;
                currentSentence = '';
                wordCount = 0;
            }
        });

        // Adiciona a última parte da frase, se houver
        if (currentSentence) {
            const start = new Date(startTime * 1000).toISOString().substr(11, 8) + ',000';
            const end = new Date((startTime + duration) * 1000).toISOString().substr(11, 8) + ',000';
            
            srtOutput += `${Math.floor(startTime / duration) + 1}\n${start} --> ${end}\n${currentSentence.trim()}\n\n`;
        }
    });

    document.getElementById('outputSRT').value = srtOutput.trim();
});

document.getElementById('downloadSRT').addEventListener('click', function() {
    const outputSRT = document.getElementById('outputSRT').value;
    const blob = new Blob([outputSRT], { type: 'text/srt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legendas.srt';
    a.click();
    URL.revokeObjectURL(url);
});
