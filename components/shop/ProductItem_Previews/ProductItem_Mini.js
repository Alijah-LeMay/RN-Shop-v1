import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const ProductItem_Mini = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.miniProduct}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <Image style={styles.image} source={{ uri: props.image }} />
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniProduct: {
    height: 175,
    width: '33%',
    margin: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ProductItem_Mini;
