## Objetivo

Dentro do modal de cada galeria (ex: Retratos, Gestantes, 15 Anos, etc), em vez de mostrar **álbuns individuais por cliente/sessão** (ex: "Sessão Ana Paula", "Sessão Carlos Mendes"), exibir diretamente uma **grid de 6 fotos placeholder** representando o trabalho de cada fotógrafo, seguida de um botão **[Ver mais]**.

## Mudanças em `src/components/GalleriesSection.tsx`

### 1. Simplificar estrutura de dados

Remover a interface `Album` e o array `albums` dentro de cada `PhotographerSection`. Substituir por um array simples `photos: string[]` com 6 placeholders.

```ts
interface PhotographerSection {
  photographer: string;
  subtitle: string;
  photos: string[]; // 6 placeholders
}
```

Cada seção (Igor / Equipe) em todas as 6 galerias terá `photos: Array(6).fill("/placeholder.svg")` (ou a cover correspondente da galeria, mantendo o visual atual).

### 2. Remover o segundo modal (álbum aberto)

- Eliminar o estado `openAlbum` e o `<AnimatePresence>` do "Modal: Fotos do álbum" (linhas ~340-396).
- Remover imports não utilizados (`ArrowLeft` se não for mais usado).

### 3. Atualizar o modal de galeria

Dentro de cada `section` (Igor / Equipe), substituir a grid de álbuns por:

- **Grid de 6 fotos placeholder** (mesma grid `grid-cols-2 sm:grid-cols-3 gap-4`, aspect `[4/5]`, sem overlay de título, sem clique).
- Abaixo da grid, um **botão "Ver mais"** centralizado, com estilo discreto coerente com o tema (ex: `variant="outline"` ou link estilizado em `text-foreground/70 hover:text-foreground` com underline).
  - Por enquanto o botão será um **placeholder sem ação** (ou pode disparar `handleAgendarClick` para puxar o usuário ao funil de agendamento — confirmar abaixo).

### 4. Comportamento do botão "Ver mais"

Como ainda não existe uma página/portfólio expandido por fotógrafo, opções:
- **(a)** Botão sem ação por enquanto (apenas visual, marcado como `disabled` ou sem `onClick`).
- **(b)** Botão chama `handleAgendarClick()` levando o usuário ao chat de agendamento.
- **(c)** Botão abre link externo (Instagram do fotógrafo, por exemplo) — exigiria URL.

**Vou assumir (a)** — botão visualmente presente mas sem destino, pronto para ser plugado quando houver portfólio externo. Se preferir outra opção, me avise antes de aprovar.

## Arquivos afetados

- `src/components/GalleriesSection.tsx` — única edição necessária.

## Resultado esperado

- Ao clicar numa galeria, o modal abre mostrando: título + descrição → seção "Igor Gagliardi" com 6 thumbnails → botão "Ver mais" → divisor → seção "Equipe Studio 131" com 6 thumbnails → botão "Ver mais".
- Sem segundo nível de navegação (álbuns individuais).
