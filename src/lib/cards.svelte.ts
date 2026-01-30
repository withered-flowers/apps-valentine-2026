import { subscribeToCard, type Card } from './cards';

export class CardState {
  data = $state<Card | null>(null);
  loading = $state(true);
  error = $state<Error | null>(null);

  constructor(id: string) {
    $effect(() => {
      this.loading = true;
      const unsubscribe = subscribeToCard(id, (card) => {
        this.data = card;
        this.loading = false;
      });

      return () => {
        unsubscribe();
      };
    });
  }
}
