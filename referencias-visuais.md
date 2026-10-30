# REFERÊNCIAS VISUAIS E IDENTIDADE DO PROJETO
**Portfólio Pessoal de Enrico Pereira Bonato**

Este documento detalha o estudo conceitual, as referências estéticas e as decisões de design adotadas no desenvolvimento do portfólio pessoal de **Enrico Pereira Bonato**. O objetivo central foi conceber uma experiência digital minimalista, elegante, acolhedora e com forte inspiração editorial, refletindo com autenticidade a personalidade calma, sociável e versátil de Enrico.

---

## 1. ANÁLISE DAS REFERÊNCIAS VISUAIS

### Referência 1: Lusion Labs
- **Link:** [https://labs.lusion.co/](https://labs.lusion.co/)
- **Elementos visuais que chamaram atenção:**
  - O cursor interativo orgânico que reage fluidamente aos elementos da página;
  - A revelação suave de fotografias e composições visuais ao interagir com a interface;
  - Microinterações táteis e magnéticas que tornam a navegação cativante sem sobrecarregar a tela.
- **O que foi aproveitado e adaptado:**
  - **Cursor fluido e discreto:** Foi implementado um cursor em duas camadas (um ponto preto central com movimento instantâneo e um anel bege suave com interpolação linear/LERP). Ao sobrevoar links, cartões e botões, o anel expande sutilmente.
  - **Revelação controlada de imagens:** Aplicação de zoom suave (*scale 1.025*) e transições sem distorções ou excessos 3D pesados.
  - **Desativação inteligente:** Em dispositivos móveis ou com tela sensível ao toque, o cursor customizado é desativado nativamente para garantir máxima fluidez e ergonomia.

---

### Referência 2: Bleibtgleich
- **Link:** [https://bleibtgleich.dev/](https://bleibtgleich.dev/)
- **Elementos visuais que chamaram atenção:**
  - Apresentação tipográfica imponente, equilibrada por grandes áreas de respiro;
  - Animações refinadas de entrada durante a rolagem de página;
  - Transições fluidas que conduzem o olhar do usuário com naturalidade.
- **O que foi aproveitado e adaptado:**
  - **Revelação escalonada (*Scroll Reveal*):** Utilização de `IntersectionObserver` com curva de aceleração cúbica editorial (`cubic-bezier(0.25, 1, 0.5, 1)`) e pequenos atrasos escalonados entre títulos, parágrafos e cartões.
  - **Ritmo editorial:** Espaçamento vertical generoso (`clamp(80px, 10vw, 150px)`), permitindo que cada seção seja apreciada individualmente, sem poluição visual.

---

### Referência 3: NOTH.IN
- **Link:** [https://www.noth.in/](https://www.noth.in/)
- **Elementos visuais que chamaram atenção:**
  - A vivacidade das palavras ao passar o cursor, gerando surpresa positiva;
  - Mudanças visuais sutis que convidam à leitura atenta;
  - O tratamento refinado de contrastes e linhas de detalhe.
- **O que foi aproveitado e adaptado:**
  - **Microinterações em palavras-chave (*Hover Words*):** Palavras representativas da essência de Enrico — como *ideias*, *movimento*, *criatividade*, *sociável*, *calma*, *tranquila*, *jogos* e *piano* — ganham vida ao passar o cursor, com um leve deslocamento vertical, transição de itálico elegante e expansão de uma linha de sublinhado em tom bege (#D8C8AD).

---

## 2. JUSTIFICATIVA DA IDENTIDADE VISUAL E DAS ESCOLHAS TÉCNICAS

### Paleta de Cores
A paleta definida para o projeto obedece rigorosamente às diretrizes estabelecidas:

| Cor | Código Hex | Função e Significado no Projeto |
| :--- | :--- | :--- |
| **Branco** | `#FFFFFF` | **Predominante.** Atua como tela limpa e espaçosa, proporcionando tranquilidade, luminosidade e eliminando ruídos visuais. |
| **Preto Suave** | `#171717` | **Estrutura e Tipografia.** Um preto profundo e acolhedor (não 100% puro), que evita o cansaço visual de telas digitais e assegura contraste altíssimo (WCAG AAA) para leitura prolongada. |
| **Bege** | `#D8C8AD` | **Acento e Acolhimento.** Elemento de calor humano e sofisticação. Utilizado em linhas divisórias, anéis interativos, destaques visuais, tags e fundos secundários suaves (`#F8F5EE`). Transmite calma e proximidade. |

---

### Tipografia
- **Títulos e Destaques — *Playfair Display* (Serifada):**
  - Escolhida por seu desenho editorial clássico, remetendo a revistas de design, arquitetura e cultura contemporânea. Suas variações em itálico trazem sensibilidade e expressividade, conectando-se diretamente ao lado artístico de Enrico (o piano e a criatividade).
- **Textos Corridos e Interface — *Plus Jakarta Sans* (Sem serifa geométrica):**
  - Proporciona excelente legibilidade em qualquer resolução ou tamanho de tela, com proporções limpas, contemporâneas e confortáveis para leitura rápida em computadores e celulares.

---

### Estilo Minimalista Editorial vs. O que foi Evitado
- **O que foi estritamente evitado:** Elementos futuristas, estética *cyberpunk*, neons, degradês fluorescentes, robôs, circuitos, painéis com estética de terminal de programação ou excesso de efeitos tridimensionais pesados.
- **O resultado alcançado:** Um portfólio autêntico, acolhedor e transparente. Ao acessar o site, qualquer pessoa compreende de imediato quem é Enrico Pereira Bonato: um jovem de 17 anos sociável, calmo, com apreço pela música, pelos esportes e pelos jogos, apresentado através de um design atemporal e sofisticado.

---

## 3. SISTEMA DE ANIMAÇÕES NAS IMAGENS E ILUSTRAÇÕES

Todas as imagens e ilustrações vetoriais criadas contam com animações integradas por CSS nativo nos SVGs e microinterações táteis no navegador, mantendo o movimento orgânico, lento e repousante:

1. **Piano (`piano.svg`):** Ondas harmônicas flutuando com tempos alternados (4.2s a 6.5s), tecla bege pulsando suavemente e nota musical em levitação sutil. Botão interativo que toca um acorde acústico real (Cmaj9) sintetizado via Web Audio API.
2. **Corrida (`corrida.svg`):** Sol da manhã pulsando com calor acolhedor, linha de trajeto com fluxo contínuo de passos (`stroke-dashoffset`) e silhueta do corredor em cadência natural.
3. **Academia (`academia.svg`):** Anéis concêntricos de equilíbrio com rotação contínua e lenta (estilo zen, 28 segundos por volta) e barra com elevação sutil.
4. **Basquete (`basquete.svg`):** Bola de basquete flutuando suavemente em gravidade reduzida, com sombra sincronizada e rede do aro oscilando como sob uma brisa leve.
5. **Jogos (`jogos.svg`):** Controle minimalista flutuando em ritmo calmo, barra de luz central pulsando em tons de bege e botões com brilho suave.
6. **Retrato Editorial (`enrico-portrait.svg`):** Aura de iluminação difusa em ciclo respiratório lento (7s a 9s) e moldura com traçado sutil.
7. **Mockups de Projetos (`proj-*.svg`):** Barras de áudio em equalização suave, gráficos de corrida com linha de dados contínua, cartões com elevação sutil e linhas editoriais dinâmicas.
8. **Efeito 3D Tilt e Reflexo:** Ao mover o cursor sobre qualquer cartão ou imagem, a peça inclina-se sutilmente (máximo de 3.5 graus) em perspectiva tridimensional suave, acompanhada por um feixe de luz translúcido (*sheen overlay*).
