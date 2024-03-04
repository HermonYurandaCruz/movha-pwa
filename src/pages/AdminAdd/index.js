import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import {Dropdown} from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';




export default function AdminAdd(){

    const navigation = useNavigation();


    const [nome, setNome] = useState('')
    const [fotoURL,setFotoURL]= useState('')
    const [imagemURI, setImagemURI] = useState(null);
    
    const [marca, setMarca] = useState([]);
    const [nomeMarca, setNomeMarca] = useState('');
    const [marcaId, setMarcaId] = useState('');

    const [modelo, setModelo] = useState('');
    const [modelos, setModelos] = useState([]);


    const [isFocus, setIsFocus] = useState(false);

   
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [pergunta, setPergunta]=useState('');
    const [resposta,setResposta]=useState('');

    const [nomeMecanico,setNomeMecanico]=useState('');
    const [preco,setPreco]=useState('');
    const [nomeOficina,setNomeOficina]=useState('');
    const [localizacaoOficina,setLocalizacaoOficina]=useState('');
    const [contactoMecanico,setContactoMecanico]=useState('');










   
    const gravarDados = async () => {
      try {
        const helpsRef = firebase.firestore().collection('helps');
    
        // Adiciona um novo documento com os dados fornecidos
        await helpsRef.add({
          pergunta: pergunta,
          resposta: resposta
        });
        setPergunta('')
        setResposta('')
        console.log('Dados gravados com sucesso na coleção helps.');
      } catch (error) {
        console.error('Erro ao gravar dados:', error);
        throw error;
      }
    };

    const gravarDadosMecanico = async () => {
      try {
        const helpsRef = firebase.firestore().collection('mecanicos');
    
        // Adiciona um novo documento com os dados fornecidos
        await helpsRef.add({
          nomeMecanico: nomeMecanico,
          preco: preco,
          nomeOficina: nomeOficina,
          localizacaoOficina:localizacaoOficina,
          contactoMecanico:contactoMecanico,
          fotoMecanico:fotoURL,
          estado:1,
          numeroVerificacoes:0
        });
       
        setNomeMecanico('')
        setPreco('')
        setNomeOficina('')
        setLocalizacaoOficina('')
        setContactoMecanico('')
        fotoURL('')
  
        console.log('Dados gravados com sucesso na coleção helps.');
      } catch (error) {
        console.error('Erro ao gravar dados:', error);
        throw error;
      }
    };


    const handleRegister = async () => {
      console.log('url do icon', fotoURL);
    
      if (!nome || !fotoURL) {
        setErrorText('Por favor, preencha todos os campos.');
        return;
      }
    
      try {
        setLoading(true);
        setShowText(false);
        setErrorText('');
    
        // Verificar se a marca já existe na base de dados
        const marcaExistente = await firebase.firestore().collection('marcas')
          .where('marca', '==', nome)
          .get();
    
        if (!marcaExistente.empty) {
          setErrorText('Esta marca já está cadastrada.');
          return;
        }
    
        // Se a marca não existir, adiciona à base de dados
        await firebase.firestore().collection('marcas').add({
          marca: nome,
          iconMarca: fotoURL
        });
    
        // Resto do seu código...
        setNome(''),
        setFotoURL(''),
        imagemURI('')
    
      } catch (error) {
        // Se houver um erro durante a verificação ou adição, trate conforme necessário
        console.error('Erro ao cadastrar marca:', error);
        setErrorText('Erro ao cadastrar marca. Por favor, tente novamente.');
      } finally {
        setLoading(false);
        setShowText(true);
      }
    };
    

      // Verifica se o acesso à galeria está permitido e permite se necessário

    
      const selecionarFotos = () => {
        // Criar um elemento input de tipo arquivo
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;
      
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
            const numeroAleatorio2 = Math.floor(Math.random() * 1000000);

            const idFoto = `${numeroAleatorio2}_${numeroAleatorio}`;
      
            if (selectedImage) {
              try {
                // Obter a URL temporária da imagem
                const fotoURL = URL.createObjectURL(selectedImage);
      
                // Enviar a imagem para o Firebase Storage
                const response = await fetch(fotoURL);
                const blob = await response.blob();
                const storageRef = firebase.storage().ref().child(`marca/${idFoto}`);
                await storageRef.put(blob);
                const fotoDownloadURL = await storageRef.getDownloadURL();
                setImagemURI(fotoDownloadURL)
                setFotoURL(fotoDownloadURL)
                // Retornar a URL da foto
              } catch (error) {
                console.error('Erro ao enviar a foto para o Firebase Storage:', error);
                throw error;
              }
            }
          })
        );
      
       
      };

      const selecionarFotoMecanico = () => {
        // Criar um elemento input de tipo arquivo
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;
      
        // Adicionar um ouvinte de evento para quando as imagens forem selecionadas
        input.addEventListener('change', (event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            const images = Array.from(files);
            enviarImagensMecanicoAoFirebase(images);
          }
        });
      
        // Clicar no elemento input de tipo arquivo para abrir o seletor de arquivos
        input.click();
      };

      const enviarImagensMecanicoAoFirebase = async (images) => {
        const urlsFotos = await Promise.all(
          images.map(async (selectedImage) => {
            const numeroAleatorio = Math.floor(Math.random() * 1000000);
            const numeroAleatorio2 = Math.floor(Math.random() * 1000000);

            const idFoto = `${numeroAleatorio2}_${numeroAleatorio}`;
      
            if (selectedImage) {
              try {
                // Obter a URL temporária da imagem
                const fotoURL = URL.createObjectURL(selectedImage);
      
                // Enviar a imagem para o Firebase Storage
                const response = await fetch(fotoURL);
                const blob = await response.blob();
                const storageRef = firebase.storage().ref().child(`mecanicos/${idFoto}`);
                await storageRef.put(blob);
                const fotoDownloadURL = await storageRef.getDownloadURL();
                setImagemURI(fotoDownloadURL)
                setFotoURL(fotoDownloadURL)
                // Retornar a URL da foto
              } catch (error) {
                console.error('Erro ao enviar a foto para o Firebase Storage:', error);
                throw error;
              }
            }
          })
        );
      
       
      };





