import React, { useState,useEffect,useLayoutEffect } from 'react';
import {View,Linking,ScrollView, Modal,TouchableOpacity,Text,Image} from 'react-native';
import { AntDesign,Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import { tr } from 'date-fns/locale';



export default function Setting(){
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('')

  const [fotoPerfil, setFotoPerfil] = useState('')

  const [userApelido, setUserApelido] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [estado, setEstado] = useState('')



  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        const userData = JSON.parse(storedUserData);
        setUserId(userData.id);
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
      // Tratar erros ao recuperar dados do AsyncStorage
    }
  };
  


  const carregarDadosAtuais = () => {
    console.log('id encontrado',userId)
    const userRef = firebase.firestore().collection('users').doc(userId);
    userRef.onSnapshot((userDoc) => {
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome );
        setUserApelido(userData.sobreNome );
        setUserEmail(userData.email );
        setFotoPerfil(userData.fotoPerfil)
        setEstado(userData.estado) 

      } 
    });
  };



  const abrirPOP= async ()=>{
    setShowPopup(true);

  }

  const UpdateProfile=()=>{
    console.log('id do usuario antes',userId)
    navigation.navigate('UpdateProfile', { itemId: userId });
    
  }

  const UpdatePassword=()=>{
    console.log('id do usuario antes',userId)

    navigation.navigate('UpdatePassword', { itemId: userId, emailUser:userEmail });
    
  }



  const openProfile = () => {
    navigation.navigate('Profile' , { itemId: userId });
  };

  const openHelp = () => {
    navigation.navigate('Help');
  };

  const openAdmin = () => {
    navigation.navigate('AdminAdd');
  };

  const openAddMarca = () => {
    navigation.navigate('AddMarca');
  };

  const ListUsers = () => {
    navigation.navigate('AdminListUser');
  };

  const AdminListStands = () => {
    navigation.navigate('AdminListStands');
  };
  const handleVendas = async () => {
    navigation.navigate('StoredCar', {itemIdUser:userId });
  };

  const openStoredCar= () => {
    navigation.navigate('RescuedCars',{itemIdUser:userId});
  };


const openURLServicos=async()=>{
  const url = 'https://movhamozsuport.netlify.app/termos_condicoes.html'; // TERMOS DE USO URL que deseja abrir
  
  const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Não é possível abrir o link:', url);
    }
}

  const openURLPoliticas = async () => {
    const url = 'https://movhamozsuport.netlify.app/politica_privacidade.html'; //  URL que deseja abrir

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Não é possível abrir o link:', url);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      // navigation.popToTop('Login');
      navigation.navigate('Login');
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }



  



  const renderizarComponentes  = () => {

  if (userEmail === 'malyfinder@gmail.com') {
    return (
      <View>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.botoes} onPress={openAdmin}>
          <AntDesign name="addfile" size={20} color="#000" />    
          <Text style={styles.texto}>Adicionar marca</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.botoes} onPress={ListUsers}>
          <AntDesign name="addusergroup" size={20} color="#000" />    
          <Text style={styles.texto}>Lista de usuarios</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.botoes} onPress={AdminListStands}>
          <MaterialCommunityIcons name="briefcase-check-outline" size={20} color="#000"/>
          <Text style={styles.texto}>Lista de Stands</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        
      </View>
    );
  }
  return null; 
};

const renderizarAdd  = () => {
console.log('informacao do estado', estado)
  if (estado == 1) {
    return (
      <View>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.botoes} onPress={openAddMarca}>
          <AntDesign name="addfile" size={20} color="#000" />    
          <Text style={styles.texto}>Adicionar modelo</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
      
      </View>
    );
  }
  return null; 
};



useEffect(() => {
  retrieveUserData();
}, []);

useEffect(() => {
  if(userId){
    carregarDadosAtuais()
  }
}, [userId]);


  



    return(
      <View style={styles.container}>

          <View style={styles.heade}>
                    <Text style={styles.UserName} >Definições</Text>
          </View>
          
         
          <ScrollView
        showsVerticalScrollIndicator={false}
        >

          <TouchableOpacity style={{flexDirection:"row", padding:8,backgroundColor:"#FFFFFF",borderRadius:8}} onPress={openProfile}>
            <Image style={{width:60,height:60, borderRadius:100}} resizeMode='contain' source={{uri:fotoPerfil}}></Image>
            <View style={{marginStart:6}}>
              <Text style={{fontSize:18,fontWeight:"bold"}}>{userName} {userApelido}</Text>
              <Text >{userEmail}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.Titulo}>Perfil</Text>           
            <View style={styles.box}>
                
                <TouchableOpacity style={styles.botoes} onPress={UpdateProfile}>
                  <AntDesign name="edit" size={20} color="black" />
                  <Text style={styles.texto}>Editar Perfil</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                <TouchableOpacity style={styles.botoes} onPress={UpdatePassword}>
                  <MaterialCommunityIcons name="form-textbox-password" size={20} color="black" />
                  <Text style={styles.texto}>Mudar senha</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <TouchableOpacity style={styles.botoes} onPress={handleVendas}>
                  <MaterialIcons name="history" size={20} color="black" />
                  <Text style={styles.texto}>Historico de vendas</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                <TouchableOpacity style={styles.botoes} onPress={openStoredCar}>
                  <MaterialIcons name="bookmark-outline" size={20} color="black" />
                  <Text style={styles.texto}>Guardados</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Suporte</Text>
            <View style={styles.box}>
                
                <TouchableOpacity style={styles.botoes} onPress={openHelp} >
                  <Ionicons name="md-help-buoy-outline" size={20} color="black" />
                  <Text style={styles.texto}>Obter ajuda</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                
                <TouchableOpacity style={styles.botoes}onPress={openURLServicos}>
                  <Ionicons name="ios-document-text-outline" size={20} color="black" /> 
                  <Text style={styles.texto}>Termos e Condições</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <TouchableOpacity style={styles.botoes} onPress={openURLPoliticas}>
                  <AntDesign name="lock" size={20} color="black" />   
                  <Text style={styles.texto}>Política de Privacidade</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Conta</Text>
            <View style={styles.box}>
            {renderizarComponentes()}
            {renderizarAdd()}
                <TouchableOpacity style={styles.botoes} onPress={abrirPOP}>
                  <MaterialIcons name="logout" size={20} color="#F23232" />
                  <Text style={styles.textoSair}>Terminar sessão</Text>
                </TouchableOpacity>


          

                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopup}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopup(false)}
                       >
                      <View style={styles.modalView}>
                          <MaterialIcons name="logout" size={36} color="rgba(19, 64, 116, 1)" />
                          <Text>Tem certeza de que deseja sair?</Text>

                              <TouchableOpacity style={styles.sim} onPress={handleLogout}>
                                <Text >Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text style={styles.textButton}>Não</Text>
                              </TouchableOpacity>

                         

                        
                          
                      
                      </View>
                </Modal>  


            </View>
         
            </ScrollView>

      </View>
    )
}