import React, { useEffect, useState } from 'react';
import {View,ActivityIndicator,TouchableOpacity ,Platform,Modal , TextInput,Text, ScrollView} from 'react-native';
import { Ionicons,AntDesign,SimpleLineIcons,FontAwesome5,MaterialCommunityIcons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import {firebase} from '../../services/firebaseConfig'
import CarrosselDeImagens from './CarrosselDeImagens'
import styles from './styles';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


export default function AddCar() {

    const navigation = useNavigation();
    
    const [vendas, setVendas] = useState('');
    const [publicacoes, setPublicacoes] = useState('');
    const [estadoUser,setEstadoUser]=useState(0)


    const [userData, setUserData] = useState([]);
    const [marca, setMarca] = useState([]);
    const [modelo, setModelo] = useState('');
    const [modeloNome,setModeloNome] = useState('')
    const [categoria, setCategoria] = useState('');
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);
    const [crop, setCrop] = useState({ aspect: 16 / 9 }); // Define a proporção de aspecto para o corte

    const dataCategorias = [
      { id: 1, nome: 'Sedan', value: 'Sedan' },{ id: 2, nome: 'Caminhão', value: 'Caminhão' },
      { id: 3, nome: 'SUV', value: 'SUV' },{ id: 4, nome: 'Van', value: 'Van' },
      { id: 5, nome: 'Carrinha', value: 'Carrinha' },{ id: 6, nome: 'Coupe', value: 'Coupe' },
      { id: 7, nome: 'Autocarro', value: 'Autocarro' },{ id: 8, nome: 'Trator', value: 'Trator' },
      { id: 9, nome: 'Maquinas', value: 'Maquinas' },{ id: 10, nome: 'Autocarro 20 assentos', value: 'Autocarro 20 assentos' },
      { id: 11, nome: 'Motocicleta', value: 'Motocicleta' },{ id: 12, nome: 'Outros', value: 'Outros' },
    ];

    const [estado, setEstado] = useState('');
    const [isFocusEstado, setIsFocusEstado] = useState(false);
    const dataEstado=[
      { id: 1, nome: 'Novo', value: 'Novo' },{ id: 2, nome: 'Usado', value: 'Usado' },
      { id: 3, nome: 'Seminovo', value: 'Seminovo' },{ id: 4, nome: 'Em Manutenção', value: 'Em Manutenção' },
      { id: 5, nome: 'Fora de Uso', value: 'Fora de Uso' }
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



    const [tipoCombustivel, setTipoCombustivel] = useState('');
    const [isFocusCombustivel, setIsFocusCombustivel] = useState(false);

    const dataCombustivel=[
      { id: 1, nome: 'Gasolina ', value: 'Gasolina' },{ id: 2, nome: 'Diesel', value: 'Diesel' },
      { id: 3, nome: 'Eletricidade', value: 'Eletricidade' },{ id: 4, nome: 'Hibrido', value: 'Hibrido' },
      { id: 5, nome: 'Gás ', value: 'Gás ' }
  
    ]

    const [numeroCadeiras, setNumeroCadeiras] = useState('');
    const [isFocusNumeroCadeiras, setIsFocusNumeroCadeiras] = useState(false);

    const dataCadeiras=[
      { id: 1, nome: '2 cadeiras ', value: '2 cadeiras' },{ id: 2, nome: '5 cadeiras', value: '5 cadeiras' },
      { id: 3, nome: '6 cadeiras', value: '6 cadeiras' },{ id: 4, nome: '7 cadeiras', value: '7 cadeiras' },
      { id: 5, nome: '8 cadeiras', value: '8 cadeiras' },{ id: 6, nome: '12 cadeiras', value: '12 cadeiras'},
      { id: 7, nome: ' +12 cadeiras', value: '+12 cadeiras'},{ id: 8, nome: 'Outros', value: 'Outros' }

  
    ]

    const [marcas,setMarcas]= useState([]);
    const [modelos,setModelos]= useState([]);



    const [descricao, setDescricao] = useState('')
    const [ano, sertAno] = useState('')
    const [tamanhoMotor, setMotorTamanho] = useState('')
    const [quilometragem, setQuilometragem] = useState('')
    const [preco, setPreco] = useState('')

  
    const [userId, setUserId] = useState('')


    const [marcaNome, setMarcaNome] = useState('')
    const [marcaId, setMarcaId] = useState('')

    const [imgCarro, setImgCarro] = useState([]);

    const [data, setData] = useState('')
    const [loadingImg, setLoadingImg] = useState(false);



    


   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [isFocus, setIsFocus] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };


  
        const retrieveUserData = async () => {
          const today = getCurrentDate();
          setData(today)
          try {
            const storedUserData = await AsyncStorage.getItem('userData');
            if (storedUserData !== null) {
              setUserData(JSON.parse(storedUserData));
              setUserId(JSON.parse(storedUserData).id); // Mova esta linha para garantir que setUserData foi concluído

            }
          } catch (error) {
            console.error('Erro ao recuperar os dados do usuário:', error);
            // Tratar erros ao recuperar dados do AsyncStorage
          }
        };

        useEffect(() => {
          const carregarDadosAtuais = () => {
            console.log('id do usuario', userId);
        
            // Verificar se userId é válido
            if (userId) {
              const userRef = firebase.firestore().collection('users').doc(userId);
        
              userRef.onSnapshot((userDoc) => {
                if (userDoc.exists) {
                  const userData = userDoc.data();
                  setPublicacoes(userData.publicacoes);
                  setVendas(userData.vendas);
                  setEstadoUser(userData.estado);
                }
              });
            } else {
              console.error('userId é indefinido ou nulo. Verifique a fonte de dados.');
            }
          };
        
          carregarDadosAtuais();
        }, [userId]); // Certifique-se de incluir userId na lista de dependências para que o useEffect seja reexecutado quando userId mudar.
        
       
      

        useEffect(() => {
          const loadCategoria = async () => {
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
      
          loadCategoria();
        }, []);


        const selecionarFotos = () => {
          // Criar um elemento input de tipo arquivo
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.multiple = true;
        
          // Adicionar um ouvinte de evento para quando as imagens forem selecionadas
          input.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
              const images = Array.from(files);
              enviarImagensAoFirebase(images)
              setLoadingImg(true)
            }
          });
        
          // Clicar no elemento input de tipo arquivo para abrir o seletor de arquivos
          input.click();
        };

 
        
        
        const enviarImagensAoFirebase = async (images) => {
          const urlsFotos = await Promise.all(
            images.map(async (selectedImage) => {
              const numeroAleatorio = Math.floor(Math.random() * 1000000);
              const idFoto = `${userId}_${numeroAleatorio}`;
        
              if (selectedImage) {
                try {
                  // Obter a URL temporária da imagem
                  const fotoURL = URL.createObjectURL(selectedImage);
        
                  // Enviar a imagem para o Firebase Storage
                  const response = await fetch(fotoURL);
                  const blob = await response.blob();
                  const storageRef = firebase.storage().ref().child(`fotosCarros/${idFoto}`);
                  await storageRef.put(blob);
                  const fotoDownloadURL = await storageRef.getDownloadURL();
        
                  // Retornar a URL da foto
                  return fotoDownloadURL;
                } catch (error) {
                  console.error('Erro ao enviar a foto para o Firebase Storage:', error);
                  throw error;
                }
              }
            })
          );
        
          console.log('urls das imagens escolhidas', urlsFotos);
          setImgCarro(urlsFotos);
        };
        

    

      function getCurrentDate() {
        const currentDate = new Date();
        return format(currentDate, 'dd/MM/yyyy');
      }

 
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
    


      const handleRegister = async () => {

        setUserId(userData.id)
       
        if (!localizacao||!marcaNome||!estado||!tranmissao||!tipoCombustivel ||!tamanhoMotor ||!ano||!quilometragem||!preco) {
            setErrorText('Por favor, preencha os dados da viatura.');
            return;
          }

         if(imgCarro.length === 0){
          setErrorText('Por favor, adicione imagens da viatura');
          return;
        }

        if (ano.length<4 || ano.length > 4 ) {
          setErrorText('O ano esta incorrecto');
          return;
        }

        if (!data) {
          setErrorText('Por favor, aguarde um momento.');
          return;
        }

        if (!/^[0-9.]*$/.test(tamanhoMotor)) {
          setErrorText('"O campo Tamanho do Motor só pode conter números e ponto.')
          return;
        }
          
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

      

        await firebase.firestore().collection('cars').add({
          descricao:descricao,
          categoria: categoria,
          localizacao: localizacao,
          marca:marcaNome,
          modelo: modeloNome,
          estado: estado,
          tranmissao: tranmissao,
          tipoCombustivel:tipoCombustivel,
          userId: userId,
          fotosCarro: imgCarro,
          numeroCadeiras:numeroCadeiras,
          ano: ano, 
          data:data,
          tamanhoMotor:tamanhoMotor,
          quilometragem:quilometragem,
          preco:preco,
       

        });
        console.log('publicacoes',publicacoes )

        const userRefUser = firebase.firestore().collection('users').doc(userId);
        await userRefUser.update({
          publicacoes: 1 + publicacoes,
        });
        console.log('estado',estadoUser )

        if(estadoUser==0){
          if(publicacoes>30 && vendas>15){
            setShowPopup(true);
          }else{
            navigation.goBack()
            // ToastAndroid.show('Sua Viatura Está Disponível para Visualização!',ToastAndroid.LONG)

          }
        } else{
          navigation.goBack()
          // ToastAndroid.show('Sua Viatura Está Disponível para Visualização!',ToastAndroid.LONG)
        }


        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
      
            setErrorText('Erro ao criar usuário. Por favor, tente novamente.');
        } finally {
            setLoading(false);
            setShowText(true);
          }
      };


      useEffect(()=>{
        retrieveUserData();
        buscarModelosPorMarca(marcaId)
      },[marcaId]);

    return (
      <View style={styles.container}>
          <View style={styles.heade}>
              <Ionicons name="arrow-back-outline" size={28} color="rgba(0, 0, 0, 0.85)" onPress={()=>navigation.goBack()} />
              <Text style={styles.Titulo}>Vender viatura</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
          >
        

        {imgCarro && imgCarro.length > 0 ? (
                  <View style={styles.pdfLoadingBo}>
                 
                    <View style={{width:"100%", height:200, marginBottom:16}}>
                    <CarrosselDeImagens  urlsImagens={imgCarro} />
                    </View>
                    <TouchableOpacity onPress={selecionarFotos}>
                      <Text style={styles.textCapa2}>Mudar fotos</Text>
                    </TouchableOpacity>
                
                  </View>
                ) : (
                  <TouchableOpacity style={styles.pdfLoadingBo} onPress={selecionarFotos}>
                    <AntDesign style={{marginTop:64}} name="camerao" size={64} color="rgba(0, 0, 0, 0.7)" />
                    {loadingImg && (
                        <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="rgba(0, 0, 0, 0.7)" />
                        </View>
                    )}
                    <Text style={styles.textCapa}>Adicionar fotos da viatura</Text>
                  </TouchableOpacity>
                )}

          <Text style={styles.TextDescr}>Descrição</Text>
          <TextInput
          style={styles.input}
          placeholder='Descrição da viatura'
          multiline={true}
          numberOfLines={2}
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
          />   

          <Text style={styles.Text} >Categoria</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataCategorias}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={categoria}
            searchPlaceholder="Pesquisar..."
            value={categoria}
            onFocus={() => setIsFocusCategoria(true)}
            onBlur={() => setIsFocusCategoria(false)}
            onChange={item => {
              setCategoria (item.value);
              setIsFocusCategoria(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <MaterialCommunityIcons 
                style={styles.icon}
                color={isFocusCategoria ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="truck-outline"
                size={20}
              />
            )}
          /> 


          
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



          <Text style={styles.Text} >Estado da viatura</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataEstado}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={estado }
            searchPlaceholder="Pesquisar..."
            value={estado}
            onFocus={() => setIsFocusEstado(true)}
            onBlur={() => setIsFocusEstado(false)}
            onChange={item => {
              setEstado (item.value);
              setIsFocusEstado(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <MaterialCommunityIcons 
                style={styles.icon}
                color={isFocusEstado ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="list-status"
                size={20}
              />
            )}
          /> 

          
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


       
    

          <Text style={styles.Text}>Cadeiras</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataCadeiras}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={numeroCadeiras }
            searchPlaceholder="Pesquisar..."
            value={numeroCadeiras}
            onFocus={() => setIsFocusNumeroCadeiras(true)}
            onBlur={() => setIsFocusNumeroCadeiras(false)}
            onChange={item => {
              setNumeroCadeiras (item.value);
              setIsFocusNumeroCadeiras(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <MaterialCommunityIcons  
                style={styles.icon}
                color={isFocusNumeroCadeiras ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="seat-outline"
                size={20}
              />
            )}
          /> 

          <Text style={styles.Text}>Ano</Text>
          <TextInput
          placeholder='Ano de fabrico'
          style={styles.input}
          keyboardType='numeric'
          value={ano}
          onChangeText={(text) => sertAno(text)}
          />

          <Text style={styles.Text}>Tamanho do motor</Text>
          <TextInput
          style={styles.input}
          placeholder='ex:1,4'    
          value={tamanhoMotor}
          onChangeText={(text) => setMotorTamanho(text)}
          />

          
          <Text style={styles.Text}>Quilometragem</Text>
          <TextInput
              style={styles.input}
              placeholder='ex:144,000'
              keyboardType='numeric'
              value={formatPrice(quilometragem)}
              onChangeText={(text) => {
                // Remove todos os espaços e depois define o valor no estado
                const numericValue = text.replace(/\s/g, '');
                  if(numericValue ===''){
                    setQuilometragem('');
                  }else{
                    setQuilometragem(parseFloat(numericValue));
                  }
              }}
            />
         
         

          <Text style={styles.Text}>Preço</Text>
          <TextInput
    style={styles.input}
    placeholder='Preço do veiculo'
    keyboardType='numeric'
    value={formatPrice(preco)}
    onChangeText={(text) => {
        const numericValue = text.replace(/\s/g, '');
        if (numericValue === '') {
            setPreco(''); 
        } else {
            setPreco(parseFloat(numericValue));
        }
    }}
/>

                            <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={showPopup}
                                  style={styles.modalContainer}
                                  presentationStyle="overFullScreen"
                                  onRequestClose={() => setShowPopup(false)}
                                >
                                  <View style={styles.modalView}>
                                    <Ionicons name="checkmark-circle-outline" size={36} color="rgba(19, 64, 116, 0.8)" />
                                    <Text style={styles.titlePopUp}>Parabéns!</Text>
                                    <Text> Você já pode atualizar o seu perfil para Stand! Envie um email para malyfinder@gmail.com com os seus dados.</Text>
                                    <TouchableOpacity style={styles.buttonPopUP} onPress={()=>navigation.goBack()} >
                                      <Text style={styles.text}>Fechar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  
    
                            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
      {showText && <Text style={styles.text}>Publicar viatura</Text>}

      {loading && (
          <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          </View>
      )}
      </TouchableOpacity> 
          </ScrollView>
    </View>
    );}