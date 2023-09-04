import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

type Props = {}

const { width, height } = Dimensions.get('window')

const Profile = (props: Props) => {


  const onLogout = async() => {
    await auth().signOut();
  }

  const logoutAlert = () => {
    Alert.alert('Uyarı', 'Çıkış yapmak istediğinize emin misiniz?', [
      {
        text: 'Yes',
        onPress: () => onLogout()
      },
      {
        text: 'No',
        onPress: () => console.log("Cancel pressed.")
      }
    ])
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => logoutAlert()} style={styles.logoutBtnContainer}>
        <Text>
          Çıkış Yap
        </Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoutBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: width - 20,
    backgroundColor: 'white',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 12,
    borderRadius: 12,
    alignSelf: 'center'
  }
})

export default Profile