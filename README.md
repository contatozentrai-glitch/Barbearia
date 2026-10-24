# Barbearia Central

Protótipo visual responsivo, desenvolvido em HTML, CSS e JavaScript, sem dependências de build.

Abra `index.html` no navegador ou execute `node server.cjs` e acesse http://127.0.0.1:4185.

Identidade conceitual: papel, carvão, vermelho queimado; Barlow Condensed, DM Sans e serifas editoriais. Fotografias ilustrativas do Unsplash armazenadas localmente. Fontes do Google Fonts armazenadas localmente.

Os botões de agendamento abrem o WhatsApp com uma mensagem pronta sobre o serviço ou plano selecionado. WhatsApp e Instagram ficam fixos no canto inferior direito. Configure os contatos reais em `script.js (objeto BARBEARIA_CONTACTS no início do arquivo)`; enquanto estiverem vazios, os botões informam que o contato ainda não foi fornecido. Não há formulário nem confirmação de reserva no site. Nome, textos e imagens são conceituais; substituir pelos dados da barbearia antes de publicar. Os preços dos serviços (R$ 50, R$ 35, R$ 80) e dos planos mensais (1 corte por R$ 45, 2 cortes por R$ 85, ilimitado por R$ 149) são ilustrativos e identificados assim na página. Nenhum depoimento, endereço ou avaliação fictícios foram adicionados. A faixa tem movimento contínuo com controle de pausa e respeita a preferência de movimento reduzido.

Fontes das fotografias:
- https://images.unsplash.com/photo-1503951914875-452162b0f3f1
- https://images.unsplash.com/photo-1621605815971-fbc98d665033
- https://images.unsplash.com/photo-1599351431202-1e0f0137899a

## Estrutura

```text
index.html
style.css
script.js
assets/
README.md
.gitignore
server.cjs       # servidor local opcional
```

As imagens, o favicon e as fontes locais ficam em `assets/`. O CSS e o JavaScript estão consolidados, sem etapa de compilação.

Para hospedar, publique a raiz do projeto. `server.cjs` serve apenas para a prévia local e não é necessário na hospedagem estática.
