import React, {useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const ProgressiveImage = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const imageOpacity = props.placeholderSource
    ? new Animated.Value(1)
    : new Animated.Value(0);
  const placeholderOpacity = new Animated.Value(1);

  const onLoad = () => {
          // in sequence increase the opacity of placeholder and image with set delay and duration.
    Animated.sequence([
      Animated.timing(placeholderOpacity, {
        delay: 1500,
        toValue: 1.0,
        useNativeDriver: true,
      }),
      Animated.timing(placeholderOpacity, {
        toValue: 0.66,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: 1.0,
        delay: 200,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLoaded(true);
    });
  };

  return (
    <View style={props.style}>
          {/* Actual Gif */}
          <Animated.Image
        source={props.source}
        resizeMode={'contain'}
        style={[
          props.style,
          styles.imagePosition,
          {
            opacity: imageOpacity,
          },
        ]}
        onLoad={onLoad}
      />
      {/* placeholder is loaded   */}
      {props.placeholderSource && !loaded && (
        <Animated.Image
          source={props.placeholderSource}
          style={[
            props.style,
            styles.imagePosition,
            {
              opacity: placeholderOpacity,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePosition: {
    position: 'absolute',
  },
});

export default ProgressiveImage;
