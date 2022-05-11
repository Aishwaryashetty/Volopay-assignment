import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';

import {TextAnimator, ImageAnimator} from './index';

const Splash = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={[
        styles.fadeView,
        {opacity: fadeAnim}, // Bind opacity to animated value
      ]}>
      <ImageAnimator />
      <TextAnimator onFinish={() => {}} />
    </Animated.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  fadeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#517FA4',
  },
});
