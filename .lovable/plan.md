## Objetivo
No mobile, exibir as galerias empilhadas (1 por linha) ao invés de 2 por linha.

## Alteração
Em `src/components/GalleriesSection.tsx`, linha 152, ajustar o grid principal:

- Antes: `grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6`
- Depois: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6`

Resultado:
- Mobile (<640px): 1 coluna (empilhado)
- Tablet (≥640px): 2 colunas
- Desktop (≥1024px): 3 colunas

O grid interno da linha 214 (dentro de modal/expansão) não é alterado.
