import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Giris from './screens/Giris';
import {createStackNavigator} from '@react-navigation/stack';
import KuranHatimListesi from './screens/Kuran/KuranHatimListesi';
import KuranHatimDetay from './screens/Kuran/KuranHatimDetay';
import SureHatimListesi from './screens/Sure/SureHatimListesi';
import SureHatimDetay from './screens/Sure/SureHatimDetay';
import SayiHatimListesi from './screens/Sayi/SayiHatimListesi';
import SayiHatimDetay from './screens/Sayi/SayiHatimDetay';
import Splash from './screens/Splash';

const Stack = createStackNavigator();
const globalScreenOptions={
  headerStyle :{backgroundColor:"#2C6BED"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white"
};

export default function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="Giris" component={Giris}/>     
        <Stack.Screen name="KuranHatimListesi" component={KuranHatimListesi}/>     
        <Stack.Screen name="KuranHatimDetay" component={KuranHatimDetay}/>
        <Stack.Screen name="SureHatimListesi" component={SureHatimListesi}/>     
        <Stack.Screen name="SureHatimDetay" component={SureHatimDetay}/>
        <Stack.Screen name="SayiHatimListesi" component={SayiHatimListesi}/>     
        <Stack.Screen name="SayiHatimDetay" component={SayiHatimDetay}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
