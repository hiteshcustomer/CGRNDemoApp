import React from 'react'
import { ScrollView, StyleSheet, Text, View,SafeAreaView } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'

export default function Container({children,isScrollable,bodyStyle}) {
    return (
        <SafeAreaView  style={styles.container}>
            {
                isScrollable? <ScrollView  keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    <View style={[styles.innerView,bodyStyle]}>
                        {children}
                    </View>
                </ScrollView>
                :
                <View style={[styles.innerView,bodyStyle]}>{children}</View>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:appColors.white
    },
    innerView:{
        flex:1,
        paddingHorizontal:scale(20),
        paddingVertical:scale(20)

    }
})
