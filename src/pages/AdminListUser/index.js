import React, { useEffect, useState} from 'react';
import {Image,View,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import {Feather,Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,route } from '@react-navigation/native';




export default function AdminListUser() {
  const navigation = useNavigation();
  const [userData,setUserData]= useState([]);
  const [pesquisa, setPesquisa] = useState('');


  const loadUserData = () => {
    const UsersRef = firebase.firestore().collection('users').where('estado', '==', 0);
  
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

  const handleProfile = async (id) => {
    navigation.navigate('Profile', { itemId: id });

  };

  const updateStatus = async (id)=>{
    
    const userRefUser = firebase.firestore().collection('users').doc(id);
    await userRefUser.update({
      estado: 1,
    });

    loadUserData();
  }


  const searchFilter = (text) => {
    const filtered = userData.filter((item) =>
    (item.email && item.email.toLowerCase().includes(text.toLowerCase()))  );
  
    setPesquisa(text);
  
    if (text === '') {
   
      loadUserData();
    } else {
      setUserData(filtered);
    }
  };



    return (
        <View style={styles.container}>
        <Ionicons name="arrow-back-outline" size={26} color="rgba(0, 0, 0, 0.85)" onPress={()=>navigation.goBack()}  />

        <View style={styles.inputPesquisa}>
                <Feather name="search" size={20} color="#19191B" />
                <TextInput
                placeholder='Pesquisar Usuario'
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
                        
                        <TouchableOpacity style={styles.CardBank}  onPress={() => handleProfile(users.id)}>
                        <View style={styles.CardRow}>
                            <Image
                                style={styles.imgBank}
                                source={{ uri: users.fotoPerfil }}
                              />
          
                                <View style={{marginStart:8}}>
                                        <Text style={styles.TextTitulo2}>{users.nome}</Text>
                                    
                                        <Text style={styles.TextAndereco}> 
                                        <Ionicons name="md-location-outline" size={18} color="black" />
                                        {users.localizacao}</Text>
                                        <Text>
                                        <Ionicons name="car-sport-outline" size={18} color="black" /> {users.publicacoes}</Text>
                                       
                                        <TouchableOpacity style={{paddingHorizontal:4,paddingVertical:3, backgroundColor:"#0CCE6B", borderRadius:8}} onPress={()=>updateStatus(users.id)}>
                                         <Text style={{color:"#FFFFFF"}}>Tornar Stand</Text> 
                                        </TouchableOpacity>
                                </View>
                        </View>
                  
                      </TouchableOpacity>
                      )}
            ></FlatList>
            
        
   
      </View>
    );}