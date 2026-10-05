# Ficou Gata

Landing page da Ficou Gata, loja de roupas femininas com foco em atitude e preço justo. O WhatsApp é o canal principal de venda: a página apresenta as peças e leva a cliente direto para a conversa com a loja.

Site publicado: https://ficou-gata-landing.vercel.app/

## Categorias de produto

A loja trabalha só com roupas, sem acessórios. Categorias na vitrine hoje:

- Camisas
- Blusinhas
- Conjuntos
- T-shirts
- Bodys
- Calças

Vestidos e Saias entram na vitrine assim que as peças chegarem.

## Stack

- HTML, CSS e JavaScript puro, sem framework e sem etapa de build
- Hospedagem na Vercel, com deploy automático a cada push na branch `main`
- Three.js (via CDN) apenas para a animação de anéis da chamada final
- Google Fonts para as fontes Fraunces e Jost

## Identidade visual

| Elemento | Valor |
|---|---|
| Fundo | marfim `#FAF6F2` |
| Destaque | rosa envelhecido `#C98B93` |
| Cor de assinatura | vinho `#6E2A38` e vinho escuro `#4E1D28` |
| Títulos | Fraunces |
| Texto | Jost |

As cores ficam centralizadas como variáveis CSS (`--marfim`, `--rosa`, `--vinho`, `--vinho-escuro`) no início de `css/style.css`.

## Estrutura da página

Em ordem, de cima para baixo:

1. Cabeçalho fixo, com a logo (clicar volta ao topo), menu das categorias e botão de WhatsApp sempre visível
2. Hero, com título animado e carrossel de fotos das peças
3. Faixa em movimento (marquee) com os diferenciais da marca
4. Vitrine de categorias, cada uma em um carrossel horizontal de fotos
5. Bloco de diferenciais: qualidade, preço justo e atendimento
6. Depoimentos de clientes
7. Chamada final para o WhatsApp
8. Formulário de contato
9. Rodapé com contatos, horário de funcionamento e Instagram

## Funcionalidades

- **Formulário de contato:** valida os campos no navegador e grava cada envio em uma planilha do Google Sheets, por meio de um Web App do Google Apps Script.
- **Botão de WhatsApp fixo:** fica no canto da tela em qualquer ponto da página, além do botão no cabeçalho.
- **Sacola (lista de interesse):** a cliente adiciona as peças que gostou e, ao finalizar, o site monta uma mensagem pronta com a lista e abre a conversa no WhatsApp.
- **Visualizador de fotos:** cada peça da vitrine pode ser aberta em tela cheia.
- **Prévia de link:** meta tags Open Graph com imagem própria, para o link aparecer com a logo quando compartilhado no WhatsApp e em redes sociais.
- **Acessibilidade de movimento:** quem ativa "reduzir movimento" no sistema vê as animações simplificadas ou paradas.

## Estrutura de arquivos

```
ficou-gata-landing/
├── index.html              página única
├── css/
│   └── style.css           estilos e variáveis de cor
├── js/
│   └── script.js           vitrine, sacola, formulário e animações
├── imagens/
│   ├── camisas/ blusinhas/ conjuntos/ tshirts/ bodys/ calcas/
│   ├── hero/ e logo/       logo, favicon e ícone para iPhone
│   └── og/                 imagem de prévia de link
└── process_ficou_gata.py   script auxiliar de tratamento de fotos (não é usado pelo site)
```

## Como rodar localmente

Não há dependências para instalar nem build. Basta abrir o arquivo `index.html` no navegador.

Para recarregar automaticamente enquanto edita, dá para usar a extensão Live Server do VS Code (botão direito no `index.html` e "Open with Live Server").

As fontes e o Three.js vêm de CDN, então é preciso estar conectado à internet para a página aparecer completa.

## Configuração

Dois valores em `js/script.js` ligam o site aos canais da loja:

- `WHATS_NUMBER`: número do WhatsApp usado pela sacola. Os links fixos de WhatsApp ficam no `index.html`.
- `CONTATO_SHEET_URL`: endereço do Web App do Google Apps Script que recebe o formulário. Para usar outra planilha, publique um novo Web App e troque esse valor.

## Créditos

Projeto desenvolvido por Alex Dutra, com apoio de inteligência artificial (Claude, da Anthropic) durante o processo de criação e nos ajustes do site.
