import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { IAddress } from '../models/AddressType'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../assets/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../models/TabParamsList'

type Props = NativeStackScreenProps<AppStackParamList, 'AddressList'>

const AddressList = ({route, navigation}: Props) => {

    const onPressAddress = (id: string) => {
        if (route.params.selectCallback !== undefined) {
            route.params.selectCallback(route.params.addressList.filter((value) => value.id == id)[0])
        }
        navigation.goBack()
    }


    const renderItem = ({item}: {item: IAddress}) => {
        return (
            <TouchableOpacity style={styles.addressContainer} onPress={() => onPressAddress(item.id)}>
                <>
                <View style={{flex: 2 / 3,flexDirection: 'column', marginTop: 5}}>
                    <Text style={{marginLeft: 30, fontWeight: 'bold'}}>
                      {item.header}
                    </Text>
                    <Text style={{marginLeft: 30, marginTop: 5}} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <View style={{flex: 1 / 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>
                        {item.postalCode.toString()}
                    </Text>
                </View>
                </>
            </TouchableOpacity>
        )
    }

  return (
    <View style={{flex: 1}}>
        <FlatList
            contentContainerStyle={{ marginTop: 50 }}
            data={route.params.addressList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => renderItem(item)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    addressContainer: {
        alignSelf: 'center',
        width: Dimensions.get('screen').width - 20,
        height: 70,
        backgroundColor: colors.PRODUCT_CARD_BG,
        borderWidth: 1,
        borderColor: colors.PRODUCT_RATING_ICON,
        borderRadius: 13,
        marginBottom: 10,
        flexDirection: 'row'
    }
})

export default AddressList