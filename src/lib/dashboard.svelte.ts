import { subscribeToCards } from './dashboard';
import type { Card } from './cards';

export class DashboardState {
  cards = $state<Card[]>([]);
  cardIds = $state<string[]>([]);
  loading = $state(true);

  constructor() {
    this.loadIds();
    
    $effect(() => {
      this.loading = true;
      const unsubscribe = subscribeToCards(this.cardIds, (updatedCards) => {
        this.cards = updatedCards;
        this.loading = false;
      });

      return () => {
        unsubscribe();
      };
    });

    // Listen for updates from other components
    if (typeof window !== 'undefined') {
      const handleUpdate = () => this.loadIds();
      window.addEventListener('card-created', handleUpdate);
      $effect(() => {
        return () => window.removeEventListener('card-created', handleUpdate);
      });
    }
  }

  private loadIds() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sent_card_ids');
      if (saved) {
        this.cardIds = JSON.parse(saved);
      }
    }
  }

  addCard(id: string) {
    this.cardIds = [...this.cardIds, id];
    if (typeof window !== 'undefined') {
      localStorage.setItem('sent_card_ids', JSON.stringify(this.cardIds));
      // Dispatch event to notify other instances
      window.dispatchEvent(new Event('card-created'));
    }
  }
}
