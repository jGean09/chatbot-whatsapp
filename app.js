const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

// Variável para controlar o estado do bot
let botAtivo = false;

// Objeto para armazenar os contatos que já receberam a mensagem
let contatosNotificados = {};

// Inicializa uma nova sessão do WhatsApp
wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      // Exibe o QR code no terminal em formato ASCII (opcional)
      console.log(asciiQR);

      // Expressão regular para decodificar o QR code base64
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      // Verifica se a string base64 está correta
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }

      // Decodifica o QR code
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      // Salva o QR code como um arquivo de imagem
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
    logQR: false, // Desativa o log do QR code no console
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

// Função principal que inicia a sessão do WhatsApp
function start(client) {
  // Configura um ouvinte para receber mensagens
  client.onMessage((message) => {
    // Verifica se a mensagem é de um grupo
    if (message.isGroupMsg) {
      console.log(`Mensagem do grupo ${message.chat.name}: ${message.body}`);
      return; // Ignora mensagens de grupo
    }

    // Ativa o bot ao receber a mensagem "ativar bot"
    if (message.body.toLowerCase() === 'ativar bot') {
      botAtivo = true;
      client.sendText(message.from, 'Bot ativado!');
      return;
    }
    if (message.body.toLowerCase() === 'desativar bot') {
      botAtivo = false;
      client.sendText(message.from, 'Bot desativado!');
      return;
    }
    // Verifica se o bot está ativo
    if (!botAtivo) {
      return;
    }

    // Verifica se a mensagem recebida é "oi" (em qualquer capitalização) e se o contato ainda não foi notificado
    if (message.body.toLowerCase() === 'oi' && !contatosNotificados[message.from]) {
      client
        .sendText(message.from, 'Olá, como posso te ajudar?')
        .then((result) => {
          console.log('Resultado: ', result); // Retorno de sucesso
          contatosNotificados[message.from] = true; // Marca o contato como notificado
        })
        .catch((error) => {
          console.error('Erro ao enviar: ', error); // Retorno de erro
        });
      return;
    }

    // Verifica se a mensagem não é vazia e se o contato ainda não foi notificado
    if (!contatosNotificados[message.from]) {
      client
        .sendText(message.from, 'Olá, digite uma das opções abaixo (mensagem de teste do bot)')
        .then((result) => {
          console.log('Resultado: ', result); // Retorno de sucesso
          contatosNotificados[message.from] = true; // Marca o contato como notificado
        })
        .catch((error) => {
          console.error('Erro ao enviar: ', error); // Retorno de erro
        });
    }
  });
}
