import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  backButton: { marginRight: 16 },
  backButtonText: { color: '#2563eb', fontWeight: 'bold', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' }
});