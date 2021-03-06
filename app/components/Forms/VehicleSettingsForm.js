import React from 'react';
import { Text, ScrollView, View, TextInput, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class VehicleSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker1: false,
      picker2: false
    };
  }

  setStartDate = (event, date) => {
    this.setState({
      insurStartDate: date,
      picker1: false
    });
    this.hidePicker1();
  };

  setEndDate = (event, date) => {
    this.setState({
      insurEndDate: date,
      picker2: false
    });
    this.hidePicker2();
  };

  showPicker1 = () => {
    this.setState({ picker1: true });
  };

  showPicker2 = () => {
    this.setState({ picker2: true });
  };

  hidePicker1 = () => {
    this.setState({ picker1: false });
  };

  hidePicker2 = () => {
    this.setState({ picker2: false });
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async userEntries => {
    console.log('testing in vehicle form: ', this.props.navigation);
    let token = await AsyncStorage.getItem('token');
    //parse just the token from the token object in async storage
    token = JSON.parse(token);
    //use API file, createVehicle fx to send user inputs to database, must pass token.token so only the token value itself and not the key:value pair of token is passed to api call for creating vehicle
    API.createVehicle(userEntries, token.token)
      .then(this.props.navigation.navigate('RegisterAvailability'))
      //if error performing API fetch for posting driver, show error
      .catch(error => {
        console.warn(
          'There has been a problem with your operation: ' + error.message
        );
        throw error;
      });
  };

  render() {
    let userEntries = {
      vehicle: {
        car_make: this.state.car_make,
        car_model: this.state.car_model,
        car_year: parseInt(this.state.car_year),
        car_color: this.state.car_color,
        car_plate: this.state.car_plate,
        seat_belt_num: this.state.item4,
        insurance_provider: this.state.insurance_provider,
        insurance_start: moment(this.state.insurStartDate).format('YYYY-MM-DD'),
        insurance_stop: moment(this.state.insurEndDate).format('YYYY-MM-DD')
      }
    };

    const { picker1, picker2 } = this.state;

    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Block middle>
            <KeyboardAwareScrollView
              scrollEnabled={true}
            >
              <View>
                <Block style={styles.scrollContainer}>
                  <Text style={styles.title}>Vehicle Info</Text>
                  <Text style={styles.subTitle}>
                    Continue with vehicle information
                  </Text>
                </Block>

                <Text style={styles.labelStyleAlt}>Car Make:</Text>
                <TextInput
                  value={text => this.setState({ car_make: text })}
                  onChangeText={text => this.setState({ car_make: text })}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carModel.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>Car Model:</Text>
                <TextInput
                  onChangeText={text => this.setState({ car_model: text })}
                  placeholder="ex. Camry"
                  ref={input => {
                    this.carModel = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carYear.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>Car Year:</Text>
                <TextInput
                  onChangeText={text => this.setState({ car_year: text })}
                  placeholder="YYYY"
                  ref={input => {
                    this.carYear = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carBelts.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>Number of Seatbelts:</Text>
                <TextInput
                  onChangeText={text => this.setState({ item4: text })}
                  placeholder="#"
                  ref={input => {
                    this.carBelts = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carColor.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>Color:</Text>
                <TextInput
                  onChangeText={text => this.setState({ car_color: text })}
                  placeholder="ex. Black"
                  ref={input => {
                    this.carColor = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carPlate.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>License Plate:</Text>
                <TextInput
                  onChangeText={text => this.setState({ car_plate: text })}
                  placeholder="ex. PEG-1234"
                  ref={input => {
                    this.carPlate = input;
                  }}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    this.carInsur.focus();
                  }}
                  blurOnSubmit={false}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />

                <Text style={styles.labelStyleAlt}>Insurance Provider:</Text>
                <TextInput
                  onChangeText={text =>
                    this.setState({ insurance_provider: text })
                  }
                  placeholder="ex. Geico"
                  ref={input => {
                    this.carInsur = input;
                  }}
                  returnKeyType={'done'}
                  style={[styles.saeInputAlt]}
                  inputStyle={styles.saeTextAlt}
                />
              </View>

              <View>
                <Text style={styles.labelStyleAlt}>
                  Insurance Coverage Start Date:
                </Text>

                <Button
                  title="Pick a Date"
                  onPress={this.showPicker1}
                  color="#475c67"
                />
                {picker1 && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    onChange={this.setStartDate}
                  />
                )}
                <Text style={styles.displaySelection}>
                  Selected date:{' '}
                  {moment(this.state.insurStartDate).format('YYYY-MM-DD')}
                </Text>
              </View>
              <View>
                <Text style={styles.labelStyleAlt}>
                  Insurance Coverage End Date:
                </Text>
                <Button
                  title="Pick a Date"
                  onPress={this.showPicker2}
                  color="#475c67"
                />
                {picker2 && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    onChange={this.setEndDate}
                  />
                )}
                <Text style={styles.displaySelection}>
                  Selected date:{' '}
                  {moment(this.state.insurEndDate).format('YYYY-MM-DD')}
                </Text>
              </View>

              <Block style={styles.footer}>
                <CalendarButton
                  title="Continue"
                  onPress={() =>
                    this.handleUserSubmit(userEntries, this.props.navigation)
                  }
                />
              </Block>
            </KeyboardAwareScrollView>
          </Block>
        </View>
      </ScrollView>
    );
  }
}

export default VehicleSettingsForm;
