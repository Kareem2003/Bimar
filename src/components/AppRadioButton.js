import * as React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from '../screens/register/style';

const AppRadioButton = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
       
      <RadioButton 
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
        color="#FD9B63"
      />
      <Text style={styles.label}>Female</Text>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
        color="#FD9B63"
        
      />
      <Text style={styles.label}>Male</Text>
    </View>
  );
};
export default AppRadioButton;