import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";

const HatimListeItem = ({id, hatimTuru, hatimAdi,hatimDetay,hatimSil,okunanAdet,toplamAdet}) => {
    return (
        <ListItem key={id} onPress={()=>hatimDetay(id,hatimTuru,hatimAdi)} bottomDivider style={styles.listeContent}>
            <ListItem.Content style={styles.listeContent}>
                 <ListItem.Title style={styles.hatimTuru}>
                     {hatimTuru}
                 </ListItem.Title>
                 <ListItem.Title style={styles.hatimAdi}>
                     {hatimAdi}
                 </ListItem.Title>
                 
                 
                 <View style={styles.adetContent}>
                    <ListItem.Title style={styles.adet}>
                        {okunanAdet}/{toplamAdet}
                    </ListItem.Title>
                    <Icon onPress={()=>hatimSil(id)}
                            name="times-circle"
                            size={30}
                            color="red"
                            style={styles.icon}
                    />
                 </View>
             </ListItem.Content>
             
        </ListItem>
    )
}

export default HatimListeItem

const styles = StyleSheet.create({
    icon:{
       //backgroundColor:"RED",

    },
    listeContent:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",        
    },
    hatimAdi:{
        fontWeight: "800",
        paddingRight:30,
        backgroundColor:"#fff9c4",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 30,
        width:200
    },
    hatimTuru:{
        padding:10,
        //paddingRight:20,
        fontWeight: "800",
        borderRadius:40,
        backgroundColor:"#e1bee7",
    },adetContent:{
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"flex-end",        
    },
    adet:{
        backgroundColor:"#b2dfdb",
        paddingTop:10,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        borderRadius: 30,
        
    }
})
