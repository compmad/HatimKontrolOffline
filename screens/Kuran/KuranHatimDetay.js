import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Modal, TouchableOpacity } from 'react-native'
import {Button,Input,Switch} from 'react-native-elements';
import KuranHatimDetayItem from '../../components/KuranHatimDetayItem';
import * as SQLite from 'expo-sqlite';
//import SQLite from 'react-native-sqlite-storage';
import Icon from "react-native-vector-icons/FontAwesome5";
const okunduRenk = "#b2dfdb";
const okunmadiRenk = "#f4f3f4";
const KuranHatimDetay = ({route, navigation}) => {
    
    useLayoutEffect(()=>{
        navigation.setOptions({
          title:route.params.hatimAdi,
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
                  <Text style={styles.headerText}>{route.params.hatimAdi}</Text>
              </View>
          )
        });
      },[navigation]);

    const [cuzDegisim,setCuzDegisim]=useState(true);
    const [cuzListesi,setCuzListesi]=useState([]);
    var db = SQLite.openDatabase('HatimKontrolOffline.db');
    //var db = SQLite.openDatabase({ name: 'HatimKontrolOffline.db', createFromLocation: 1 });
    useEffect(()=>{
        console.log("Cüz Listesi Getir");
        if(cuzDegisim){
            db.transaction(tx=> {
                tx.executeSql(
                'SELECT DETAY_ID,CUZ_NO,OKUYAN,DURUM  FROM KURAN_HATIM_DETAY WHERE HATIM_ID=? ORDER BY CUZ_NO',
                [route.params.hatimId],
                (tx, results) => {
                    console.log('Row Count '+results.rows.length);
                    var temp = new Array();
                    for(let i=0;i<results.rows.length;i++){                    
                        temp.push(results.rows.item(i));
                        //console.log(temp);
                    }
                    console.log(temp);
                    setCuzListesi(temp);
                },(tx,error)=>{
                    console.log(error);
                }
                );
          });
        }
        setCuzDegisim(false);
    },[cuzDegisim]);
    const durumDegistir=(id,durum)=>{
        console.log("DurumDeğiştir "+id);
        db.transaction(tx=> {
            tx.executeSql(
              'UPDATE KURAN_HATIM_DETAY SET DURUM=?  WHERE DETAY_ID=? ',
              [(durum==0?1:0),id],
              (tx, results) => {
                console.log('Row Count '+results.rowsAffected);
               
                setCuzDegisim(true);
              },(tx,error)=>{
                console.log(error);
              }
            );
          });
    }
    const [secilenId,setSecilenId]=useState(0);
    const [secilenOkuyan, setSecilenOkuyan]=useState("");
    const [modalGoster,setModalGoster]=useState(false);
    const okuyanDegistir=(id,okuyan)=>{
        console.log("okuyanDegistir ");
        setSecilenId(id);
        setSecilenOkuyan(okuyan);
        setModalGoster(true);
    }

    const okuyanGuncelle = ()=>{
        db.transaction(tx=> {
            tx.executeSql(
              'UPDATE KURAN_HATIM_DETAY SET OKUYAN=?  WHERE DETAY_ID=? ',
              [secilenOkuyan,secilenId],
              (tx, results) => {
                console.log('Row Count '+results.rowsAffected);
               
                setCuzDegisim(true);
              },(tx,error)=>{
                console.log(error);
              }
            );
          });
          setSecilenId(-1);
          setSecilenOkuyan("");
          setModalGoster(false);
    }
    const [okunanCuzEkle,setOkunanCuzEkle] = useState(false);
    const [okunanCuzler,setOkunanCuzler] = useState("");
    const [okuyanKisi,setOkuyanKisi] = useState("");
    const [okunanCuzlerDurum, setOkunanCuzlerDurum] = useState(false);
    const okunanCuzModalGoster=()=>{
        setOkunanCuzEkle(true);
    }
    const okuyanKaydet = ()=>{
        console.log("okunanCuzler "+okunanCuzler);
        console.log("okuyanKisi "+okuyanKisi);
        console.log("okunanCuzlerDurum "+okunanCuzlerDurum);
        if(okunanCuzler.indexOf(",")>=0){
            //Müstakil Cüzler Kaydediliyor
            let cuzArr = okunanCuzler.split(",");
            for(let i=0;i<cuzArr.length;i++){                
                if(parseInt(cuzArr[i].trim())>=1 && parseInt(cuzArr[i].trim())<=30){
                    cuzOkuyanVeDurumKaydet(route.params.hatimId,parseInt(cuzArr[i].trim()),okuyanKisi,(okunanCuzlerDurum? 1 : 0));
                }
            }
        }else if(okunanCuzler.trim().indexOf(" ")>=0){
            let cuzArr = okunanCuzler.split(" ");
            for(let i=parseInt(cuzArr[0]);i<=parseInt(cuzArr[1]);i++){
                if(i>=1 && i<=30){
                    cuzOkuyanVeDurumKaydet(route.params.hatimId,i,okuyanKisi,(okunanCuzlerDurum? 1 : 0));
                }
            }
        }else{
            if(parseInt(okunanCuzler)>=1 && parseInt(okunanCuzler)<=30){
                 cuzOkuyanVeDurumKaydet(route.params.hatimId,parseInt(okunanCuzler),okuyanKisi,(okunanCuzlerDurum? 1 : 0));
            }

        }
        
        setOkunanCuzEkle(false);
        
    }
    const cuzOkuyanVeDurumKaydet=(hatimId,cuzNo,okuyan,durum)=>{
        db.transaction(tx=> {
            tx.executeSql(
              'UPDATE KURAN_HATIM_DETAY SET OKUYAN=?, DURUM=?  WHERE HATIM_ID=? AND CUZ_NO=? ',
              [okuyan,durum,hatimId,cuzNo],
              (tx, results) => {
                console.log('Row Count '+results.rowsAffected);
                setCuzDegisim(true);
                
              },(tx,error)=>{
                console.log(error);
              }
            );
          });
    }
    return (
        <View /*style={styles.containerStyle}*/>
            <View style={styles.containerStyle}>
                <View style={styles.hatimEkle}>
                    <Button title="Cüz Ekle" onPress={okunanCuzModalGoster} containerStyle={styles.cuzEkleButton}/>
                </View>
                <ScrollView style={styles.scrollContainerStyle} contentContainerStyle={{paddingTop: 15, paddingBottom:120}}>
                    {cuzListesi.map(cuz=>{
                        return <KuranHatimDetayItem id={cuz.DETAY_ID} cuzNo={cuz.CUZ_NO} okuyan={cuz.OKUYAN}  durum={cuz.DURUM} durumDegistir={durumDegistir} okuyanDegistir={okuyanDegistir}/>
                    })}
                    


                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalGoster}
                onRequestClose={() => {
                  //Alert.alert("Modal has been closed.");
                  setModalGoster(!modalGoster);
                }}
            >
                <TouchableOpacity 
                    style={styles.container} 
                    activeOpacity={1} 
                    onPressOut={() => {setModalGoster(false)}}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.inputContainer}>
                            <Input style={styles.modalInput} value={secilenOkuyan} placeholder="Okuyan" onChangeText={
                            (okuyan) => setSecilenOkuyan(okuyan) } />
                            <Button title="Güncelle" 
                                containerStyle={styles.button} onPress={okuyanGuncelle}
                            />
                        </View> 
                    </View>   
                </TouchableOpacity>     
            </Modal>
            <Modal animationType="slide"
                transparent={true}
                visible={okunanCuzEkle}
                style={styles.cuzEkleModal}
                onRequestClose={() => {
                  //Alert.alert("Modal has been closed."); 
                  setOkunanCuzEkle(!okunanCuzEkle);
                }}
            >
                <TouchableOpacity 
                    style={styles.container} 
                    activeOpacity={1} 
                    onPressOut={() => {setOkunanCuzEkle(false)}}
                >                
                    <View style={styles.centeredView}>
                        <View style={styles.inputContainer}>
                            <Input style={styles.modalInput} placeholder="Cüzler (1 5->1 den 5 e kadar) (1,5,6->1 5 ve 6)" onChangeText={
                            (cuzler) => setOkunanCuzler(cuzler)
                            } />
                            <Input style={styles.modalInput} placeholder="Okuyan Kişi" onChangeText={
                            (okuyanKisi) => setOkuyanKisi(okuyanKisi)
                            } />
                            <Switch
                                trackColor={{ false: "#767577", true: "#767577" }}
                                thumbColor={okunanCuzlerDurum ? okunduRenk : okunmadiRenk}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setOkunanCuzlerDurum(!okunanCuzlerDurum)}
                                value={okunanCuzlerDurum}
                            />
                            <Text>{okunanCuzlerDurum?"OKUNDU":"OKUNMADI"}</Text>
                            <Button title="Ekle"
                            containerStyle={styles.cuzEkleButton} onPress={okuyanKaydet}/>
                        </View>                        
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>

        
    )
}

export default KuranHatimDetay

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        },
    
    modalInput:{
        width:200,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    inputContainer:{
        width:300,
        alignItems: "center",
        backgroundColor:"white",
        padding:35,
        borderRadius: 20
    },
    button:{
        width: 200,
        //paddingRight:10,
        //marginTop: 10
    },
    /*hatimEkle: {
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:"80%",
        padding:10,
    },*/
    okunanCuzler:{
        bottom:0,
        height:40,
        flex:1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
        width:"20%",
    },
    cuzEkleButton:{
       //flex:1,
        width:200,
        backgroundColor:"#CC2255"
    },containerStyle: {
       // flex: 1,
        backgroundColor : "white"
    },
    headerText: {
        fontWeight:"900",
        color:"#FBFBFB",
        padding: 10
      },
      hatimEkle: {
        //flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        //width:"80%",
        padding:10,
    },
    cuzEkleModal:{
        backgroundColor: "white",
        borderColor:"whitesmoke",
    }
})
