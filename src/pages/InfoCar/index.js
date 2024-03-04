
import React, { useEffect, useState } from 'react';
import { Modal, View,Text,Linking, ScrollView, Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Ionicons,FontAwesome5,SimpleLineIcons,MaterialIcons,Octicons  } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarrosselDeImagens from './CarrosselDeImagens';
import {Dropdown} from 'react-native-element-dropdown'
import transmission from '../../assets/transmission.png'
import gaspump from '../../assets/gas-pump.png'
import carseat from '../../assets/car-seat.png'
import speedometer from '../../assets/speedometer.png'
import carengine from '../../assets/car-engine.png'




export default function InfoCar() {

    const navigation = useNavigation();
    const route = useRoute();
    const { itemId,fotosCarro} = route.params;
    const [car,setCar]= useState([]);
    const [errorText, setErrorText] = useState('');

    const [userName, setUserName] = useState('');
    const [userApelido, setUserApelido] = useState('');
    const [contacto, setContacto] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [userLogado, setUserLogado] = useState('');
    const [userEstado,setUserEstado]= useState('');
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [showPopup, setShowPopup] = useState(false);


   const [isFavorito, setIsFavorito] = useState(false);


    const [km, setKm] = useState('');
    const [mt, setMt] = useState('');
    const [cc, setCc] = useState('');

    const [report, setReport] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const dataRepor=[
      
      { id: 1, nome: 'Conteúdo Inapropriado ou Ofensivo ', value: 'Conteúdo Inapropriado ou Ofensivo' },{ id: 2, nome: 'Violência ou Perigo', value: 'Violência ou Perigo' },
      { id: 3, nome: 'Spam ou Conteúdo Enganoso', value: 'Spam ou Conteúdo Enganoso' },{ id: 4, nome: 'Violações de Direitos Autorais', value: 'Violações de Direitos Autorais' },
      { id: 5, nome: 'Informações Pessoais ou Privacidade', value: 'Informações Pessoais ou Privacidade' },{ id: 6, nome: 'Assédio ou Bullying', value: 'Assédio ou Bullying' },
      { id: 7, nome: 'Contas Falsas ou Impostoras', value: 'Contas Falsas ou Impostoras' },{ id: 8, nome: 'Quebra das Regras da Comunidade', value: 'Quebra das Regras da Comunidade' },
      { id: 9, nome: 'Outro', value: 'Outro' }
     
  
    ]

   

    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData !== null) {
          const userData = JSON.parse(storedUserData);

          setUserLogado(userData.id); // Mova esta linha para garantir que setUserData foi concluído
          console.log('usuario logado data', userData.id)
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
        // Tratar erros ao recuperar dados do AsyncStorage
      }
    };


  
    const handleCall = () => {
      const countryCode = '+258';
      let contactoChamada = contacto;
  
    if (!contacto.startsWith(countryCode)) {
      contactoChamada = `${countryCode}${contacto}`;
    }
  
    window.open(`tel:${contactoChamada}`, '_self');
    };
    

    const textMesseger =(marca,modelo)=>{
      
      if(!whatsapp){
        // ToastAndroid.show('Sem contacto para Whatsapp', ToastAndroid.SHORT)
        return
      }
      const message = `Olá! 👋 Estou interessado na viatura ${marca} ${modelo} que está anunciada na plataforma Movha. Poderia fornecer mais informações sobre o veículo? `;
      const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${whatsapp }`;
      Linking.openURL(whatsappURL);
  
    }



    const getCarData = async (itemId) => {
        try {
          
          const bookRef = firebase.firestore().collection('cars').doc(itemId);
          bookRef.get().then((doc) => {
            if (doc.exists) {
              setCar(doc.data())
              setKm('km')
              setMt('Mzn')
              setCc('cc')
            } else {
              console.log('A viatura não foi encontrado!');
            }
          }).catch((error) => {
            console.error('Erro ao obter o viatura:', error);
          });
    
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          throw error;
        }
      };





      const ReportFun = async () => {
        if (!report) {
            setErrorText('Você deve selecionar um problema');
            return;
        }
    
        try {
            const reportDocRef = firebase.firestore().collection('report').doc(); // Crie uma nova referência de documento
            await reportDocRef.set({
                reportProblema: report,
                idPost: itemId,
                userLogado: userLogado
            });
            setShowPopup(false);
        } catch (error) {
            console.error('Erro ao salvar o relatório:', error);
        }
    };
    



      const handleProfile = async (id) => {
        navigation.navigate('Profile', { itemId: id });
  
      };

      useEffect(()=>{
        const carregarDadosAtuais = () => {
          console.log('id do usuario',car.userId)
      
          const userRef = firebase.firestore().collection('users').doc(car.userId);
          userRef.onSnapshot((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              setUserName(userData.nome );
              setUserApelido(userData.sobreNome);
              setFotoPerfil(userData.fotoPerfil)
              setContacto(userData.contacto)
              setWhatsapp(userData.whatsapp)
              setUserEstado(userData.estado)
            }
          });
        };
        carregarDadosAtuais();
      },[car.userId])

      const renderIcon = () => {
        if (userEstado === 1) {
             return <MaterialIcons name="verified" size={16} color="#FF9000" />;
             
        }
        return null; 
      };
   
     
      const verificarFavorito = async (userLogado) => {
       
        try {
          console.log('id logado', userLogado);
          console.log('id itemId', itemId);

          const favoritosRef = firebase.firestore().collection('users').doc(userLogado).collection('favoritos');
          const existingFavoritoDoc = await favoritosRef.where('carId', '==', itemId).get();
    
          // Se o documento favorito existir, definir isFavorito como true
          if(existingFavoritoDoc.docs.length > 0){
            setIsFavorito(true);
            console.log('ja esta nos favoritos')
          }else{
            console.log('nao esta nos favoritos')

          }

        } catch (error) {
          console.error('Erro ao verificar favorito:', error);
        }
      };
    
    
      const adicionarOuRemoverFavorito = async () => {
        try {
          if (isFavorito) {
            // Remover do favorito se já existir
            await firebase
              .firestore()
              .collection('users')
              .doc(userLogado)
              .collection('favoritos')
              .where('carId', '==', itemId)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.delete();
                });
              });
          } else {
            // Adicionar aos favoritos se não existir
            await firebase
              .firestore()
              .collection('users')
              .doc(userLogado)
              .collection('favoritos')
              .doc(itemId)
              .set({ carId: itemId });
          }
    
          // Alternar o estado de isFavorito após a operação
          setIsFavorito(!isFavorito);
        } catch (error) {
          console.error('Erro ao adicionar/remover favorito:', error);
        }
      };
    


      useEffect(()=>{
       
        getCarData(itemId);
        retrieveUserData();

        if(userLogado){
          verificarFavorito(userLogado);
        }
      },[itemId,fotosCarro,userLogado])

      const formatPrice = (price) => {
        if(price){
          return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.heade}>
                <Ionicons name="arrow-back-outline" size={28} color="rgba(0, 0, 0, 0.85)" onPress={()=>navigation.goBack()}  />
                <View style={{flexDirection:"row",alignItems:"center"}}>
                
                    <Octicons name="report" size={24} color="rgba(0, 0, 0, 0.65)" onPress={() => setShowPopup(true)}/>
                    <Ionicons
                    style={{ marginStart: 4 }}
                    name={isFavorito ? 'bookmark' : 'bookmark-outline'}
                    size={24}
                    color="rgba(0, 0, 0, 0.85)"
                    onPress={adicionarOuRemoverFavorito}
                  />                 
                </View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.TextMarca}>{car.marca} {car.modelo} {car.ano} {car.estado}</Text>
           
                                  <Text style={styles.TituloPreco}> 
                                  <SimpleLineIcons name="diamond" size={15} color="rgba(0, 0, 0, 0.85)" /> {formatPrice(car.preco)} {mt}
                                  </Text>
                                  <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
                                    
                                    <Text style={styles.Textcheck}>
                                    <Ionicons name="location-outline" size={17} color="rgba(0, 0, 0, 0.85)" /> {car.localizacao}</Text>
                                    <Text style={styles.Textcheck}>{car.data}</Text>
                                  </View>   
            <View >
                 <CarrosselDeImagens urlsImagens={fotosCarro} />
            </View>

            <Text style={styles.Text}>Descrição</Text>
            <Text >{car.descricao}</Text>

            
            <View style={styles.row}>
                  <View style={styles.Veiculo}>
                      <View style={styles.tipoVeiculoMoto}>
                        <Image source={transmission} style={styles.logoMarca}></Image>
                        </View>
                      <Text style={{fontSize:13}}>{car.tranmissao}</Text>
                  </View>

                  <View style={styles.Veiculo}>
                      <View style={styles.tipoVeiculoMoto}>
                        <Image source={carengine} style={styles.logoMarca}></Image>
                        </View>
                      <Text style={{fontSize:13}}>{car.tamanhoMotor} {cc} </Text>
                  </View>
                  
                  <View style={styles.Veiculo}>
                      <View style={styles.tipoVeiculoMoto}>
                        <Image source={gaspump} style={styles.logoMarca}></Image>
                        </View>
                      <Text style={{fontSize:13}}>{car.tipoCombustivel}</Text>
                  </View>

                  <View style={styles.Veiculo}>
                      <View style={styles.tipoVeiculoMoto}>
                        <Image source={carseat} style={styles.logoMarca}></Image>
                        </View>
                      <Text style={{fontSize:13}}>{car.numeroCadeiras}</Text>
                  </View>

                  <View style={styles.Veiculo}>
                      <View style={styles.tipoVeiculoMoto}>
                        <Image source={speedometer} style={styles.logoMarca}></Image>
                        </View>
                      <Text style={{fontSize:13}}>{car.quilometragem} {km}</Text>
                  </View>
            </View>
       


            <Text style={styles.TextContacto}>Contacto para informações</Text>
             <View style={styles.row2} >
                  <TouchableOpacity style={styles.row} onPress={() => handleProfile(car.userId)}>
                       <Image source={{uri:fotoPerfil}} style={styles.imagePerfil}></Image>
                      <Text style={{fontSize:14, marginStart:4,fontWeight:"normal",marginEnd:3}}>{userName} {userApelido}</Text>
                      {renderIcon()}
                  </TouchableOpacity>
                  <View style={styles.row}>
                    <TouchableOpacity onPress={()=>handleCall()}>
                    <Ionicons style={styles.iconBox} name="call-outline" size={23} color="black" />              
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>textMesseger(car.marca,car.modelo,whatsapp)}>
                       <FontAwesome5 style={styles.iconBox} name="whatsapp" size={23} color="black" />
                    </TouchableOpacity>

                  </View>
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
                                  <Text style={{fontSize:22,fontWeight:"bold", marginBottom:8}} >Denúnciar publicação</Text>
                                  <Text>Nossa comunidade é importante para nós e queremos garantir que todos tenham uma experiência segura e positiva.</Text>
                                  <Text style={{marginBottom:4}}>Por favor, selecione abaixo o motivo da sua denúncia:</Text>
                                  
                                  <Text style={styles.Text} >Possíveis Causas ou Problemas:</Text>
                                        <Dropdown
                                          style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
                                          placeholderStyle={styles.placeholderStyle}
                                          selectedTextStyle={styles.selectedTextStyle}
                                          inputSearchStyle={styles.inputSearchStyle}
                                          iconStyle={styles.iconStyle}
                                          data={dataRepor}
                                          search
                                          maxHeight={300}
                                          labelField="nome"
                                          valueField="id"
                                          placeholder={report}
                                          searchPlaceholder="Pesquisar..."
                                          value={report}
                                          onFocus={() => setIsFocus(true)}
                                          onBlur={() => setIsFocus(false)}
                                          onChange={item => {
                                            setReport(item.value)
                                          
                                            setIsFocus(false);
                                          }}
                                          handleRegister
                                          renderLeftIcon={() => (
                                            <Octicons      
                                              style={styles.icon}
                                              color={isFocus ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                                              name="report"
                                              size={16}
                                            />
                                          )}
                                        /> 
                                        
                                        {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

                                        <TouchableOpacity style={styles.button} onPress={ReportFun}  disabled={loading}>
                                        {showText && <Text style={styles.text}>Denunciar</Text>}

                                        {loading && (
                                            <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color="#ffffff" />
                                            </View>
                                        )}
                                        </TouchableOpacity> 

                                        <TouchableOpacity style={styles.buttonFechar} onPress={() => setShowPopup(false)}>
                                          <Text style={styles.text2}>Cancelar</Text>
                                        </TouchableOpacity>
                                 </View>


            </Modal>
        

        </View>
    );}