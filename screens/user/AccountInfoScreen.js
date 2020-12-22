import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import MyButton from '../../components/UI/MyButton'

const AccountInfoScreen = (props) => {
  return (
    <View>
      <Text>Account info</Text>
      <MyButton>Name</MyButton>
      <View>
        <MyButton>Phone</MyButton>
        <Text>Verified?</Text>
      </View>

      <MyButton>Email</MyButton>
      <MyButton>Change Password</MyButton>
      <MyButton>Location</MyButton>
    </View>
  )
}

const styles = StyleSheet.create({})

export default AccountInfoScreen
