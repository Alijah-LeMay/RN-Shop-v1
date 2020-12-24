import React from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import Card from '../UI/Card'

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity
  if (Platform.OS === 'android' && Platform.version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <Card style={styles.card}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View style={styles.imageCenter}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>{props.children}</View>
      </TouchableCmp>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: { marginTop: 20, width: '50%' },
  imageCenter: {
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
})

export default ProductItem
