import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import {Button,Input,Image} from 'react-native-elements';

const CuzDetayModal = ({detayId,cuzNo,okuyan}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const okuyanGuncelle = ()=>{
        
    }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  //Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
            >
                <Input style={styles.input} value={okuyan} placeholder="Hatim Adı" onChangeText={
                  (hatimAdi) => setHatimAdi(hatimAdi) } />
                <Button title="Güncelle" 
                    containerStyle={styles.button} onPress={okuyanGuncelle}
                />  
            </Modal>
        </View>
    )
}

export default CuzDetayModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }

})
