import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigator';
import { softPurpleColor, primaryColor, secondaryColor, textColor, backgroundColor, errorColor, lightBackground, ButtonLight, primaryDark, TextLight, secondaryDark } from '../styles/colors';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { USERINFO } from '../helpers/constants/staticKeys';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeRoute, setActiveRoute] = useState('Home');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem(USERINFO);
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log('User Info:', parsedData);
          setUserInfo(parsedData);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleNavigation = (routeName) => {
    setActiveRoute(routeName);
    props.navigation.navigate('HomeNavigator', { screen: routeName });
  };

  return (
    <View style={styles.drawerContainer}>
      {/* User Profile Section */}
      <TouchableOpacity 
        style={styles.userProfileSection}
        onPress={() => handleNavigation('Profile')}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            {userInfo?.profileImage ? (
              <Image
                source={{ uri: userInfo.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Icon name="user-circle" size={50} color="#808080" />
            )}
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{userInfo?.userName || 'User'}</Text>
            <Text style={styles.userEmail}>{userInfo?.email || userInfo?.userEmail || userInfo?.emailAddress || 'No email'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.drawerContent}>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Home' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Home')}
        >
          <Icon name="home" size={20} color={activeRoute === 'Home' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Home' && styles.activeDrawerItemText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'AiChatScreen' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('AiChatScreen')}
        >
          <Icon name="envelope" size={20} color={activeRoute === 'AiChatScreen' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'AiChatScreen' && styles.activeDrawerItemText]}>AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Appointments' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Appointments')}
        >
          <Icon name="clipboard" size={20} color={activeRoute === 'Appointments' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Appointments' && styles.activeDrawerItemText]}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'MyDiagnoses' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('MyDiagnoses')}
        >
          <Icon name="medkit" size={20} color={activeRoute === 'MyDiagnoses' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'MyDiagnoses' && styles.activeDrawerItemText]}>My Diagnoses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Settings' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Settings')}
        >
          <Icon name="gear" size={20} color={activeRoute === 'Settings' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Settings' && styles.activeDrawerItemText]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Doctors' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Doctors')}
        >
          <Icon name="stethoscope" size={20} color={activeRoute === 'Doctors' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Doctors' && styles.activeDrawerItemText]}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Terms' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Terms')}
        >
          <Icon name="file-text" size={20} color={activeRoute === 'Terms' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Terms' && styles.activeDrawerItemText]}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, activeRoute === 'Rate App' && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('RateApp')}
        >
          <Icon name="star" size={20} color={activeRoute === 'Rate App' ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, activeRoute === 'Rate App' && styles.activeDrawerItemText]}>Rate App</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Icon name="sign-out" size={20} color="#ff0000" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 300,
        },
        drawerLockMode: 'locked-closed',
      }}
    >
      <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: lightBackground,
  },
  userProfileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: ButtonLight,
    backgroundColor: lightBackground,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#808080',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TextLight,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: TextLight,
    fontWeight: '500',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: lightBackground,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    backgroundColor: lightBackground,
  },
  activeDrawerItem: {
    backgroundColor: ButtonLight,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 15,
    color: TextLight,
    fontWeight: '500',
  },
  activeDrawerItemText: {
    color: primaryDark,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: lightBackground,
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 15,
    color: '#ff0000',
    fontWeight: '600',
  },
});

export default DrawerNavigator; 