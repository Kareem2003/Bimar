import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigator';
import { softPurpleColor, primaryColor, secondaryColor, textColor, backgroundColor, errorColor, lightBackground, ButtonLight, primaryDark, TextLight, secondaryDark } from '../styles/colors';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AUTHENTICATION_TOKEN, USERINFO } from '../helpers/constants/staticKeys';
import { useNavigationState, useNavigation, useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../helpers/constants/config';
import { subscribeToUserData, USER_DATA_EVENTS } from '../helpers/UserDataManager';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeRoute, setActiveRoute] = useState('Home');
  const navigation = useNavigation();
  
  // Get the current route from navigation state
  const state = useNavigationState(state => state);
  
  // Dynamically track active route
  useFocusEffect(
    React.useCallback(() => {
      const getActiveRouteName = (state) => {
        if (!state || !state.routes) return null;
        const route = state.routes[state.index];
  
        if (route.state) {
          return getActiveRouteName(route.state); // Recursively get the active route inside nested navigators
        }
        return route.name;
      };

      const currentRoute = getActiveRouteName(state);
      
      if (currentRoute && currentRoute !== 'HomeNavigator') {
        setActiveRoute(currentRoute);
      } else if (!currentRoute) {
        // If no route is active, set Home as default
        setActiveRoute('Home');
      }

      // Refresh user info when drawer is focused
      fetchUserInfo();
    }, [state])
  );

  const fetchUserInfo = async () => {
    try {
      const userData = await AsyncStorage.getItem(USERINFO);
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserInfo(parsedData);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  
  // Subscribe to user data updates
  useEffect(() => {
    // Subscribe to profile updates
    const profileUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.PROFILE_UPDATED, 
      (updatedData) => {
        console.log('Drawer received PROFILE_UPDATED event:', updatedData);
        setUserInfo(updatedData);
      }
    );
    
    // Subscribe to image updates
    const imageUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.IMAGE_UPDATED, 
      (updatedData) => {
        console.log('Drawer received IMAGE_UPDATED event:', updatedData);
        setUserInfo(updatedData);
      }
    );
    
    // Load initial data
    fetchUserInfo();
    
    // Cleanup subscriptions on unmount
    return () => {
      profileUnsubscribe();
      imageUnsubscribe();
    };
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
    // Always update activeRoute when explicitly navigating
    setActiveRoute(routeName);
    
    // Navigate to the route
    props.navigation.navigate('HomeNavigator', { screen: routeName });
  };

  // Helper function to check if a route is active
  const isRouteActive = (routeName) => {
    // Special case for Home - it's active if explicitly selected or if no other route is active
    if (routeName === 'Home') {
      return activeRoute === 'Home' || (activeRoute !== 'Appointments' && 
             activeRoute !== 'AiChatScreen' && activeRoute !== 'MyDiagnoses' && 
             activeRoute !== 'Settings' && activeRoute !== 'Doctors' && 
             activeRoute !== 'Terms' && activeRoute !== 'RateApp' && 
             activeRoute !== 'Profile');
    }
    return activeRoute === routeName;
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
                source={{ uri: `${BASE_URL}/${userInfo.profileImage}?t=${new Date().getTime()}` }}
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
          style={[styles.drawerItem, isRouteActive('Home') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Home')}
        >
          <Icon name="home" size={20} color={isRouteActive('Home') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('Home') && styles.activeDrawerItemText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('AiChatScreen') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('AiChatScreen')}
        >
          <Icon name="envelope" size={20} color={isRouteActive('AiChatScreen') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('AiChatScreen') && styles.activeDrawerItemText]}>AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('Appointments') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Appointments')}
        >
          <Icon name="clipboard" size={20} color={isRouteActive('Appointments') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('Appointments') && styles.activeDrawerItemText]}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('MyDiagnoses') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('MyDiagnoses')}
        >
          <Icon name="medkit" size={20} color={isRouteActive('MyDiagnoses') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('MyDiagnoses') && styles.activeDrawerItemText]}>My Diagnoses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('Settings') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Settings')}
        >
          <Icon name="gear" size={20} color={isRouteActive('Settings') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('Settings') && styles.activeDrawerItemText]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('Doctors') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Doctors')}
        >
          <Icon name="stethoscope" size={20} color={isRouteActive('Doctors') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('Doctors') && styles.activeDrawerItemText]}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('Terms') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('Terms')}
        >
          <Icon name="file-text" size={20} color={isRouteActive('Terms') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('Terms') && styles.activeDrawerItemText]}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.drawerItem, isRouteActive('RateApp') && styles.activeDrawerItem]} 
          onPress={() => handleNavigation('RateApp')}
        >
          <Icon name="star" size={20} color={isRouteActive('RateApp') ? softPurpleColor : '#666'} />
          <Text style={[styles.drawerItemText, isRouteActive('RateApp') && styles.activeDrawerItemText]}>Rate App</Text>
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
        drawerLockMode: 'unlocked',
        swipeEnabled: true,
        swipeEdgeWidth: 50,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
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
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#808080",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: TextLight,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 10,
    color: primaryDark,
    fontWeight: "500",
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: lightBackground,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "500",
  },
  activeDrawerItemText: {
    color: primaryDark,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: lightBackground,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 15,
    color: "#ff0000",
    fontWeight: "600",
  },
});

export default DrawerNavigator; 