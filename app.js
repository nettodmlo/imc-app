const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/users/imc', (req, res) => {
    const { nome, peso, altura } = req.body;

    if (!nome || !peso || !altura) {
        return res.status(400).json({ error: 'Nome, peso e altura são obrigatórios.' });
    }

    const imc = peso / (altura * altura);
    let situacao = '';

    if (imc < 18.5) {
        situacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 24.9) {
        situacao = 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
        situacao = 'Sobrepeso';
    } else if (imc >= 30 && imc < 34.9) {
        situacao = 'Obesidade grau I';
    } else if (imc >= 35 && imc < 39.9) {
        situacao = 'Obesidade grau II (severa)';
    } else {
        situacao = 'Obesidade grau III (mórbida)';
    }

    res.json({ nome, imc: imc.toFixed(2), situacao });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
