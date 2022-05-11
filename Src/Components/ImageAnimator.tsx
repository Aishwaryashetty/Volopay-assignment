import React, {useEffect} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';

const ImageAnimator = () => {
  const spinAnim = new Animated.Value(0);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <Animated.Image
      style={[styles.logo, {transform: [{rotate: spin}]}]}
      source={require('../Assets/volopay.png')}
    />
  );
};

export default ImageAnimator;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    margin: 10,
    resizeMode: 'contain',
  },
});
