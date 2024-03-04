import React, { useEffect, useState } from 'react';
import {View,ActivityIndicator,TouchableOpacity ,Modal,Platform, Image,Linking,Alert , TextInput,Text, ScrollView} from 'react-native';
import { Ionicons,AntDesign,SimpleLineIcons,FontAwesome5,FontAwesome,MaterialCommunityIcons  } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import {firebase} from '../../services/firebaseConfig'
import CarrosselDeImagens from './../AddCar/CarrosselDeImagens'
import styles from './styles';

export default function UpdateCar() {

    const navigation = useNavigation();
    
    const route = useRoute();
    const { itemId} = route.params;

    const [userData, setUserData] = useState([]);
    const [marca, setMarca] = useState([]);
    const [modelo, setModelo] = useState('');
    const [modeloNome,setModeloNome] = useState('')
    const [categoria, setCategoria] = useState('');
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);

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

    const [carDataLoaded, setCarDataLoaded] = useState(false);


    const [data, setData] = useState('')



    


   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [isChecked, setChecked] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };


    const getCarData = async () => {
      try {
        
        const carRef = firebase.firestore().collection('cars').doc(itemId);
         const carDoc =await carRef.get();
      
         if(carDoc.exists){
          const carData=carDoc.data();
          setDescricao(carData.descricao);
          setImgCarro(carData.fotosCarro);
          setPreco(carData.preco);
          sertAno(carData.ano);
          setCategoria(carData.categoria);
          setEstado(carData.estado);
          setLocalizacao(carData.localizacao);
          setMarcaNome(carData.marca);
          setModeloNome(carData.modelo);
          setNumeroCadeiras(carData.numeroCadeiras);
          setQuilometragem(carData.quilometragem);
          setMotorTamanho(carData.tamanhoMotor);
          setTipoCombustivel(carData.tipoCombustivel);
          setTransmissao(carData.tranmissao)
         } else {
          console.error('carro não encontrado.');
        }
  
      } catch (error) {
        console.error('Erro ao buscar carro:', error);
        throw error;
      }
    };
  




        const retrieveUserData = async () => {
          const today = getCurrentDate();
          setData(today);
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
              enviarImagensAoFirebase(images);
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
                  const fotoURL = URL.createObjectURL(selectedImage);

                  // Converter a imagem em um blob
                  const response = await fetch(fotoURL);
                  const blob = await response.blob();
        
                  // Enviar o blob para o Firebase Storage
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
        
          // Após obter as URLs, você pode salvar no Firestore
          // salvarUrlsNoFirestore(urlsFotos);
          console.log('urls das imagens escolhidas',urlsFotos);
          setImgCarro(urlsFotos)

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
    


      const handleUpdate = async () => {
       
        setUserId(userData.id);
        console.log('categoria escolhida', categoria);
      
        if (!imgCarro || !localizacao || !marcaNome || !modeloNome || !estado || !tranmissao || !tipoCombustivel || !tamanhoMotor || !ano || !quilometragem || !preco) {
          setErrorText('Por favor, preencha os dados da viatura.');
          return;
        }
      
        if (ano.length < 4 || ano.length > 4) {
          setErrorText('O ano está incorreto');
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
      
          // Consulta para encontrar o carro existente com base no userId
          const carRef = firebase.firestore().collection('cars').doc(itemId)
               
            // Se o carro já existir, atualize-o
            await carRef.update({
              descricao: descricao,
              categoria: categoria,
              localizacao: localizacao,
              marca: marcaNome,
              modelo: modeloNome,
              estado: estado,
              tranmissao: tranmissao,
              tipoCombustivel: tipoCombustivel,
              userId: userId,
              fotosCarro: imgCarro,
              numeroCadeiras: numeroCadeiras,
              ano: ano,
              data: data,
              tamanhoMotor: tamanhoMotor,
              quilometragem: quilometragem,
              preco: preco,
            });
            navigation.goBack()
            // ToastAndroid.show('Atualização Concluída: Viatura Atualizada com Sucesso!',ToastAndroid.LONG)
      
 
      
        } catch (error) {
          console.error('Erro ao atualizar carro:', error);
          setErrorText('Erro ao atualizar carro. Por favor, tente novamente.');
        } finally {
          setLoading(false);
          setShowText(true);
        }
      };
      


      useEffect(()=>{
   
        retrieveUserData();
        buscarModelosPorMarca(marcaId)
        if (!carDataLoaded) {
          getCarData();
          setCarDataLoaded(true);
        }

      },[marcaId,itemId,carDataLoaded]);

   

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
                    <Text style={styles.textCapa}>Adicionar fotos da viatura</Text>
                  </TouchableOpacity>
                )}

          <Text style={styles.Text}>Descrição</Text>
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
          keyboardType= 'decimal-pad'
          value={tamanhoMotor}
          onChangeText={(text) => setMotorTamanho(text)}
          />
          
          <Text style={styles.Text}>Quilometragem</Text>
          <TextInput
              style={styles.input}
              placeholder='ex:144 000'
              keyboardType='numeric'
              value={formatPrice(quilometragem)}
              onChangeText={(text) => {
                // Remove todos os espaços e depois define o valor no estado
                const numericValue = text.replace(/\s/g, '');
                setQuilometragem(parseFloat(numericValue));
              }}
            />
         
         

          <Text style={styles.Text}>Preço</Text>
          <TextInput
              style={styles.input}
              placeholder='Preço do veiculo'
              keyboardType='numeric'
              value={formatPrice(preco)}
              onChangeText={(text) => {
                // Remover todos os espaços e depois converter de volta para número
                const numericValue = text.replace(/\s/g, '');
                setPreco(parseFloat(numericValue));
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
                                    <Ionicons name="checkmark-done-circle" size={42} color="rgba(19, 64, 116, 1)" />
                                    <Text style={styles.titlePopUp}>Muito Obrigado!</Text>
                                    <Text>Parabéns por publicar o seu livro incrível na plataforma Páginas Africanas. Sua contribuição é valiosa e enriquece nossa comunidade literária.</Text>
                                    <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()} >
                                      <Text style={styles.text}>Fechar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  
    
                            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

    <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
      {showText && <Text style={styles.text}>Atualizar viatura</Text>}

      {loading && (
          <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          </View>
      )}
      </TouchableOpacity>

              

        

                      
          </ScrollView>
    </View>
    );}