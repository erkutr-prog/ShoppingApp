import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationFunctionComponent } from 'react-native-navigation'

type Props = {
    componentId: string,
}

const Purchase: NavigationFunctionComponent<Props> = ({componentId}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <Text>
            Purchase
        </Text>
    </SafeAreaView>
  )
}

export default Purchase