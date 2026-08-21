import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#111827' },
  listContainer: { gap: 12 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  progressText: { fontSize: 14, fontWeight: 'bold', color: '#2563eb' },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: { height: '100%', backgroundColor: '#2563eb' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  amountText: { fontSize: 13, color: '#4b5563', fontWeight: '500' },
  targetText: { fontSize: 13, color: '#9ca3af' },
});