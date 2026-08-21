export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

// Cálculo puro del porcentaje de progreso (0% a 100%)
export const calculateProgress = (goal: SavingsGoal): number => {
  if (goal.targetAmount <= 0) return 0;
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  return Math.min(Math.round(progress), 100);
};

// Regla de negocio para determinar si la meta se completó
export const isGoalCompleted = (goal: SavingsGoal): boolean => {
  return goal.currentAmount >= goal.targetAmount;
};