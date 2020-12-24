import React from 'react'

import { View, StyleSheet, Platform } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'

import MyButton from '../../components/UI/MyButton'

const MyAccountScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View>
        <MyButton
          onPress={() => {
            props.navigation.navigate('AccountInfo')
          }}
          style={styles.buttonView}
        >
          Account Information
        </MyButton>
        <MyButton onPress={() => {}} style={styles.buttonView}>
          Purchase History
        </MyButton>
        <MyButton onPress={() => {}} style={styles.buttonView}>
          Buy It Again
        </MyButton>
      </View>
    </View>
  )
}
// MyAccountScreen.navigationOptions = (navData)
export const screenOptions = (navData) => {
  return {
    headerTitle: 'Your Account',
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
  }
}

const styles = StyleSheet.create({
  buttonView: {
    fontSize: 16,
  },
})

export default MyAccountScreen
