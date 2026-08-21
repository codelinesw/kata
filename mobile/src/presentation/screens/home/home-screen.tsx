import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../infrastructure/store/store';
import { selectGoal } from '../../storage/savingsSlice';
import { SavingsGoal, calculateProgress } from '../../../domain/entities/SavingsGoal';
import { styles } from './home-style';

interface HomeScreenProps {
  onSelectGoal: (goalId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectGoal }) => {
  const goals = useSelector((state: RootState) => state.savings.goals);
  const dispatch = useDispatch();

  const handlePressGoal = (goalId: string) => {
    dispatch(selectGoal(goalId));
    onSelectGoal(goalId); // Abre el WebView o detalle
  };

  const renderGoalItem = ({ item }: { item: SavingsGoal }) => {
    const progress = calculateProgress(item);

    return (
      <TouchableOpacity 
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Bolsillos de Ahorro</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoalItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};