import { calculateProgress, isGoalCompleted } from '../SavingsGoal';

describe('SavingsGoal Entity (Domain Rule)', () => {
  it('calcula el porcentaje de progreso correctamente', () => {
    const goal = { id: '1', name: 'Test', targetAmount: 1000, currentAmount: 250 };
    expect(calculateProgress(goal)).toBe(25);
  });

  it('no permite un porcentaje mayor a 100%', () => {
    const goal = { id: '1', name: 'Test', targetAmount: 1000, currentAmount: 1500 };
    expect(calculateProgress(goal)).toBe(100);
  });

  it('identifica cuando una meta está completada', () => {
    const completedGoal = { id: '1', name: 'Test', targetAmount: 1000, currentAmount: 1000 };
    expect(isGoalCompleted(completedGoal)).toBe(true);
  });
});