# 🌿 EcoDrive

**Armazene com consciência. Use com liberdade.**

O **EcoDrive** é um sistema de armazenamento pessoal open source baseado em buckets (como os da AWS S3), que organiza arquivos em _tiers de armazenamento_ para otimizar espaço e reduzir custos. Ideal para quem lida com muitos arquivos e precisa de uma solução eficiente, elegante e personalizável.

## ✨ Visão do Projeto

O EcoDrive nasceu da necessidade pessoal de guardar muitos arquivos sem sobrecarregar o SSD nem depender de soluções comerciais e caras. Criado com amor, ele busca unir eficiência, economia e liberdade.
Mais que um drive, o EcoDrive é um lar consciente para os seus dados.

## 🚀 Funcionalidades

- 📁 Armazenamento de arquivos com categorização por tier
- 🧠 Tiers personalizáveis conforme frequência de acesso
- 🌐 Integração com AWS S3 (outros provedores em breve)
- 📊 Painel simples para gerenciar buckets e arquivos
- 🔐 Estrutura pensada para escalabilidade e segurança

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express** (backend API)
- **React.js** com **Chakra UI** (frontend)

## 🧪 Como rodar localmente

```bash
# Clone o repositório
git  https://github.com/Scientistt/ecoDrive-web-reactjs.git
cd  ecoDrive-web-reactjs

# Instale as dependências
npm  install

# Configure suas variáveis de ambiente
cp  .env.example  .env

# edite o arquivo .env com suas chaves da AWS
# Rode o projeto
npm  run  dev
```

## 🔐 Variáveis de ambiente

No arquivo `.env`:

```bash
NEXT_PUBLIC_API_HOST=...
NEXT_PUBLIC_API_CALL_TIMEOUT=...
```

## 🧩 Repositório da API (Backend)
Este repositório contém apenas o frontend do EcoDrive.
Para que tudo funcione corretamente, é necessário rodar também a API do EcoDrive, que é responsável pela integração com os buckets:

👉[github.com/Scientistt/ecoDrive-api-nodejs](https://github.com/Scientistt/ecoDrive-api-nodejs)

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.  
Você é livre para usar, modificar e distribuir desde que preserve os créditos e a licença original.  
É uma forma simples e generosa de manter o projeto verdadeiramente aberto.

## 💚 Contribuindo

Se você acredita na ideia de um mundo mais acessível e sustentável digitalmente, contribua com o EcoDrive:

- 🌟 Dê uma estrela no repositório
- 🐛 Reporte bugs ou sugestões através das issues
- 🛠️ Faça um fork e envie pull requests
- 📢 Compartilhe com pessoas que possam se beneficiar

## 🙏 Agradecimentos

Agradeço a todos que compartilham da ideia de usar a tecnologia como ferramenta de bem, economia e utilidade real. **Não se trata de quantos ajudam, mas de quantos fazem o bem com o coração.**

Com carinho,

<h3 align="center">
  <a href="https://github.com/Scientistt" target="_blank">Fabio Vitor</a><br>
  @Scientistt
</h3>
<p align="center">
  Criador e mantenedor do <strong>🌿EcoDrive</strong>
</p>
