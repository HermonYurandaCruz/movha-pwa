import React, { useEffect, useState } from 'react';
import {Modal,Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons,Feather,MaterialCommunityIcons,SimpleLineIcons,FontAwesome5  } from '@expo/vector-icons';
import ExibirImagens from '../Home/ExibirImagens'
import {firebase} from '../../services/firebaseConfig'
import {Dropdown} from 'react-native-element-dropdown'


import { useNavigation,route } from '@react-navigation/native';


export default function Search() {

    const navigation = useNavigation();


    const [pesquisa, setPesquisa] = useState('');
    const [cars,setCars]= useState([]);

    const [marcas,setMarcas]= useState([]);
    const [marca, setMarca] = useState([]);
    const [marcaNome, setMarcaNome] = useState('')
    const [marcaId, setMarcaId] = useState('')

    const [modelos,setModelos]= useState([]);
    const [modelo, setModelo] = useState('');
    const [modeloNome,setModeloNome] = useState('')

    const [showPopup, setShowPopup] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [precoMin, setPrecoMin] = useState(0);
    const [precoMax, setPrecoMax] = useState(0);

    const formatPrice = (price) => {
      return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '';
    };
    const formatPrice2 = (price) => {
      if(price){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    };
    const [tipoCombustivel, setTipoCombustivel] = useState('');
    const [isFocusCombustivel, setIsFocusCombustivel] = useState(false);

    const dataCombustivel=[
      { id: 1, nome: 'Gasolina ', value: 'Gasolina' },{ id: 2, nome: 'Diesel', value: 'Diesel' },
      { id: 3, nome: 'Eletricidade', value: 'Eletricidade' },{ id: 4, nome: 'Hibrido', value: 'Hibrido' },
      { id: 5, nome: 'Gás ', value: 'Gás ' }
  
    ]

    const [tranmissao, setTransmissao] = useState('');
    const [isFocusTransmissao, setIsFocusTransmissao] = useState(false);
    const dataTransmissao=[
      { id: 1, nome: 'Manual', value: 'Manual' },{ id: 2, nome: 'Automática', value: 'Automática' },
      
    ]

    const [localizacao, setLocalizacao] = useState('');
    const [isFocusLocalizacao, setIsFocusLocalizacao] = useState(false);

    const dataLocalizacao=[
      { id: 11, nome: 'Cidade de Maputo', value: 'Cidade de Maputo' },
      { id: 1, nome: 'Maputo ', value: 'Maputo' },{ id: 2, nome: 'Gaza', value: 'Gaza' },
      { id: 3, nome: 'Inhambane', value: 'Inhambane' },{ id: 4, nome: 'Sofala', value: 'Sofala' },
      { id: 5, nome: 'Manica', value: 'Manica' },{ id: 6, nome: 'Tete', value: 'Tete' },
      { id: 7, nome: 'Zambézia', value: 'Zambézia' },{ id: 8, nome: 'Nampula', value: 'Nampula' },
      { id: 9, nome: 'Cabo Delgado', value: 'Cabo Delgado' },{ id: 10, nome: 'Niassa', value: 'Niassa' },
      
  
    ]

    const [tamanhoMotor, setTamanhoMotor] = useState(0);
    const [isFocusTamanhoMotor, setIsFocusTamanhoMotor] = useState(false);

    const dataTamanhoMotor = [
      { id: 1, nome: "1.0", value: 1.0 },
      { id: 2, nome: "2.0", value: 2.0 },
      { id: 3, nome: "3.0", value: 3.0 },
       { id: 4, nome: "4.0", value: 4.0 },
       { id: 5, nome: "5.0", value: 5.0 },
       { id: 6, nome: "mais", value: 10 },

    ];
    

   


    const searchFilter = (text) => {
      const filtered = cars.filter((item) =>
      (item.marca && item.marca.toLowerCase().includes(text.toLowerCase())) ||
      (item.modelo && item.modelo.toLowerCase().includes(text.toLowerCase()))
         );
    
      setPesquisa(text);
    
      if (text === '') {
        // Se o texto da pesquisa estiver vazio, restaurar a lista completa de carros
        Atualizardados();
      } else {
        // Se houver texto de pesquisa, definir a lista filtrada
        setCars(filtered);
      }
    };


    const aplicarFiltros = () => {
      const resultadoFiltrado = cars.filter((car) => {
        return (
          (!tranmissao || car.tranmissao === tranmissao) &&
          (!localizacao || car.localizacao === localizacao) &&
          (!tipoCombustivel || car.tipoCombustivel === tipoCombustivel) &&
          (!marcaNome || car.marca === marcaNome) &&
          (!modeloNome || car.modelo === modeloNome) &&
          (!tamanhoMotor || car.tamanhoMotor <= tamanhoMotor) &&
          (!precoMin || car.preco >= precoMin) &&
          (!precoMax || car.preco <= precoMax)
        );
      });
  
      setCars(resultadoFiltrado);
      setShowPopup(false)
    };


    const Atualizardados = () => {
       
      loadCars();
      setShowPopup(false)
    };

    const LimparCampos = () => {
     
    setMarcaNome('');
    setModeloNome('');
    setPrecoMax()
    setPrecoMax()
    setLocalizacao('')
    setTamanhoMotor();
    setTipoCombustivel('')
    setTransmissao('')
          loadCars();
    };

    const fecharFiltro = () => {  
    setMarcaNome('');
    setModeloNome('');
    setPrecoMax()
    setPrecoMax()
    setLocalizacao('')
    setTamanhoMotor();
    setTipoCombustivel('')
    setTransmissao('')
          loadCars();
          setShowPopup(false)
    };

  
    
    const loadCars = () => {
      const CarsRef = firebase.firestore().collection('cars').where('estado', '!=', '(Vendido)');
    
      const unsubscribe = CarsRef.onSnapshot((querySnapshot) => {
        const carData = [];
    
        querySnapshot.forEach((doc) => {
          carData.push({ id: doc.id, ...doc.data() });
        });
    
        setCars(carData);
      });
    
      return unsubscribe;
    };
    
    useEffect(() => {
      const unsubscribe = loadCars();
    
      return () => {
        unsubscribe();   
      };
    }, []);
    
    


    const handleFiltersPress = () => {
      Atualizardados()
      setShowPopup(true)
      // navigation.navigate('Filters');
    };

    
    const handleInformacoes = async (id,fotosCarro) => {

      navigation.navigate('InfoCar', { itemId: id,fotosCarro:fotosCarro });

    };
  
    useEffect(() => {
      const loadMarca = async () => {
        // Verificar se os dados já estão em cache
        const cachedCategoria = await AsyncStorage.getItem('marcas');
  
        if (cachedCategoria) {
          setMarcas(JSON.parse(cachedCategoria));
        }
  
        const categoriaRef = firebase.firestore().collection('marcas');
        const querySnapshot = await categoriaRef.get();
        const categoriaData = [];
  
        querySnapshot.forEach((doc) => {
          categoriaData.push({ id: doc.id, ...doc.data() });
        });
  
        // Atualizar os dados em cache apenas se houver uma diferença
        if (JSON.stringify(categoriaData) !== cachedCategoria) {
          await AsyncStorage.setItem('marcas', JSON.stringify(categoriaData));
          setMarcas(categoriaData);
        }
      };
  
      loadMarca();
    }, []);


   const buscarModelosPorMarca = async (idDaMarca) => {
        try {
          const modelosRef = firebase.firestore().collection('marcas').doc(idDaMarca).collection('modelos');
          const modelosSnapshot = await modelosRef.get();
      
          const modelos = modelosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
          console.log('Modelos encontrados:', modelos);
          setModelos(modelos)
        } catch (error) {
          console.error('Erro ao buscar os modelos:', error);
          throw error;
        }
      };

      useEffect(()=>{
        loadCars();
        buscarModelosPorMarca(marcaId)
      },[marcaId]);

    


    return (

        <View style={styles.container}>
        <Text style={styles.UserName} >Pesquisar</Text>


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
            
            <MaterialCommunityIcons style={styles.filter} name="filter-variant" size={24} color="#FFFFFF" onPress={handleFiltersPress} />
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
                                  <Text style={styles.TextTitulo2}>{formatPrice2(cars.preco)} Mzn</Text>
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
                      <Text style={{fontSize:22,fontWeight:"bold", marginBottom:8}} >Filtro</Text>

                      <View style={styles.dadosNome}>
                        <View style={styles.inputWrapper}>
                                
          <Text style={styles.Text} >Marca</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={marcas}
            search
            maxHeight={300}
            labelField="marca"
            valueField="id"
            placeholder={marcaNome }
            searchPlaceholder="Pesquisar..."
            value={marca}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setMarca(item.value)
              setMarcaNome(item.marca);
              setMarcaId(item.id)
              setIsFocus(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <FontAwesome5     
                style={styles.icon}
                color={isFocus ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="opencart"
                size={20}
              />
            )}
          />  
                      
                                    
                       </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Modelo</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={modelos}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={modeloNome}
            searchPlaceholder="Pesquisar..."
            value={modelo}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setModelo (item.value);
              setModeloNome(item.nome);
              setIsFocus(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <Ionicons  
                style={styles.icon}
                color={isFocus ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="car-sport-outline"
                size={20}
              />
            )}
          /> 

                            
                    </View>
                     </View>

                     <View style={styles.dadosNome}>
                        <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Transmissão</Text>
                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={dataTransmissao}
                          search
                          maxHeight={300}
                          labelField="nome"
                          valueField="id"
                          placeholder={tranmissao }
                          searchPlaceholder="Pesquisar..."
                          value={tranmissao}
                          onFocus={() => setIsFocusTransmissao(true)}
                          onBlur={() => setIsFocusTransmissao(false)}
                          onChange={item => {
                            setTransmissao (item.value);
                            setIsFocusTransmissao(false);
                          }}
                          handleRegister
                          renderLeftIcon={() => (
                            <MaterialCommunityIcons 
                              style={styles.icon}
                              color={isFocusTransmissao ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                              name="engine-outline"
                              size={20}
                            />
                          )}
                        /> 
                               
                       </View>

                        <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Combustivel</Text>
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataCombustivel}
                            search
                            maxHeight={300}
                            labelField="nome"
                            valueField="id"
                            placeholder={tipoCombustivel }
                            searchPlaceholder="Pesquisar..."
                            value={tipoCombustivel}
                            onFocus={() => setIsFocusCombustivel(true)}
                            onBlur={() => setIsFocusCombustivel(false)}
                            onChange={item => {
                              setTipoCombustivel (item.value);
                              setIsFocusCombustivel(false);
                            }}
                            handleRegister
                            renderLeftIcon={() => (
                              <SimpleLineIcons 
                                style={styles.icon}
                                color={isFocusCombustivel ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                                name="energy"
                                size={20}
                              />
                            )}
                          />
                            
                        </View>
                     </View>


                     <View style={styles.dadosNome}>
                        <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Localização da viatura</Text>
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataLocalizacao}
                            search
                            maxHeight={300}
                            labelField="nome"
                            valueField="id"
                            placeholder={localizacao }
                            searchPlaceholder="Pesquisar..."
                            value={localizacao}
                            onFocus={() => setIsFocusLocalizacao(true)}
                            onBlur={() => setIsFocusLocalizacao(false)}
                            onChange={item => {
                              setLocalizacao (item.value);
                              setIsFocusLocalizacao(false);
                            }}
                            handleRegister
                            renderLeftIcon={() => (
                              <Ionicons 
                                style={styles.icon}
                                color={isFocusLocalizacao ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                                name="location-outline"
                                size={20}
                              />
                            )}
                          /> 
                               
                       </View>

                      <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Motor menor que...</Text>
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataTamanhoMotor}
                            search
                            maxHeight={300}
                            labelField="nome"
                            valueField="id"
                            placeholder={tamanhoMotor}
                            searchPlaceholder="Pesquisar..."
                            value={tamanhoMotor}
                            onFocus={() => setIsFocusTamanhoMotor(true)}
                            onBlur={() => setIsFocusTamanhoMotor(false)}
                            onChange={item => {
                              setTamanhoMotor (item.value);
                              setIsFocusTamanhoMotor(false);
                            }}
                            handleRegister
                            renderLeftIcon={() => (
                              <SimpleLineIcons 
                                style={styles.icon}
                                color={isFocusTamanhoMotor ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                                name="energy"
                                size={20}
                              />
                            )}
                          />
                            
                        </View>
                     </View>


                     <View style={styles.dadosNome}>
                      
                      <View style={styles.inputWrapper}>
                        <Text style={styles.Text} >Preço max.</Text>
                            <TextInput
                            style={styles.input2}
                            placeholder='preço maximo'
                            keyboardType='numeric'
                            value={formatPrice(precoMax)}
                            onChangeText={(text) => {
                              // Remove todos os espaços e depois define o valor no estado
                              const numericValue = text.replace(/\s/g, '');
                              setPrecoMax(parseFloat(numericValue));
                            }}
                           
                            />
                                             
                        </View>
                     </View>
                     
                     <TouchableOpacity onPress={LimparCampos}>
                          <Text style={{fontSize:14,fontWeight:"bold",color:"rgba(19, 64, 116, 1)"}} >Limpar tudo</Text>
                      </TouchableOpacity>
                    

                     <TouchableOpacity style={styles.button} onPress={aplicarFiltros}  disabled={loading}>
                      {showText && <Text style={styles.text}>Filtrar</Text>}

                      {loading && (
                          <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#ffffff" />
                          </View>
                      )}
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonFechar} onPress={fecharFiltro}>
                        <Text style={styles.text2}>Cancelar</Text>
                      </TouchableOpacity>


                                     
                                    
                                  </View>
                            </Modal>  
   
      </View>
    );}
