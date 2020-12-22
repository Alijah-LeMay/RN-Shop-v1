import React, { useState, useEffect, useCallback } from 'react'

import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cart'
import Colors from '../../constants/Colors'
import { fetchProducts } from '../../store/actions/products'

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()
  //useEffect below runs only first time screen is loaded, to fetch products

  //create a ddummy function inside useEffect because useEffect MUST NOT return a promise, which using async does.
  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(fetchProducts)
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts) // runs loadProducts on the scenario that another screen is about to be focused.

    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadProducts])

  const selectItemHandler = () => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }
  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={loadProducts}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(addToCart(itemData.item))
            }}
          />
        </ProductItem>
      )}
    />
  )
}
ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductsOverviewScreen
