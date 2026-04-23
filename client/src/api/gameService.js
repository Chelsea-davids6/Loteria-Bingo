const API_URL = 'http://localhost:5000/api/game';

export const gameAPI = {

  startGame: async () => {
    try {
      const response = await fetch(`${API_URL}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to start game');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error starting game:', error);
      throw error;
    }
  },
}