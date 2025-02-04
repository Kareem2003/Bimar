import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#C4DAD2',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  specialization: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 16,
    marginTop: 7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 24,
  },
  workingTime: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#16423C',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 20,
    alignSelf: 'center',
    width: '60%',
    marginTop: 20,
  },
});
