import React,{useState, useEffect,useLayoutEffect} from 'react'
import { StyleSheet, Text, Alert, View,ScrollView, Modal, TouchableOpacity } from 'react-native'
import * as SQLite from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Button,Input,Image} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import HatimListeItem from '../../components/HatimListeItem';
import Database, { createTable, insert,search  } from 'expo-sqlite-query-helper';

//Database('HatimKontrolOffline.db');
var db = SQLite.openDatabase('HatimKontrolOffline.db');
//const [hatimListesi, setHatimListesi] = useState([]);

const KuranHatimListesi = ({navigation}) => {
    useLayoutEffect(()=>{
      navigation.setOptions({
        title:"Hatim Listesi",
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
                <Text style={styles.headerText}> Kuran-ı Kerim Hatmi Listesi</Text>
            </View>
        )
      });
    },[navigation]);
    
    const [hatimAdi,setHatimAdi] = useState("");
    const [hatimListeDegisimi,setHatimListeDegisimi] = useState(true);
    const [hatimListesi, setHatimListesi] = useState([]);
    //Geri geldiğinde liste güncellensin
    /*useEffect(() => {
       navigation.addListener('focus', () => {
        setHatimListeDegisimi(true);
       });
      //return unsubscribe;
    }, [navigation]);*/
    useEffect(()=>{
        if(hatimListeDegisimi){
          console.log('Liste Getir');
         db.transaction(tx=> {
              tx.executeSql(
                'SELECT T.HATIM_ID,T.HATIM_TURU, T.HATIM_ADI,'+
                '(SELECT COUNT(*) FROM KURAN_HATIM_DETAY WHERE HATIM_ID=T.HATIM_ID AND DURUM=1) AS OKUNAN_ADET '+
                'FROM HATIM_LISTE T WHERE T.HATIM_TURU=?',
                ['KURAN'],
                (tx, results) => {
                  console.log('Row Count '+results.rows.length);
                  var temp = new Array();
                  for(let i=0;i<results.rows.length;i++){                    
                      temp.push(results.rows.item(i));
                      //console.log(temp);
                  }
                  setHatimListesi(temp);
                },(tx,error)=>{
                  console.log(error);
                }
              );
            });
            /*var temp=search("HATIM_LISTE",{HATIM_TURU:"KURAN"},{HATIM_ID:"DESC"});
            console.log(temp);
            setHatimListesi(temp);*/
        } 
        setHatimListeDegisimi(false);
    },[hatimListeDegisimi]);
    const kuranHatmiEkle=()=>{
        console.log("Hatim Ekle");
        //console.log("DB : "+JSON.stringify(db));
        setHatimListeDegisimi(true);
        db.transaction(tx=>{
            
            tx.executeSql(
              'INSERT INTO HATIM_LISTE (HATIM_TURU, HATIM_ADI) VALUES (?,?)',
              ['KURAN', hatimAdi],
              (tx, results) => {
                console.log('Results ' + JSON.stringify(results));
                if (results.rowsAffected > 0) {
                  cuzleriEkle(results.insertId);
                  setHatimListeDegisimi(true);                  
                } else{                   
                  setHatimListeDegisimi(false);
                }
              },
              (tx,error)=>{
                console.log(error);
              }
            );
            //console.log('TX Obj : '+JSON.stringify(tx));
        });
        setModalGoster(false);          
    }
    const cuzleriEkle=(hatimId)=>{      
      db.transaction(tx=>{            
        for(let i=1;i<31;i++){
          tx.executeSql(
            'INSERT INTO KURAN_HATIM_DETAY (HATIM_ID, CUZ_NO, DURUM) VALUES (?,?,?)',
            [hatimId, i,0],
            (tx, results) => {
              console.log('Cüzleri Ekle Results ' + JSON.stringify(results));              
            },
            (tx,error)=>{
              console.log(error);
            }
          );
        }          
      });      
    }
    const hatimSil=(hatimId)=>{
      console.log(hatimId);
      cuzleriSil(hatimId);
      db.transaction(tx=>{            
        tx.executeSql(
          'DELETE FROM HATIM_LISTE WHERE HATIM_ID=? ',
          [hatimId],
          (tx, results) => {
            console.log('Hatim Sil Results ' + JSON.stringify(results));              
          },
          (tx,error)=>{
            console.log(error);
          }
        );          
      });
      setHatimListeDegisimi(true);
    }
    const cuzleriSil=(hatimId)=>{
      db.transaction(tx=>{            
        tx.executeSql(
          'DELETE FROM KURAN_HATIM_DETAY WHERE HATIM_ID=? ',
          [hatimId],
          (tx, results) => {
            console.log('Cüzleri Sil Results ' + JSON.stringify(results));              
          },
          (tx,error)=>{
            console.log(error);
          }
        );          
      });      
    }
    const hatimDetay=(hatimId,hatimTuru,hatimAdi)=>{
      navigation.navigate('KuranHatimDetay',{hatimId:hatimId, hatimAdi:hatimAdi, hatimTuru:hatimTuru});
    }
    const [modalGoster,setModalGoster]=useState(false);
    const hatimEkleModalGoster=()=>{
      //setHatimAdi("");
      setModalGoster(true);
    }
    return (
        <View  style={styles.containerStyle}>
            <View style={styles.hatimEkle}>
               
                <Button style={styles.button} title="Ekle"
                icon={
                    <Icon
                    name="quran"
                    size={20}
                    color="white"
                    style={styles.icon}
                    />
                } 
                containerStyle={styles.button} onPress={hatimEkleModalGoster}/>
            </View>
            <ScrollView style={styles.scrollContainerStyle} contentContainerStyle={{paddingTop: 15}}>
                {hatimListesi.map(hatim=>{
                  return <HatimListeItem id={hatim.HATIM_ID} hatimTuru={hatim.HATIM_TURU}  hatimAdi={hatim.HATIM_ADI} okunanAdet={hatim.OKUNAN_ADET} hatimDetay={hatimDetay} hatimSil={hatimSil} toplamAdet={30}/>
                  })
                }    
            </ScrollView>
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
                            <Input style={styles.modalInput} value={hatimAdi} placeholder="Hatim Adı" onChangeText={
                            (hatimAdi) => setHatimAdi(hatimAdi) } />
                            <Button title="Hatim Ekle" 
                                containerStyle={styles.button} onPress={kuranHatmiEkle}
                            />
                        </View> 
                    </View>   
                </TouchableOpacity>     
            </Modal>    

        </View>
    )
}

export default KuranHatimListesi

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor : "white"
    },
    hatimEkle: {
        //flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        //width:"80%",
        padding:10,
    },
    hatimInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    headerText: {
      fontWeight:"900",
      color:"#FBFBFB",
      padding: 10
    },
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
  icon:{
    padding:5
  },
})
