# chatbot-whatsapp

## Descrição Sobre o Projeto

Este projeto é um chatbot para WhatsApp que utiliza a biblioteca [WPPConnect](https://github.com/wppconnect-team/wppconnect) para automatizar interações via WhatsApp Web. O bot pode responder a mensagens, ser ativado e desativado, e lembrar quais contatos já foram notificados.

**Estou apenas testando as ferramentas e ainda não aprofundei meus conhecimentos nesta área.**


## 💻Ferramentas Utilizadas

- **Node.js**: Ambiente de execução para JavaScript, utilizado para rodar o código do bot.
- **[WPPConnect](https://github.com/wppconnect-team/wppconnect)**: Biblioteca que permite a automação de interações com o WhatsApp via Web. É usada para criar sessões, enviar e receber mensagens, e gerenciar o fluxo de trabalho do bot.
- **`fs` (File System)**: Módulo do Node.js utilizado para manipulação de arquivos. No projeto, ele é usado para salvar o QR code necessário para autenticação.

## Funcionalidades

- **Ativar/Desativar o Bot**: Envie "ativar bot" para ativar ou "desativar bot" para desativar o bot.
- **Respostas Automáticas**: O bot responde "Oi" apenas uma vez para cada contato e envia uma mensagem padrão para outras interações.
- **Ignorar Mensagens de Grupo**: O bot não responde a mensagens enviadas em grupos.


## Como Executar

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/jGean09/aulaGIT.git
