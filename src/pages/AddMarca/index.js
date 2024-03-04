import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import {Dropdown} from 'react-native-element-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons,FontAwesome5  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';




export default function AdminAdd(){

    const navigation = useNavigation();

 
    const [marca, setMarca] = useState([]);
    const [nomeMarca, setNomeMarca] = useState('');
    const [marcaId, setMarcaId] = useState('');

    const [modelo, setModelo] = useState('');


    const [isFocus, setIsFocus] = useState(false);

   
    const [loading, setLoading] = useState(false);

    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');
   




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
    setLoading(true)
    setErrorText('');

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
          setModelo('')
          setLoading(false)
        } else {
          setErrorText(`Modelo '${modelo}' já existe na base de dados. Ignorando.`);
          setLoading(false)
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
  if (!modelo) {
    setErrorText('Por favor, adicione um modelo ou mais');
    return;
  }
  const modelosAutomaticos = modelo.split(',');
  salvarModelos(marcaId,modelosAutomaticos)
  
}


 

   
   

  

      
    return(
        <ScrollView style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Titulo}> Adicionar Modelos</Text>
                </View>
 
                              

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
              <FontAwesome5     
                style={styles.icon}
                color={isFocus ? 'rgba(19, 64, 116, 1)' : 'rgba(19, 64, 116, 1)'}
                name="opencart"
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

                             
     </ScrollView>
    )
}