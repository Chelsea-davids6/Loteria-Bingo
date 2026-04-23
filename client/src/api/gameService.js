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

   getGame: async (gameId) => {
    try {
      const response = await fetch(`${API_URL}/${gameId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching game:', error);
      throw error;
    }
  },

  callNextIcon: async (gameId) => {
    try {
      const response = await fetch(`${API_URL}/${gameId}/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to call next icon');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error calling next icon:', error);
      throw error;
    }
  },

   markIcon: async (gameId, iconName) => {
    try {
      const response = await fetch(`${API_URL}/${gameId}/mark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ iconName })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to mark icon');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error marking icon:', error);
      throw error;
    }
  },

   resumeToNextRound: async (gameId) => {
    try {
      const response = await fetch(`${API_URL}/${gameId}/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to resume game');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error resuming game:', error);
      throw error;
    }
  },

   endGame: async (gameId) => {
    try {
      const response = await fetch(`${API_URL}/${gameId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to end game');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error ending game:', error);
      throw error;
    }
  }

};