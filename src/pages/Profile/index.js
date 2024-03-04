import React, { useState,useEffect } from 'react';
import {Modal,View,TextInput,ScrollView, FlatList,TouchableOpacity,Text,Image} from 'react-native';
import { Feather,SimpleLineIcons,MaterialCommunityIcons,Ionicons,Fontisto,AntDesign,MaterialIcons } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExibirImagens from '../Home/ExibirImagens'

import styles from './styles';



export default function Profile(){
  const route = useRoute();
  const { itemId} = route.params;
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupVendas, setShowPopupVendas] = useState(false);


  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('')
  const [imagemPerfil, setImagemPerfil] = useState('')
  const [descricao, setDescricao] = useState('')
  const  [userId,setUserId]=useState('')
  const [userApelido, setUserApelido] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [contacto, setContacto] = useState('')
  const [numeroPublicacoes, setNumeroPublicacoes] = useState('')
  const [userVendas,setUserVendas]= useState(0)
  const [idCar, setIdCar] = useState('')
  const [userEstado,setUserEstado]= useState('');


  const [localizacao, setLocalizacao] = useState('')
  const [pesquisa, setPesquisa] = useState('');

  const [cars,setCars]= useState([]);

  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
      // Tratar erros ao recuperar dados do AsyncStorage
    }
  };


  const carregarDadosAtuais = (itemId) => {
    console.log('id do usuario',itemId)

    const userRef = firebase.firestore().collection('users').doc(itemId);
    userRef.onSnapshot((userDoc) => {
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome );
        setUserApelido(userData.sobreNome );
        setUserEmail(userData.email);
        setImagemPerfil(userData.fotoPerfil)
        setDescricao(userData.descricao)
        setContacto(userData.contacto)
        setNumeroPublicacoes(userData.publicacoes)
        setLocalizacao(userData.localizacao)
        setUserVendas(userData.vendas)
        setUserEstado(userData.estado)
      } 
    });
  };



  const handleInformacoes = async (id,fotosCarro) => {

    navigation.navigate('InfoCar', { itemId: id,fotosCarro:fotosCarro });

  };

  




 
const updateStatus = async () => {
try {
   
    const userRef = firebase.firestore().collection('cars').doc(idCar);
        await userRef.update({
          estado: '(Vendido)',
        });

        const userRefUser = firebase.firestore().collection('users').doc(itemId);
        await userRefUser.update({
          vendas: 1 + userVendas,
        });
     
        loadCars();
        setShowPopupVendas(false)

    } catch (error) {
     console.log('erro ao atualizar estado',error)
    } 


  };

  const openPoPDelete =( id)=>{
    setShowPopup(true);
    setIdCar(id)
  }

  const openPoPVendas =( id)=>{
    setShowPopupVendas(true);
    setIdCar(id)
  }

  const deleteCar = async () => {
    try {
      const carRef = firebase.firestore().collection('cars').doc(idCar);
      await carRef.delete();
      console.log('Carro apagado com sucesso.');
      setShowPopup(false)
      loadCars();

    } catch (error) {
      console.error('Erro ao apagar o carro:', error);
    }
  };
  


  const openUpdateCar= (id) => {
    navigation.navigate('UpdateCar', { itemId: id });
  };

  const loadCars = () => {
    const CarsRef = firebase.firestore().collection('cars')
      .where('userId', '==', itemId)
      .where('estado', '!=', '(Vendido)');
  
    const unsubscribe = CarsRef.onSnapshot((querySnapshot) => {
      const carData = [];
  
      querySnapshot.forEach((doc) => {
        carData.push({ id: doc.id, ...doc.data() });
      });
  
      setCars(carData);
      console.log('Dados dos carros: ', carData);
    });
  
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe = loadCars();
  
    return () => {
      unsubscribe();   
    };
  }, []);
  


  useEffect(() => {
    loadCars();

  }, [itemId]);
  

  const formatPrice = (price) => {
    if(price){
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  };






  



  const renderizarComponentes  = (id,idCar) => {
  console.log('userid do post',id, '   id do user Logado',userId);
  if (userId === id) {
    return (
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <TouchableOpacity style={styles.botoesVendido} onPress={()=>openPoPVendas(idCar)}>
          <Ionicons name="checkmark-done-outline" size={14} color="#FFFFFF" />
          <Text style={styles.texto2}>Vendido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botoesEditar} onPress={()=>openUpdateCar(idCar)}>
        <MaterialCommunityIcons name="pencil-outline" size={14} color="#FFFFFF" />
          <Text style={styles.texto2}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botoesApagar} onPress={()=>openPoPDelete(idCar)}>
          <MaterialCommunityIcons name="delete-outline" size={15} color="#FFFFFF" />
          <Text style={styles.texto2}>Apagar</Text>
        </TouchableOpacity>

      </View>
    );
  }
  return null; // Retorna null se o email não corresponder
};


