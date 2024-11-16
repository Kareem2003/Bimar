import {Dimensions} from 'react-native';
import {primary} from '../../styles/colors';
export const styles = {
    container: {flex: 1, backgroundColor: primary, paddingHorizontal: 10},
    logoContainer: {
        marginVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        height: Dimensions.get('window').height * 0.13,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
};
