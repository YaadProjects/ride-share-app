import React from 'react';
import {
  Text, View, TouchableOpacity, ScrollView,
} from 'react-native';

import moment from 'moment';

import Badge from '../../Badge';
import Block from '../../Block';
// import PropTypes from 'prop-types';
import styles from './styles';

const InitOverviewCard = ({
  onPress, pickupAddress, dropoffAddress, date, note,
}) => (
  <Block>
    <Block style={[styles.cardContainer, styles.shadow]}>
      <Block row space="between">
        <Text style={styles.date}>{moment(date).format('MMM D')}</Text>
        <Text style={styles.date}>pick up by</Text>
        <Text style={styles.date}>{moment(date).format('h:mm A')}</Text>
      </Block>
      <Block row center>
        <Badge color="rgba(30,170,112,0.2)" size={14} style={{ marginRight: 8 }}>
          <Badge color="#1EAA70" size={8} />
        </Badge>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.location}>
            {pickupAddress}
          </Text>
        </TouchableOpacity>
      </Block>
      <Block row center>
        <Badge color="rgba(255, 71, 87, 0.2)" size={14} style={{ marginRight: 8 }}>
          <Badge color="#FF4957" size={8} />
        </Badge>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.location}>
            {dropoffAddress}
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>

    <View style={[styles.cardContainer, styles.noteContainer, styles.shadow]}>
      <Block style={styles.noteCard}>
        <ScrollView>
          <Block>
            <Text style={styles.title}>Note from rider</Text>
            <Text style={styles.noteText}>{note}</Text>
          </Block>
        </ScrollView>
      </Block>
    </View>
  </Block>
);

export default InitOverviewCard;
