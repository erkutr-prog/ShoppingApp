import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    closeCb: Function
}

const TopButtonModal = (props: Props) => {
  return (
    <TouchableOpacity
        style={{marginLeft: 'auto'}}
        onPress={() => props.closeCb()}>
          <Icon name="close" color={'black'} size={30} />
    </TouchableOpacity>
  )
}

export default TopButtonModal