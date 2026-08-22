import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './home-style';
import { GoalItemComponent } from '../../../presentation/components/goal-item/goal-item-component';
import { useHomeViewModel } from './home-view-model';

interface HomeScreenProps {
  onSelectGoal: (goalId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectGoal }) => {
  const viewModel = useHomeViewModel(onSelectGoal);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Bolsillos de Ahorro</Text>
      <FlatList
        data={viewModel.goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<GoalItemComponent
          item={item}
          handlePressGoal={viewModel.handlePressGoal}
        />)
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};