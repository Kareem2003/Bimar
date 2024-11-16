import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { styles } from "./style";

const DrawerContent = (_props) => {
  const logout = async () => {
    await AsyncStorage.removeItem(AUTHENTICATION_TOKEN);
    await AsyncStorage.removeItem(USERINFO);
    props.navigation.replace("Login");
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    resizeMode={'contain'}
                    source={require('../../assets/images/logo.png')}
                />
            </View>
            <DrawerContentScrollView style={{ flex: 1 }} {...props}>
                <NavbarLink
                    text="Home"
                    onClick={() => {
                        props.navigation.navigate('HomeNav');
                    }}
                >
                    <Ionicons name="md-home" size={20} color={'white'} />
                </NavbarLink>
                <NavbarLink
                    text="Audits"
                    onClick={() => {
                        props.navigation.navigate('AuditsNav');
                    }}
                >
                    <FontAwesome5 name="tasks" size={20} color={'white'} />
                </NavbarLink>
                <NavbarLink
                    text="Profile"
                    onClick={() => {
                        props.navigation.navigate('ProfileNav');
                    }}
                >
                    <Ionicons name="settings-sharp" size={20} color={'white'} />
                </NavbarLink>
                <NavbarLink
                    text="Logout"
                    onClick={() => {
                        logout();
                    }}
                >
                    <MaterialCommunityIcons name="logout" size={20} color={'white'} />
                </NavbarLink>
            </DrawerContentScrollView> */}
    </View>
  );
};

export default DrawerContent;