// const selecionarFotoMecanico = async () => {
// //   setLoading2(true);

// //   console.log('entrou na galeria')
// //   const permissao = await getPermissionAsync();
// //   if (!permissao) return;

// //   try {
// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [1, 1],
// //       quality: 1,
// //     });

// //     const selectedImage = result.assets[0]; // Obter a primeira imagem selecionada, se houver

// //     if (selectedImage && selectedImage.uri) {
// //       const manipResult = await ImageManipulator.manipulateAsync(
// //         selectedImage.uri,
// //         [{ resize: { width: 800, height: 800 } }], // Redimensionar para 800x800 (ajuste conforme necessário)
// //         { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compressão de 70% em formato JPEG
// //       );

// //       const response = await fetch(manipResult.uri);
// //       const blob = await response.blob();

// //       const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
// //       const numeroAleatorio2 = Math.floor(Math.random() * 10000000000000);

// //       const idFoto = `${numeroAleatorio2}_${numeroAleatorio}`;

// //       const storageRef = firebase.storage().ref().child(`mecanicos/${idFoto}`);
// //       await storageRef.put(blob);
// //       const fotoURL = await storageRef.getDownloadURL();

// //       setImagemURI(manipResult.uri);
// //       setFotoURL(fotoURL);
// //       setLoading2(false);

// //     }
// //   } catch (error) {
// //     console.error('Erro ao selecionar a foto:', error);
// //   }
// };

useEffect(() => {
  const loadMarca = async () => {
    // Verificar se os dados já estão em cache
    const cachedMarca= await AsyncStorage.getItem('marcas');

    if (cachedMarca) {
      setMarca(JSON.parse(cachedMarca));
    }

    const marcaRef = firebase.firestore().collection('marcas');
    const querySnapshot = await marcaRef.get();
    const marcaData = [];

    querySnapshot.forEach((doc) => {
      marcaData.push({ id: doc.id, ...doc.data() });
    });

    // Atualizar os dados em cache apenas se houver uma diferença
    if (JSON.stringify(marcaData) !== cachedMarca) {
      await AsyncStorage.setItem('marcas', JSON.stringify(marcaData));
      setMarca(marcaData);

    }

  };

  loadMarca();
}, []);

  const salvarModelos = async (idDaMarca, modelos) => {
    try {
      console.log('id do marca:', idDaMarca, ' modelos:', modelos);
      const modelosRef = firebase.firestore().collection('marcas').doc(idDaMarca).collection('modelos');
  
      // Verificar se cada modelo já existe antes de adicioná-lo
      const modelosExistentes = await modelosRef.get();
  
      modelos.forEach(async (modelo) => {
        const modeloExiste = modelosExistentes.docs.some((doc) => doc.data().nome === modelo);
  
        if (!modeloExiste) {
          await modelosRef.add({
            nome: modelo,
          });
          console.log(`Modelo '${modelo}' adicionado com sucesso.`);
        } else {
          // ToastAndroid.show(`Modelo '${modelo}' já existe na base de dados. Ignorando.`, ToastAndroid.SHORT);
        }
      });
  
      console.log('Modelos salvos com sucesso.');
      setModelo('')
    } catch (error) {
      console.error('Erro ao salvar os modelos:', error);
      throw error;
    }
  };
  

