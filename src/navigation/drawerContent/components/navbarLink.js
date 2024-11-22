import React from "react";
import { View, Pressable, Text } from "react-native";

const NavbarLink = (props) => {
  return (
    <Pressable style={styles.navbarLink} onPress={props.onClick}>
      {props.children}
      <Text style={styles.navbarLinkText}>{props.text}</Text>
    </Pressable>
  );
};
const styles = {
  navbarLink: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  navbarLinkText: { paddingHorizontal: 30, color: "white" },
};

export default NavbarLink;
