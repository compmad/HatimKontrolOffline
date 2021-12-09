import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {ListItem, Switch } from 'react-native-elements';

const okunduRenk = "#b2dfdb";
    const okunmadiRenk = "#f4f3f4";

const KuranHatimDetayItem = ({id,cuzNo,okuyan,durum,durumDegistir,okuyanDegistir}) => {
    
    return (
        <ListItem key={id} onPress={()=>okuyanDegistir(id,okuyan)} bottomDivider>
            <ListItem.Content style={styles.listeContent}>
                 <ListItem.Title style={styles.cuz}>
                     {cuzNo} .Cüz
                 </ListItem.Title>
                 <ListItem.Title style={okuyan!=null?styles.okuyanVar:styles.okuyanYok}>
                     {okuyan}
                 </ListItem.Title>
                 
             </ListItem.Content>
             <View style={styles.okunduContent}>
                <Text style={durum==0?styles.okunmadi:styles.okundu}>
                    {durum==0?"OKUNMADI":"OKUNDU"}
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={durum==0 ? okunmadiRenk : okunduRenk}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>durumDegistir(id,durum)}
                    value={durum==0?false:true}
                />
            </View>
        </ListItem>
    )
}

export default KuranHatimDetayItem

const styles = StyleSheet.create({
    okunmadi:{
        backgroundColor:okunmadiRenk,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:3,
        paddingBottom:3,
        borderRadius: 30
        //alignSelf: "flex-end"        
    },
    okundu:{
        backgroundColor:okunduRenk,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:3,
        paddingBottom:3,
        borderRadius: 30,
    },
    listeContent:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",        
    },
    okunduContent:{
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"flex-end",        
    },
    cuz:{
        padding:10,
        //paddingRight:20,
        fontWeight: "800",
        borderRadius:40,
        backgroundColor:"#e1bee7"

    },
    okuyanVar:{
        fontWeight: "800",
        paddingRight:30,
        backgroundColor:"#fff9c4",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 30,
        width: 150
    },
    okuyanYok:{
        fontWeight: "800",
        paddingRight:30,
        backgroundColor:"white",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 30
    }
})
