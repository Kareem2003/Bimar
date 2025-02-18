import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './style';
import Logic from './logic';
import AppButton from '../../components/AppButton';

const DoctorProfile = ({ navigation, route }) => {
  const doctor = route.params.doctor;
  const { state } = Logic(navigation);

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      {/* Doctor Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            doctor.doctorImage && doctor.doctorImage !== "null"
              ? { uri: doctor.doctorImage }
              : require("../../assets/images/WhatsApp Image 2023-07-23 at 15.23.54.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>{doctor.doctorName || 'Dr. Unknown'}</Text>
        <Text style={styles.specialization}>{doctor.field || 'General'}</Text>
        
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={16} color="#FD9B63" />
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.reviewCount}>100 Reviews</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.aboutText}>
          {doctor.doctorName ? `Dr. ${doctor.doctorName}` : 'The doctor'} is a top specialist at {doctor.clinic?.[0]?.clinicName || 'London Bridge Hospital'}. 
          He has achieved several awards and recognition for is contribution and service in his own field. 
          He is available for private consultation.
        </Text>
      </View>

      {/* Working Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working time</Text>
        <Text style={styles.workingTime}>Mon - Sat (08:30 AM - 09:00 PM)</Text>
      </View>

      {/* Book Now Button */}
      <AppButton
        title="BOOK NOW"
        buttonStyle={styles.bookButton}
        textStyle={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}
      />
    </ScrollView>
  );
};

export default DoctorProfile;
