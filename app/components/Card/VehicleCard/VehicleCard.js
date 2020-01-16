import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import moment from 'moment';
// import Badge from '../../Badge';
import Block from '../../Block';
import styles from './styles';
import { EditButton, DeleteButton } from '../../Button';
const VehicleCard = ({
  onPress,
  deleteVehicle,
  token,
  year,
  make,
  model,
  vehicleId
}) => (
  <View style={styles.availListItem}>
    <View style={styles.leftList}>
      <EditButton
        style={styles.leftList}
        title={'Edit'}
        onPress={onPress}
        vehicleId={vehicleId}
        token={token}
      />
    </View>

    <View style={styles.centerList}>
      <Text style={styles.flatListText}>{year}</Text>

      <Text style={styles.flatListText}>{make}</Text>

      <Text style={styles.flatListText}> {model}</Text>
      <View style={styles.rightList}>
        <DeleteButton
          style={styles.rightList}
          title={'Delete'}
          deleteVehicle={deleteVehicle}
          vehicleId={vehicleId}
          token={token}
        />
      </View>
    </View>

    {/* <Block
      row
      center
      style={{ marginTop: 16, marginLeft: 16, justifyContent: 'space-between' }}
    /> */}
  </View>
);
//? Card.propTypes = {
//?  onPress: PropTypes.func,
//? };

export default VehicleCard;
