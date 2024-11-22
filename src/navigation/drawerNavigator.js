import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./homeNavigator";
import ProfileNavigator from "./profileNavigator";
import AuditNavigator from "./auditNavigator";
import InsightNavigator from "./insightNavigator";
import Sample from "../screens/sample";
import DrawerContent from "./drawerContent";

const Drawer = createDrawerNavigator();

const renderDrawerContent = (props) => <DrawerContent {...props} />;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      initialRouteName="HomeNav"
    >
      <Drawer.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
