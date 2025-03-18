import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const Prescription = ({ route, navigation }) => {
  const { title, time } = route.params;
  
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E9EFEC'
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{title}</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 16, color: '#777777' }}>Time: {time}</Text>
        {/* Add your prescription content here */}
      </View>
    </View>
  );
};

export default Prescription;
