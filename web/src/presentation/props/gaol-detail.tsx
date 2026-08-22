export interface GoalDetailProps {
    name?: string;
    currentAmount: number;
    targetAmount: number;
    addPayment: (amount: number) => void;
}