import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    category: string,
    onPress: Function
}

export type IconName = {}

const iconName = {
    "electronics": <MaterialIcons name='devices' size={30} color={'black'} />,
    "jewelery": <FontAwesome name='diamond' size={30} color={'black'}/>,
    "men's clothing": <MaterialCommunityIcons name='face-man' size={30} color={'black'}/>,
    "women's clothing": <MaterialCommunityIcons name='face-woman' size={30} color={'black'}/>
}

const ExploreCardView = (props: Props) => {
    const getIcon = () => {
        return iconName[props.category as keyof IconName]
    }

  return (
    <TouchableOpacity onPress={() => props.onPress(props.category)} style={{flexDirection: 'row', width: Dimensions.get('screen').width -5, height: 50, backgroundColor: colors.PRODUCT_CARD_BG, marginBottom: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 15}}>
            {props.category}
        </Text>
        <View style={{marginLeft: 'auto'}}>
            {getIcon()}
        </View>
    </TouchableOpacity>
  )
}

export default ExploreCardView