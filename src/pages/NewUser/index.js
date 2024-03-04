import React, { useState } from 'react';
import {View,ActivityIndicator,TouchableOpacity ,Modal, Linking, TextInput,Text, ScrollView,Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../services/firebaseConfig'

import styles from './styles';

export default function NewUser() {

    const navigation = useNavigation();

    const [nome, setNome] = useState('')
    const [sobreNome, setSobreNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setconfirmarSenha] = useState('')

    const [contacto, setContacto] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [showPopupVendas, setShowPopupVendas] = useState(false);


        const handleLogin = () => {
        navigation.replace('Login');
        };
      

      const openURLServicos=async()=>{
        const url = 'https://movhamozsuport.netlify.app/termos_condicoes.html'; 
        
        const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            console.error('Não é possível abrir o link:', url);
          }
      }


      const handleRegister = async () => {
        if (!nome || !sobreNome || !email || !senha || !confirmarSenha ||!contacto) {
            setErrorText('Por favor, preencha todos os campos obrigatorios.');
            return;
          }
          if(contacto.length != 9){
            setErrorText('Numero de digitos do contacto incorreto.');
          }

          if(whatsapp.length != 9){
            setErrorText('Numero de digitos do whatsapp incorreto.');
          }

        if (senha !== confirmarSenha) {
        setErrorText('As senhas não coincidem.');
        setLoading(false);
        setShowText(true);
        return;
        }

        if (!isChecked) {
            setErrorText('Por favor, aceite os termos e Condicoes .');
            return;
          } 
          
        
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const { user } = userCredential;

        await user.sendEmailVerification();

    
          await firebase.firestore().collection('users').doc(user.uid).set({
            nome: nome,
            sobreNome: sobreNome,
            email: email,
            contacto:contacto,
            whatsapp:whatsapp,
            estado:0,
            vendas:0,
            publicacoes:0,
            confirmado:0,
            descricao:'',
            fotoPerfil:'https://firebasestorage.googleapis.com/v0/b/movha-moz.appspot.com/o/user%20(1).png?alt=media&token=a81be1a6-5951-40be-a115-d31b517e0134'
            // Adicione mais campos personalizados aqui, se necessário
          });
          setShowPopupVendas(true)     
          

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorText('Este e-mail já está em uso. Tente outro endereço de e-mail.');
              } else {
                setErrorText('Erro ao registrar usuário. Por favor, tente novamente.');
              }
      
        } finally {
            setLoading(false);
            setShowText(true);
          }
      };

      

    return (
        <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}
        >
        <View style={styles.heade}>
            <Ionicons name="arrow-back-outline" size={28} color="rgba(25, 25, 27, 0.9)" onPress={handleLogin} />
            <Text style={styles.Titulo}>Nova conta</Text>
        </View>

        <Text style={styles.Text}>Nome</Text>
          <TextInput
          style={styles.input}
          placeholder='Digite o seu Nome'
          value={nome}
          onChangeText={(text) => setNome(text)}

        />
        <Text style={styles.Text}>Apelido</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Digite o seu Apelido'
                        value={sobreNome}
                        onChangeText={(text) => setSobreNome(text)}
                    />

       

        <Text style={styles.Text}>Seu e-mail</Text>
         <TextInput
        placeholder='exemplo@gmail.com'
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.Text}>Seu contacto</Text>
        <TextInput
        placeholder='ex:8XXXXXXXX'
        style={styles.input}
        value={contacto}
        onChangeText={(text) => setContacto(text)}
        />

        <Text style={styles.Text}>Seu whatsapp(opcional)</Text>
        <TextInput
        placeholder='ex:8XXXXXXXX'
        style={styles.input}
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(text)}
        />
    

        <Text style={styles.TextForm}>Senha</Text>
        <TextInput
        style={styles.input}
        placeholder='Digite a sua senha'
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
        />
  
       <Text style={styles.TextForm}>Senha</Text>
        <TextInput
        style={styles.input}
        placeholder='Digite a sua senha'
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={(text) => setconfirmarSenha(text)}
        />

            <View style={styles.checkView}>                         
                     <Checkbox
                      style={styles.checkbox}
                      value={isChecked}
                      onValueChange={setChecked}
                      color={isChecked ? 'rgba(19, 64, 116, 1)' : undefined}
                    />
                    <Text style={styles.Textcheck}>
                    Concordo com os termos e condições.
                    </Text>
                    <Text style={styles.TextLer} onPress={openURLServicos}>
                      Ler   
                    </Text>

                  </View>
  
<View style={{marginBottom:16}}>
<TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
    {showText && <Text style={styles.text}>Registrar Agora</Text>}

    {loading && (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#ffffff" />
        </View>
    )}
    </TouchableOpacity>
    {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

</View>
 
            

        <View style={styles.containerRecuperar}>
        <Text style={styles.Textm}>Tem uma conta?</Text>
        <Text style={styles.Text2} onPress={handleLogin}>Iniciar agora</Text>
        </View>
   <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopupVendas}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopupVendas(false)}
                       >
                      <View style={styles.modalView}>
                          <MaterialCommunityIcons name="email-check-outline" size={36} color="rgba(19, 64, 116, 1)" />
                          <Text style={styles.titlePopUp}>Verificação de E-mail</Text>
                          <Text>Um e-mail foi enviado para verificar seu endereço de e-mail. Por favor, verifique sua caixa de entrada.</Text>

                              <TouchableOpacity style={styles.simVenda} onPress={() =>  navigation.replace('Login') }>
                                <Text style={styles.textButton} >Certo</Text>
                              </TouchableOpacity>

                        
                         

                        
                          
                      
                      </View>
                   </Modal>  
                     
</ScrollView>


    );}