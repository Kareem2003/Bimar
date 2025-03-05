import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './style';
import Header from "../../components/Header";
import { primaryDark, primaryLight } from "../../styles/colors";
import { ThemeContext } from "../../contexts/themeContext";

const Terms = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
      <View style={{ backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
        <Header
          marginTop={50}
          header={"Terms & Conditions"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={[styles.termsContainer, { backgroundColor: isDarkTheme ? primaryDark : primaryLight }]}>
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>1. Medical Disclaimer</Text>
          <Text style={styles.termsText}>
            This application is designed to provide general medical information and facilitate communication between patients and healthcare providers. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>2. Privacy and Data Protection</Text>
          <Text style={styles.termsText}>
            We take your privacy seriously. All personal and medical information is encrypted and stored securely. We comply with healthcare data protection regulations and maintain strict confidentiality of your medical records.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>3. User Responsibilities</Text>
          <Text style={styles.termsText}>
            Users must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password. Any activity that occurs under your account is your responsibility.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>4. Emergency Situations</Text>
          <Text style={styles.termsText}>
            This application is not intended for emergency situations. In case of a medical emergency, please call emergency services immediately or visit the nearest emergency room.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>5. Service Availability</Text>
          <Text style={styles.termsText}>
            While we strive to maintain uninterrupted service, we cannot guarantee that the application will be available at all times. We reserve the right to modify or discontinue services with or without notice.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>6. Limitation of Liability</Text>
          <Text style={styles.termsText}>
            We are not liable for any damages arising from the use or inability to use this application. This includes but is not limited to direct, indirect, incidental, or consequential damages.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>7. Changes to Terms</Text>
          <Text style={styles.termsText}>
            We reserve the right to modify these terms at any time. Continued use of the application after such modifications constitutes acceptance of the updated terms.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;
