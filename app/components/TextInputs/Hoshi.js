import React from 'react';
// this component still needs modifications
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#b9c1ca',
  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 16,
    color: '#6a7989',
  },
  textInput: {
    position: 'absolute',
    bottom: 2,
    padding: 0,
    color: '#6a7989',
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelMask: {
    height: 24,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default class Hoshi extends BaseInput {
  static defaultProps = {
    borderColor: 'red',
    inputPadding: 16,
    height: 48,
    borderHeight: 3,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      maskColor,
      borderColor,
      borderHeight,
      inputPadding,
      height: inputHeight,
    } = this.props;
    const {width, focusedAnim, value} = this.state;
    const flatStyles = StyleSheet.flatten(containerStyle) || {};
    const containerWidth = flatStyles.width || width;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
            width: containerWidth,
          },
        ]}
        onLayout={this._onLayout}>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
            },
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid="transparent"
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                opacity: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0, 1],
                }),
                top: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 0.51, 1],
                  outputRange: [24, 24, 0, 0],
                }),
                left: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 0.51, 1],
                  outputRange: [0, 0, 0, 0], // reset to zero to match container
                }),
              },
            ]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.labelMask,
            {
              backgroundColor: maskColor,
              width: inputPadding,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.border,
            {
              width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width],
              }),
              backgroundColor: borderColor,
              height: borderHeight,
            },
          ]}
        />
      </View>
    );
  }
}