const addModelo=()=>{
  const modelosAutomaticos = modelo.split(',');
  salvarModelos(marcaId,modelosAutomaticos)
}


 

   
   

  

      
    return(
        <ScrollView style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Titulo}> Setups</Text>
                </View>
 
                {imagemURI ? (
                  <View>
                                      <Image style={styles.ImgaEscolhida} source={{ uri: imagemURI }}  />
                                      {loading2 && (
                  <ActivityIndicator size="small"  color="rgba(25, 25, 27, 0.8)" style={styles.loadingIndicator} />
                )}
                  </View>
                  
                ) : (
                  <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={selecionarFotos}>
                  <Ionicons  name="image-outline" size={72} color="rgba(19, 64, 116, 1)" /> 
                  <Text > logotipo da marca</Text>

                 </TouchableOpacity>
                )}
                <Text style={styles.Text}>Nome da marca</Text>
                 <TextInput
                placeholder='atualizar o seu nome'
                style={styles.input}
                value={nome}
                onChangeText={(text) => setNome(text)}
                />
          
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {showText && <Text style={styles.text}>Adicionar Marca</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

                    

          <Text style={styles.Text} >Escolher Marca</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgba(19, 64, 116, 1)' ,borderBottomWidth: 2.5}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={marca}
            search
            maxHeight={300}
            labelField="marca"
            valueField="id"
            placeholder={nomeMarca }
            searchPlaceholder="Pesquisar..."
            value={nomeMarca}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setNomeMarca (item.marca);
              setMarcaId (item.id);
              setIsFocus(false);
            }}
            handleRegister
            renderLeftIcon={() => (
              <Ionicons 
                style={styles.icon}
                color={isFocus ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="location-outline"
                size={20}
              />
            )}
          /> 

            <Text style={styles.Text}>Adicionar Modelo</Text>
                 <TextInput
                placeholder='Modelo'
                style={styles.input}
                value={modelo}
                onChangeText={(text) => setModelo(text)}
                />
          
          <TouchableOpacity style={styles.button} onPress={addModelo} disabled={loading}>
            {showText && <Text style={styles.text}>Adicionar modelos</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}




            <Text style={styles.Text}>Adicionar Mecanico</Text>

            
            {imagemURI ? (
                  <View>
                                      <Image style={styles.ImgaEscolhida} source={{ uri: imagemURI }}  />
                                      {loading2 && (
                  <ActivityIndicator size="small"  color="rgba(25, 25, 27, 0.8)" style={styles.loadingIndicator} />
                )}
                  </View>
                  
                ) : (
                  <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={selecionarFotoMecanico} >
                  <Ionicons  name="image-outline" size={72} color="rgba(19, 64, 116, 1)" /> 
                  <Text > foto do mecanico</Text>

                 </TouchableOpacity>
                )}
                <Text style={styles.Text}>Nome do Mecanico</Text>
                 <TextInput
                placeholder='Nome do Mecanico'
                style={styles.input}
                value={nomeMecanico}
                onChangeText={(text) => setNomeMecanico(text)}
                />

                <Text style={styles.Text}>Nome da Oficina</Text>
                 <TextInput
                placeholder='Oficina'
                style={styles.input}
                value={nomeOficina}
                onChangeText={(text) => setNomeOficina(text)}
                />

                <Text style={styles.Text}>Localização da Oficina</Text>
                 <TextInput
                placeholder='Localizacao da Oficina'
                style={styles.input}
                value={localizacaoOficina}
                onChangeText={(text) => setLocalizacaoOficina(text)}
                />

                <Text style={styles.Text}>Contacto do Mecanico</Text>
                 <TextInput
                placeholder='8XXXXXXXX'
                style={styles.input}
                value={contactoMecanico}
                onChangeText={(text) => setContactoMecanico(text)}
                />

              <Text style={styles.Text}>Preco</Text>
                 <TextInput
                placeholder=' XXX 00 Mt'
                style={styles.input}
                value={preco}
                onChangeText={(text) => setPreco(text)}
                />

          <TouchableOpacity style={styles.button} onPress={gravarDadosMecanico} disabled={loading}>
            {showText && <Text style={styles.text}>Adicionar Mecanico</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

















            <Text style={styles.Text}>Adicionar perguntas mais frequentes</Text>

                <Text style={styles.Text}>Pergunta</Text>
                <TextInput
                placeholder='Modelo'
                style={styles.input}
                value={pergunta}
                onChangeText={(text) => setPergunta(text)}
                />

                <Text style={styles.Text}>Resposta</Text>
                <TextInput
                placeholder='Modelo'
                style={styles.input}
                value={resposta}
                onChangeText={(text) => setResposta(text)}
                />
          
          <TouchableOpacity style={styles.button} onPress={gravarDados} disabled={loading}>
            {showText && <Text style={styles.text}>Adicionar Ajuda</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

               
           
                

                             
     </ScrollView>
    )
}