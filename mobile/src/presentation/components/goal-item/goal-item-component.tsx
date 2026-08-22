import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./goal-item-style"
import { calculateProgress } from "../../../domain/entities/SavingsGoal";

interface GoalItemProps {
    item: any;
    handlePressGoal: (id: string) => void;
}
export const GoalItemComponent: React.FC<GoalItemProps> = ({
    item,
    handlePressGoal
}) => {
    const progress = calculateProgress(item);
    return (<TouchableOpacity
        style={styles.card}
        onPress={() => handlePressGoal(item.id)}
        activeOpacity={0.7}
    >
        <View style={styles.cardHeader}>
            <Text style={styles.goalName}>{item.name}</Text>
            <Text style={styles.progressText}>{progress}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.cardFooter}>
            <Text style={styles.amountText}>
                Ahorrado: ${item.currentAmount.toLocaleString()}
            </Text>
            <Text style={styles.targetText}>
                Meta: ${item.targetAmount.toLocaleString()}
            </Text>
        </View>
    </TouchableOpacity>)
}