import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import { Ionicons,Feather,SimpleLineIcons,  } from '@expo/vector-icons';
import ExibirImagens from '../Home/ExibirImagens'
import {firebase} from '../../services/firebaseConfig'


import { useNavigation,useRoute } from '@react-navigation/native';


export default function StoredCar() {

    const navigation = useNavigation();
    const route = useRoute();
    const { itemMarca,itemIdUser} = route.params;

    const [titulo,setTitulo] = useState('Historico de Vendas');

    const [pesquisa, setPesquisa] = useState('');
    const [cars,setCars]= useState([]);


 
  

 

    


    const searchFilter = (text) => {
      const filtered = cars.filter((item) =>
      (item.marca && item.marca.toLowerCase().includes(text.toLowerCase())) ||
      (item.modelo && item.modelo.toLowerCase().includes(text.toLowerCase()))
         );
    
      setPesquisa(text);
    
      if (text === '') {
        // Se o texto da pesquisa estiver vazio, restaurar a lista completa de carros
        loadCars();
      } else {
        // Se houver texto de pesquisa, definir a lista filtrada
        setCars(filtered);
      }
    };


    const loadCarsByUserId = async () => {

      const CarsRef = firebase.firestore().collection('cars');
      const querySnapshot = await CarsRef
      .where('userId', '==', itemIdUser)
      .where('estado', '==', '(Vendido)')
      .get();
      const carData = [];
  
      querySnapshot.forEach((doc) => {
        carData.push({ id: doc.id, ...doc.data() });
      });
  
      setCars(carData);
      console.log('daodos carros ', carData)
     
    };


 

    const loadCars = async () => {
      // Verificar se os dados já estão em cache
      
      const CarsRef = firebase.firestore().collection('cars');
  
      const querySnapshot = await CarsRef
      .where('estado', '!=', '(Vendido)')
      .where('marca', '==', itemMarca)
      .get();
  
      const carData = [];
  
      querySnapshot.forEach((doc) => {
        carData.push({ id: doc.id, ...doc.data() });
      });
        setCars(carData);
    };  

    useEffect(() => {
      if(itemMarca){
          loadCars();
          setTitulo(itemMarca)
      }else{
        loadCarsByUserId();
        
      }
    }, [itemMarca,itemIdUser]);
    




    
    const handleInformacoes = async (id,fotosCarro) => {

      navigation.navigate('InfoCar', { itemId: id,fotosCarro:fotosCarro });

    };
  
    
    const formatPrice = (price) => {
      if(price){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    };



    return (

        <View style={styles.container}>
          <View style={styles.heade}>
              <Ionicons name="arrow-back-outline" size={28} color="rgba(0, 0, 0, 0.8)" onPress={()=>navigation.goBack()} />
              <Text style={{fontSize:18, fontWeight:"bold",color:"rgba(0, 0, 0, 0.8)"}}>{titulo}</Text>
          </View>

        <View style={styles.rouw}>
           <View style={styles.inputPesquisa}>
                <Feather name="search" size={20} color="#19191B" />
                <TextInput
                placeholder='Pesquisar viatura'
                style={styles.input}
                value={pesquisa}
                onChangeText={(text) => searchFilter(text)}
/>
        </View>
      </View>
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
                                  <Text>{cars.marca} {cars.modelo} {cars.ano}</Text>
                                  <Text style={styles.TextTitulo2}>{formatPrice(cars.preco)} Mzn</Text>
                                  <Text style={styles.TextCategoria2}>
                                  <SimpleLineIcons name="location-pin" size={12} color="black" />
                                     {cars.localizacao}</Text>
                                
                                                    
                              </View>
                        </TouchableOpacity>
                      )}
               ></FlatList>
            
                           
   
      </View>
    );}
