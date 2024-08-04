const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    logQR: false,
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));


  function start(client) {
    client.onMessage((message) => {
      if (message.isGroupMsg) {
        console.log(`Mensagem do grupo ${message.chat.name}: ${message.body}`);
        return; // Ignora mensagens de grupo
      }
  
      if (message.body.toLocaleLowerCase === 'oi') {
        client
          .sendText(message.from, 'Olá, como posso te ajudar?')
          .then((result) => {
            console.log('Resultado: ', result); // Retorno de sucesso
          })
          .catch((error) => {
            console.error('Erro ao enviar: ', error); // Retorno de erro
          });
      }

      if (message.body.toLocaleLowerCase()) {
        client
          .sendText(message.from, 'Olá, digite uma das opções a baixo (mensagem de teste do bot)')
          .then((result) => {
            console.log('Resultado: ', result); // Retorno de sucesso
          })
          .catch((error) => {
            console.error('Erro ao enviar: ', error); // Retorno de erro
          });
      }
    });
  }
  