const renderIcon = () => {
  if (userEstado === 1) {
    return <MaterialIcons name="verified" size={16} color="#FF9000" />;
  }
  return null; 
};


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

  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
        carregarDadosAtuais(itemId)

  }, [itemId]);
  
  useEffect(() => {
    if (userData) {
        setUserId(userData.id)
    }

  }, [userData]);

  
 

  



    return(
      <View style={styles.container}>

          <TouchableOpacity style={styles.heade}  onPress={()=>navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={28} color="rgba(0, 0, 0, 0.85)" />
          </TouchableOpacity>
          
         
          <ScrollView
        showsVerticalScrollIndicator={false}
        >

          <View style={{borderRadius:12,alignItems:"center"}}>
               <Image style={{width:92,height:92, padding:12, borderRadius:100,borderWidth:3.5, borderColor:"rgba(19, 64, 116, 1)"}} resizeMode='contain' source={{uri:imagemPerfil}}></Image>
               <View style={{flexDirection:"row",alignItems:"center"}}>
                   <Text style={{fontSize:20,fontWeight:"bold", marginEnd:3}}>{userName} {userApelido}</Text>
                   {renderIcon()}
               </View>
               <Text style={{fontSize:14,width:"100%"}}>{descricao}</Text>
          </View>

            <Text style={styles.Titulo}>Informação</Text>
            <View  >
                
                <TouchableOpacity style={styles.botoes} >
                  <Fontisto name="email" size={17} color="black" />
                  <Text style={styles.texto}>{userEmail}</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.botoes}>
                  <Ionicons name="call-outline" size={17} color="black" />
                  <Text style={styles.texto}>{contacto}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.botoes} >
                  <Ionicons name="location-outline" size={17} color="black" />
                  <Text style={styles.texto}>{localizacao}</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.separator}></View>

            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text style={styles.Titulo}>Publicações</Text>
                <Text styl={{fontSize:14}}>{numeroPublicacoes}</Text>
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

            <View>
            <FlatList
                     showsVerticalScrollIndicator={false}
                      data={cars}
                      initialNumToRender={18}
                      numColumns={2} // Defina o número de colunas
                      keyExtractor={cars=> String(cars.id)} 
                      renderItem={({item:cars})=>(
                        
                        <TouchableOpacity style={styles.boxMaisLidos} onPress={() => handleInformacoes(cars.id,cars.fotosCarro)}>
                        <ExibirImagens urlsImagens={cars.fotosCarro} />
                        <View style={styles.dadosLivroMais}>
                          <Text >{cars.marca} {cars.modelo} {cars.estado}</Text>
                          <Text style={styles.TextTitulo2}>{formatPrice(cars.preco)} Mzn</Text>
                          <Text style={styles.TextCategoria2}>
                          <SimpleLineIcons name="location-pin" size={12} color="black" />
                             {cars.localizacao}</Text>
                          {renderizarComponentes(cars.userId,cars.id)}
                                            
                      </View>
                </TouchableOpacity>
                      )}
            ></FlatList>
            
            </View>

        

          
         
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
                          <MaterialCommunityIcons name="delete-outline" size={36} color="rgba(19, 64, 116, 1)" />
                          <Text>Tem certeza de que deseja apagar a viatura?</Text>

                          <View style={styles.botoes73}>
                              <TouchableOpacity style={styles.sim} onPress={deleteCar}>
                                <Text style={styles.textButton} >Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text >Não</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                   </Modal>  


                   <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopupVendas}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopupVendas(false)}
                       >
                      <View style={styles.modalView}>
                           <AntDesign name="shoppingcart" size={36} color="rgba(19, 64, 116, 1)" />
                          <Text>Vendeste esta viatura?</Text>

                          <View style={styles.botoes73}>
                              <TouchableOpacity style={styles.simVenda} onPress={updateStatus}>
                                <Text style={styles.textButton} >Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopupVendas(false)}>
                                <Text >Não</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                   </Modal>  

      </View>
    )
}