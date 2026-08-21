import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavingsGoal } from '../../domain/entities/SavingsGoal';

interface SavingsState {
  goals: SavingsGoal[];
  selectedGoalId: string | null;
}

const initialState: SavingsState = {
  goals: [
    { id: '1', name: 'Fondo de Emergencia', targetAmount: 1000, currentAmount: 400 },
    { id: '2', name: 'Viaje a Japón', targetAmount: 3000, currentAmount: 2950 },
    { id: '3', name: 'Comprar Laptop', targetAmount: 1500, currentAmount: 1500 },
  ],
  selectedGoalId: null,
};

export const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    selectGoal: (state, action: PayloadAction<string>) => {
      state.selectedGoalId = action.payload;
    },
    addDeposit: (state, action: PayloadAction<{ goalId: string; amount: number }>) => {
      const { goalId, amount } = action.payload;
      const goal = state.goals.find((g) => g.id === goalId);
      if (goal && amount > 0) {
        goal.currentAmount += amount;
      }
    },
  },
});

export const { selectGoal, addDeposit } = savingsSlice.actions;
export default savingsSlice.reducer;