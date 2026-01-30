<script lang="ts">
  import { onMount } from 'svelte';
  import { type Card } from '../lib/cards';
  import { CardState } from '../lib/cards.svelte';
  import { ReceiverViewLogic } from '../lib/receiver.svelte';
  import CardDisplay from './CardDisplay.svelte';
  import confetti from 'canvas-confetti';

  interface Props {
    id: string;
    initialCard: Card;
  }

  let { id, initialCard }: Props = $props();
  
  const cardState = new CardState(id);
  let card = $derived(cardState.data || initialCard);
  
  const logic = new ReceiverViewLogic(id, initialCard, () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  });

  onMount(async () => {
    await logic.markAsViewed();
  });

  async function handleYes() {
    await logic.accept();
  }

  async function handleNo() {
    await logic.decline();
  }
</script>

<CardDisplay 
  card={card}
  onYes={handleYes}
  onNo={handleNo}
  onNoHover={() => logic.handleNoHover()}
  yesButtonScale={logic.yesButtonScale}
  noButtonPos={logic.noButtonPos}
/>
