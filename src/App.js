import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import CallApiVanilla from './CallApiVanilla'
import CallApiAxios from './CallApiAxios'
import CallApiJson from './CallApiJson'

const App = () => {
    return (
        <View>
            <ScrollView>
                {/* <CallApiVanilla /> */}
                {/* <CallApiAxios /> */}
                <CallApiJson />
            </ScrollView>
        </View>
    )
}

export default App;
