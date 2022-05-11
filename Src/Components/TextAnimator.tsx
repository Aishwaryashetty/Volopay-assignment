import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import * as Constants from '../Constants';

const TextAnimator = (props: any) => {
  const animatedValues: Array<any> = [];
  const duration = 2000;
  let animations: Array<any> = [];
  const letterArray = Constants.Title.split('');
  letterArray.forEach((_, index: number) => {
    animatedValues[index] = new Animated.Value(0);
  });

  useEffect(() => {
    animate(1);
  });

  const animate = (toValue = 1) => {
    animations = letterArray.map((_, index: number) => {
      return Animated.timing(animatedValues[index], {
        toValue,
        duration,
        useNativeDriver: true,
      });
    });
    Animated.stagger(
      duration / 5,
      toValue === 0 ? animations.reverse() : animations,
    ).start(() => {
      setTimeout(() => animate(toValue === 0 ? 1 : 0), 500);
      if (props.onFinish) {
        props.onFinish(toValue === 1);
      }
    });
  };

  return (
    <View style={styles.textWrapper}>
      {letterArray.map((letter: string, index: number) => {
        return (
          <Animated.Text
            key={`${letter}-${index}`}
            style={[
              styles.textStyle,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues[index],
                      new Animated.Value(5),
                    ),
                  },
                ],
              },
            ]}>
            {letter}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default TextAnimator;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    margin: 5,
  },
  textStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
});
