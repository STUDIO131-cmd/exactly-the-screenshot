## Problema
O botão flutuante **"Agende sua sessão"** (`WhatsAppFloat`, fixo no canto inferior direito com `z-50`) continua visível e clicável por cima do modal da galeria, poluindo a experiência ao explorar as fotos.

## Solução
Sincronizar a visibilidade do `WhatsAppFloat` com o estado de abertura do modal da galeria, escondendo-o enquanto a galeria estiver aberta.

### Mudanças

**1. `src/components/GalleriesSection.tsx`**
- Adicionar prop opcional `onGalleryOpenChange?: (open: boolean) => void`.
- Disparar `onGalleryOpenChange(true)` quando uma galeria abrir e `onGalleryOpenChange(false)` quando fechar (tanto pelo botão X quanto pelo overlay e pelo CTA "Agendar agora").

**2. `src/pages/Index.tsx`**
- Criar estado `const [isGalleryOpen, setIsGalleryOpen] = useState(false)`.
- Passar `onGalleryOpenChange={setIsGalleryOpen}` ao `<GalleriesSection />`.
- Renderizar `<WhatsAppFloat />` condicionalmente: `{!isGalleryOpen && <WhatsAppFloat ... />}`.

### Por que essa abordagem
- Mantém o `WhatsAppFloat` como componente “burro” (sem conhecer a galeria).
- Estado de UI continua centralizado no `Index`, que já orquestra o `BookingChat`.
- Animação simples: o botão simplesmente desmonta/remonta — sem necessidade de Framer Motion adicional.

### Fora do escopo
- Não alterar `BookingPromoBar` nem `BookingSection` (já ficam visualmente cobertos pelo modal `z-50`, sem problema de interação).
- Não mudar z-index do modal (manter `z-50`).