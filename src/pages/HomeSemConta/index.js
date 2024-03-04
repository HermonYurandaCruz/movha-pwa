import React, { useEffect, useState,useRef} from 'react';
import {Image,View,Text,TouchableOpacity,Modal, FlatList, ScrollView} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExibirImagens from './ExibirImagens';


import { SimpleLineIcons ,Ionicons,MaterialIcons  } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'


import { useNavigation } from '@react-navigation/native';


export default function HomeSemConta() {
    const scrollViewRef = useRef();
    const navigation = useNavigation();
 
    const [marcas,setMarcas]= useState([]);
    const [cars,setCars]= useState([]);
    const [showPopup, setShowPopup] = useState(false);

    
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
    
    
    const handleInformacoes = async (id,fotosCarro) => {
      navigation.navigate('InfoCar', { itemId: id,fotosCarro:fotosCarro });
    };

    const handleBuscaPorMarca = async (marca) => {

      navigation.navigate('StoredCar', { itemMarca: marca});

    };


    const handleLogin = async () => {
      navigation.navigate('Login');
      setShowPopup(false)

    };
  
    
    const handleNewBookPress  = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        navigation.navigate('AddCar');
        console.log('com conta')
      }else{
        setShowPopup(true)
      }
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
 
        </ScrollView>

        <Modal
                  animationType="slide"
                  transparent={true}
                  visible={showPopup}
                  style={styles.modalContainer}
                  presentationStyle="overFullScreen"
                  onRequestClose={() => setShowPopup(false)}
                   >
                  <View style={styles.modalView}>
                      <MaterialIcons name="login" size={42} color="rgba(19, 64, 116, 1)" />
                      <Text style={styles.TextTitulo2}>Requer Conta ou Início de Sessão</Text>
                      <Text style={styles.Text}>Para publicar uma viatura, por favor crie uma conta ou faça o início de sessão. Agradecemos a sua colaboração!</Text>

             
                          <TouchableOpacity style={styles.buttonSim}  onPress={handleLogin} >
                            <Text style={styles.textButton}>início de sessão</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonNao} onPress={() => setShowPopup(false)}>
                            <Text style={{fontSize:14}}>Cancelar</Text>
                          </TouchableOpacity>

                     

                    
                      
                  
                  </View>
        </Modal> 
   
   
      </View>
    );}
