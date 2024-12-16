import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";

export default function ProfilePicture(props) {



  return (
    <SafeAreaView>
      <View style={styles.profile}>
        <Image
          style={styles.profileAvatar}
          source={require("../assets/images/profilePicture.png")}
        />
          <View>
            <Text style={styles.profileName}>{props.profileName}</Text>
            <Text style={styles.profileHandle}>{props.profileHandle}</Text>
          </View>   
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    padding: 0,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
});
