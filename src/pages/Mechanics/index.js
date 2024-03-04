import React, { useEffect, useState} from 'react';
import {Image,View,Text,TextInput,Linking,TouchableOpacity, FlatList} from 'react-native';
import {Feather,Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,route } from '@react-navigation/native';




export default function Mechanics() {
  const navigation = useNavigation();
  const [userData,setUserData]= useState([]);
  const [pesquisa, setPesquisa] = useState('');


  const handleCall = (contacto) => {
    if (!contacto) {
      return;
    }
  
    const countryCode = '+258';
    let contactoChamada = contacto;
  
    if (!contacto.startsWith(countryCode)) {
      contactoChamada = `${countryCode}${contacto}`;
    }
  
    window.open(`tel:${contactoChamada}`, '_self');
  };
  


  const loadUserData = () => {
    const UsersRef = firebase.firestore().collection('mecanicos').where('estado', '==', 1).orderBy('numeroVerificacoes', 'desc');
  
    const unsubscribe = UsersRef.onSnapshot((querySnapshot) => {
      const userData = [];
  
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
  
      setUserData(userData);
    });
  
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe = loadUserData();
  
    return () => {
      unsubscribe();   
    };
  }, []);
  

  useEffect(() => {
    loadUserData();
  }, []);




  const searchFilter = (text) => {
    const filtered = userData.filter((item) =>
    (item.nomeMecanico && item.nomeMecanico.toLowerCase().includes(text.toLowerCase()))  );
  
    setPesquisa(text);
  
    if (text === '') {
   
      loadUserData();
    } else {
      setUserData(filtered);
    }
  };



    return (
        <View style={styles.container}>
        <Text style={styles.UserName} >Mecanicos</Text>

        <View style={styles.inputPesquisa}>
                <Feather name="search" size={20} color="#19191B" />
                <TextInput
                placeholder='Pesquisar mecanico'
                style={styles.input}
                value={pesquisa}
                onChangeText={(text) => searchFilter(text)}
                />
        </View>
        <FlatList
                     showsVerticalScrollIndicator={false}
                      data={userData}
                      keyExtractor={users=> String(users.id)} 
                      renderItem={({item:users,index})=>(
                        
                        <View style={styles.CardBank}>
                        <View style={styles.CardRow}>
                            <Image
                                style={styles.imgBank} resizeMode='contain'
                                source={{ uri: users.fotoMecanico }}
                              />
          
                                <View style={{marginStart:8}}>
                                  <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
                                           <Text style={styles.TextTitulo2}>{users.nomeMecanico}    {users.preco}</Text>                                        
                                    
                                  </View>
                                    
                                   
                                    <View style={{justifyContent:"space-between", flexDirection:"row",alignItems:"center"}}>
                                         <View>
                                            <Text>
                                              <Ionicons name="car-sport-outline" size={18} color="black" /> {users.nomeOficina}</Text>
                                          </View>
                                         
                                         
                                    </View>

                                         <Text style={styles.TextAndereco}> 
                                          <Ionicons name="md-location-outline" size={18} color="black" />
                                          {users.localizacaoOficina}</Text>    

                                                             

                                </View>


                                            <TouchableOpacity  style={{ marginLeft: 'auto', alignItems:"center" }} onPress={()=>handleCall(users.contactoMecanico)}>
                                              <Ionicons style={styles.iconBox}  name="call-outline" size={26} color="black" />              
                                           </TouchableOpacity>
                               
                        </View>
                  
                      </View>
                      )}
            ></FlatList>
            
        
   
      </View>
    );}