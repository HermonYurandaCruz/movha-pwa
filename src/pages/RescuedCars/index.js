import React, { useEffect, useState } from 'react';
import {Modal,Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import { Ionicons,Feather,SimpleLineIcons  } from '@expo/vector-icons';
import ExibirImagens from '../Home/ExibirImagens'
import {firebase} from '../../services/firebaseConfig'


import { useNavigation,useRoute } from '@react-navigation/native';


export default function RescuedCars() {

    const navigation = useNavigation();
    const route = useRoute();
    const {itemIdUser} = route.params;


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
        loadFavoriteCars();
      } else {
        // Se houver texto de pesquisa, definir a lista filtrada
        setCars(filtered);
      }
    };

// Função para carregar carros favoritos do usuário
const loadFavoriteCars = async () => {
  try {
    // Obtendo uma referência para a coleção 'favoritos'
    const favoritosRef = firebase.firestore().collection('users').doc(itemIdUser).collection('favoritos');

    // Obtendo os documentos da coleção 'favoritos'
    const querySnapshot = await favoritosRef.get();

    // Obtendo os IDs dos carros favoritos
    const carIds = querySnapshot.docs.map((doc) => doc.data().carId);

    // Usando os IDs para consultar a coleção 'cars'
    const carsData = [];
    for (const carId of carIds) {
      const carDoc = await firebase.firestore().collection('cars').doc(carId).get();
      if (carDoc.exists) {
        carsData.push({ id: carDoc.id, ...carDoc.data() });
      }
    }

    // Definindo os dados dos carros no estado
    setCars(carsData);
    console.log('Dados dos carros favoritos:', carsData);
  } catch (error) {
    console.error('Erro ao carregar carros favoritos:', error);
  }
};



 



    useEffect(() => {
      loadFavoriteCars();
    }, [itemIdUser]);
    




    
    const handleInformacoes = async (id,fotosCarro) => {

      navigation.navigate('InfoCar', { itemId: id, fotosCarro:fotosCarro });

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
              <Text style={{fontSize:18, fontWeight:"bold",color:"rgba(0, 0, 0, 0.8)"}}>Guardados</Text>
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
