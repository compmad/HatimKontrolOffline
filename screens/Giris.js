import React,{useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input,Image} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
//import SQLite from 'react-native-sqlite-storage';
//import { openDatabase } from 'react-native-sqlite-storage';
//var db = SQLite.openDatabase({ name: 'HatimKontrolOffline.db', createFromLocation: 1 });
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('HatimKontrolOffline.db');
const Giris = ({navigation}) => {
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"Hatimci",
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
      headerTitle: ()=>(
          <View
              style={{
                  flexDirection: 'row',
                  alignItems:'center'
              }}
          >
              <Icon
                  name="quran"
                  size={20}
                  color="white"
                  style={styles.icon}
                  />
              <Icon
                  name="readme"
                  size={20}
                  color="white"
                  style={styles.icon}
                  />  
              <Icon
                  name="hourglass"
                  size={20}
                  color="white"
                  style={styles.icon}
                  />      
              <Text style={styles.headerText}>Hatimci</Text>
          </View>
      )
    });
  },[navigation]);  
  
  useEffect(() => {
        db.transaction((txn)=> {
            hatimListeKontrol(txn);
            kuranHatimDetayKontrol(txn);
            sureHatimDetayKontrol(txn);
            sayiHatimDetayKontrol(txn);
      });
    }, []);     
    function hatimListeKontrol(txn){
        console.log(JSON.stringify(txn));
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='HATIM_LISTE'",
            [],
            (txn, res)=> {
              console.log('item:'+ res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS HATIM_LISTE',
                                 []
                                 ,onSuccess('DROP TABLE IF EXISTS HATIM_LISTE')
                                 ,(txn,error)=>{onError(error,'DROP TABLE IF EXISTS HATIM_LISTE')});
                txn.executeSql('CREATE TABLE IF NOT EXISTS HATIM_LISTE(HATIM_ID INTEGER PRIMARY KEY AUTOINCREMENT, HATIM_TURU VARCHAR(20), HATIM_ADI VARCHAR(20))',
                  [],
                  onSuccess('CREATE HATIM_LISTE'),
                  (txn,error)=>{onError(error,'CREATE HATIM_LISTE')}
                );
              }
            },
            (txn,error)=>{
              console.log('Error : '+error);
            }
          );
          console.log("End : "+JSON.stringify(txn));
    };
    function onSuccess(sql){
      console.log('Success : '+sql);
    }
    function onError(error,sql){
      console.log(error+"-->"+sql);
    }
    function kuranHatimDetayKontrol(txn){ 
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='KURAN_HATIM_DETAY'",
            [],
            (txn, res)=> {
              console.log('item: '+ res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS KURAN_HATIM_DETAY', 
                                [],
                                onSuccess('DROP KURAN_HATIM_DETAY'),
                                (txn,error)=>{onError(error,'DROP KURAN_HATIM_DETAY')});
                txn.executeSql('CREATE TABLE IF NOT EXISTS KURAN_HATIM_DETAY(DETAY_ID INTEGER PRIMARY KEY AUTOINCREMENT,HATIM_ID INTEGER, CUZ_NO INTEGER, OKUYAN VARCHAR(50), DURUM INTEGER)',
                  [],
                  onSuccess('CREATE KURAN_HATIM_DETAY'),
                  (txn,error)=>{onError(error,'CREATE KURAN_HATIM_DETAY')}
                );
              }
            },
            (txn,error)=>{
              console.log('Error : '+error);
            }
          );
    };
    function sureHatimDetayKontrol(txn){
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='SURE_HATIM_DETAY'",
            [],
            (txn, res) =>{
              console.log('item: '+ res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS SURE_HATIM_DETAY',
                                [],
                                onSuccess('DROP SURE_HATIM_DETAY'),
                                (txn,error)=>{onError(error,'DROP SURE_HATIM_DETAY')});
                txn.executeSql('CREATE TABLE IF NOT EXISTS SURE_HATIM_DETAY(DETAY_ID INTEGER PRIMARY KEY AUTOINCREMENT,HATIM_ID INTEGER, OKUYAN VARCHAR(50), ADET INTEGER, DURUM INTEGER)',
                  [],
                  onSuccess('CREATE SURE_HATIM_DETAY'),
                  (txn,error)=>{onError(error,'CREATE SURE_HATIM_DETAY')}
                );
              }
            },
            (txn,error)=>{
              console.log('Error : '+error);
            }
          );
    };
    function sayiHatimDetayKontrol(txn){
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='SAYI_HATIM_DETAY'",
            [],
            (txn, res)=>{
              console.log('item: '+ res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS SAYI_HATIM_DETAY', 
                                 [],
                                 onSuccess('DROP SAYI_HATIM_DETAY'),
                                 (txn,error)=>{onError(error,'DROP SAYI_HATIM_DETAY')});
                txn.executeSql('CREATE TABLE IF NOT EXISTS SAYI_HATIM_DETAY(DETAY_ID INTEGER PRIMARY KEY AUTOINCREMENT,HATIM_ID INTEGER, OKUYAN VARCHAR(50), ADET INTEGER, DURUM INTEGER)',
                  [],
                  onSuccess('CREATE SAYI_HATIM_DETAY'),
                  (txn,error)=>{onError(error,'CREATE SAYI_HATIM_DETAY')}
                );
              }
            },
            (txn,error)=>{
              console.log('Error : '+error);
            }
          );
    };
    const KuranHatmiAc = () => {
        navigation.navigate('KuranHatimListesi');
    }
    const SureHatmiAc = () => {
        navigation.navigate("SureHatimListesi");
    }
    const SayiHatmiAc = () => {
        navigation.navigate("SayiHatimListesi");
    }
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/image.png')}
                style={{width:300, height:300, padding:50}}/>
            <Button title="Kuran-ı Kerim             " 
                icon={
                    <Icon
                    name="quran"
                    size={20}
                    color="white"
                    style={styles.icon}
                    />
                } 
                containerStyle={styles.kuranHatmiButton} onPress={KuranHatmiAc}/>
            <Button title="Yasin/Fetih/Rahman..." 
                icon={
                    <Icon
                    name="readme"
                    size={20}
                    color="white"
                    style={styles.icon}
                    />
                } 
                containerStyle={styles.button} onPress={SureHatmiAc}/>    
            <Button title="Tevhid/İhlas              " 
                icon={
                    <Icon
                    name="hourglass"
                    size={20}
                    color="white"
                    style={styles.icon}
                    />
                } 
                containerStyle={styles.button} onPress={SayiHatmiAc}/>  
        </View>
    )
}

export default Giris

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"white",
    },
    kuranHatmiButton:{
        width:300,
        paddingTop: 10,
    },
    button:{
      width:300,
      paddingTop: 10,
      opacity: 0, height: 0
  },
    icon:{
        paddingRight:10,
    },
    headerText: {
      fontWeight:"900",
      color:"#FBFBFB",
      padding: 10
    }
    
})
