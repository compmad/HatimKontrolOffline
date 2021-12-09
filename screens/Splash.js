import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor:"#ffffff"}}>
            <LottieView source={require('../assets/lottie/bismillah.json')} 
            autoPlay 
            loop={false}
            speed={0.5}
            onAnimationFinish={() =>{
                navigation.replace("Giris");
            }}/>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})
