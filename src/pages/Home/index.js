import React, { useEffect, useState,useRef} from 'react';
import {Image,View,Text,TouchableOpacity, FlatList,Modal, ScrollView} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExibirImagens from './ExibirImagens';


import { SimpleLineIcons ,Ionicons,MaterialIcons } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'


import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const scrollViewRef = useRef();
    const navigation = useNavigation();
 
    const [marcas,setMarcas]= useState([]);
    const [cars,setCars]= useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [userId, setUserId] = useState('')
    const [estado, setEstado] = useState('')
    const [confirmado, setConfirmado] = useState('')
    const [userName, setUserName] = useState('')



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
          setEstado(userData.estado );
          setConfirmado(userData.confirmado );        
        } 
      });
    };

    const informarStand = () =>{
      console.log('id estados',estado, 'confirmado', confirmado)

      if(estado==1 && confirmado==0){
        setShowPopup(true)
      }
    }

    
    useEffect(() => {
      const loadCategoria = async () => {
        const cachedCategoria = await AsyncStorage.getItem('marcas');
      
        const categoriaRef = firebase.firestore().collection('marcas');
      
        const unsubscribe = categoriaRef.onSnapshot(async (querySnapshot) => {
          const categoriaData = [];
      
          querySnapshot.forEach((doc) => {
            categoriaData.push({ id: doc.id, ...doc.data() });
          });
      
          // Atualizar os dados em cache apenas se houver uma diferença
          if (JSON.stringify(categoriaData) !== cachedCategoria) {
            await AsyncStorage.setItem('marcas', JSON.stringify(categoriaData));
          }
      
          setMarcas(categoriaData);
        });
      
        // Carregar os dados do cache se existirem
        if (cachedCategoria) {
          setMarcas(JSON.parse(cachedCategoria));
        }
      
        return unsubscribe;
      };
      
      loadCategoria();
    }, []);

    useEffect(() => {
      const CarsRef = firebase.firestore().collection('cars').where('estado', '!=', '(Vendido)');
  
      const unsubscribe = CarsRef.onSnapshot((querySnapshot) => {
        const carData = [];
  
        querySnapshot.forEach((doc) => {
          carData.push({ id: doc.id, ...doc.data() });
        });
  
        setCars(carData);
      });
  
      return () => {
        unsubscribe();   
      };
    }, []);

    useEffect(()=>{
      retrieveUserData();
      if(userId){
        carregarDadosAtuais();
        if(estado){
          informarStand();
        }
      }
    },[userId,estado,confirmado])
    
    
    const handleInformacoes = async (id,fotosCarro) => {
      navigation.navigate('InfoCar', { itemId: id,fotosCarro:fotosCarro });
    };

    const handleBuscaPorMarca = async (marca) => {

      navigation.navigate('StoredCar', { itemMarca: marca});

    };

    const handleDefinition = async ()  =>{
      navigation.navigate('UpdateProfile', { itemId: userId });
     
      setShowPopup(false)

      const userRef = firebase.firestore().collection('users').doc(userId);
      await userRef.update({
        confirmado:1
      })
    }
  
    
    const handleNewBookPress = () => {
      navigation.navigate('AddCar');
    };

    const home = () => {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };




    return (
    <View style={styles.container}>

        <View style={styles.rouw}>
          <TouchableOpacity onPress={home}>
          <Text style={styles.UserName} >Movha</Text>
          </TouchableOpacity>
          <View style={styles.rouw2}>
            <Ionicons style={styles.add}  name="add-outline" size={26} color="rgba(19, 64, 116, 1)"  onPress={handleNewBookPress}  />
          </View>
        </View>

        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.TextTitulo}>Busca por marca</Text>
      
      <View style={styles.CardRow}>
      <FlatList
            showsHorizontalScrollIndicator={false}
            initialNumToRender={18}
            data={marcas}
            horizontal={true}
            keyExtractor={marcas=> String(marcas.id)} 
            renderItem={({item:marcas,index})=>(
              <View style={styles.Veiculo}>
                <TouchableOpacity style={styles.tipoVeiculoMoto} onPress={()=>handleBuscaPorMarca(marcas.marca)}>
                <Image source={{uri:marcas.iconMarca}} style={styles.logoMarca}></Image>
                </TouchableOpacity>
              <Text>{marcas.marca}</Text>
            </View>


            )}


      ></FlatList>
      </View>
      <Text style={styles.TextTitulo}>Veículos em Destaque</Text>
          <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cars}
                    initialNumToRender={18}
                    numColumns={2} // Defina o número de colunas
                    keyExtractor={cars=> String(cars.id)} 
                    renderItem={({item:cars,index})=>(
                      
                      <TouchableOpacity style={styles.boxMaisLidos} onPress={() => handleInformacoes(cars.id,cars.fotosCarro)}>
                              <ExibirImagens urlsImagens={cars.fotosCarro} />

                              <View style={styles.dadosLivroMais}>
                                <Text style={styles.Text}>{cars.marca}  {cars.modelo} {cars.ano}</Text>
                                <Text style={styles.TextTitulo2}>{formatPrice(cars.preco)} Mzn</Text>
                                <Text style={styles.TextCategoria2}>
                                <SimpleLineIcons name="location-pin" size={12} color="black" />
                                   {cars.localizacao}</Text>
                              
                                                  
                            </View>
                      </TouchableOpacity>
                    )}
          ></FlatList>
 

 <Modal
                  animationType="slide"
                  transparent={true}
                  visible={showPopup}
                  style={styles.modalContainer}
                  presentationStyle="overFullScreen"
                  onRequestClose={() => setShowPopup(false)}
                   >
                  <View style={styles.modalView}>
                      <MaterialIcons name="verified" size={42} color="#FF9000" />
                      <Text style={styles.TextTitulo2}>Agora seu perfil é uma stand virtual!</Text>
                      <Text style={styles.Text}>Explore as viaturas na aba dedicada aos Stands de Viaturas. Preencha seu perfil com informações importantes e mude o nome para o da sua stand para melhor visibilidade.</Text>

             
                          <TouchableOpacity style={styles.buttonSim}  onPress={handleDefinition} >
                            <Text style={styles.textButton}>Update do Perfil</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonNao} onPress={() => setShowPopup(false)}>
                            <Text style={{fontSize:14}}>Cancelar</Text>
                          </TouchableOpacity>

                     

                    
                      
                  
                  </View>
        </Modal> 

        </ScrollView>

        
   
   
      </View>
    );}
