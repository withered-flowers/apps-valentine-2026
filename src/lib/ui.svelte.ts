
export class UiState {
  shareModalUrl = $state("");
  isShareModalOpen = $state(false);

  openShareModal(cardId: string) {
    this.shareModalUrl = `${window.location.origin}/card/${cardId}`;
    this.isShareModalOpen = true;
  }

  closeShareModal() {
    this.isShareModalOpen = false;
  }
}

export const uiState = new UiState();
