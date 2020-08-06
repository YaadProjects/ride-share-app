import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({ onPress, title }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={
      Platform.OS === 'ios'
        ? ['#15a76a', '#15a76a', '#11a461']
        : ['#1EAA70', '#1EAA70']
    }
    style={styles.headerContainer}
  >
    <View style={styles.leftContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
    <View style={styles.rightContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon color="white" name="settings" size={30} />
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default Header;
