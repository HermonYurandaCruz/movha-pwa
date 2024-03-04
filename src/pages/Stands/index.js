import React, { useEffect, useState} from 'react';
import {Image,View,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import {Feather,Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,route } from '@react-navigation/native';




export default function Stands() {
  const navigation = useNavigation();
  const [userData,setUserData]= useState([]);
  const [pesquisa, setPesquisa] = useState('');


  const loadUserData = () => {
    const UsersRef = firebase.firestore().collection('users').where('estado', '==', 1).orderBy('vendas', 'desc');
  
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


  const searchFilter = (text) => {
    const filtered = userData.filter((item) =>
    (item.nome && item.nome.toLowerCase().includes(text.toLowerCase()))  );
  
    setPesquisa(text);
  
    if (text === '') {
   
      loadUserData();
    } else {
      setUserData(filtered);
    }
  };



    return (
        <View style={styles.container}>
        <Text style={styles.UserName} >Stands</Text>

        <View style={styles.inputPesquisa}>
                <Feather name="search" size={20} color="#19191B" />
                <TextInput
                placeholder='Pesquisar Stand'
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
                                resizeMode='contain'
                                source={{ uri: users.fotoPerfil }}
                              />
          
                                <View style={{marginStart:8}}>
                                        <Text style={styles.TextTitulo2}>{users.nome}</Text>
                                    
                                        <Text style={styles.TextAndereco}> 
                                        <Ionicons name="md-location-outline" size={18} color="black" />
                                        {users.localizacao}</Text>
                                        <Text>
                                        <Ionicons name="car-sport-outline" size={18} color="black" /> {users.publicacoes}</Text>
                                </View>
                        </View>
                  
                      </TouchableOpacity>
                      )}
            ></FlatList>
            
        
   
      </View>
    );}