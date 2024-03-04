import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:12,
    },
    heade:{
    flexDirection: "row",
    alignItems:"center",
    marginBottom:16
    },

    dropdown: {
      height: 50,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha       
        borderRadius: 8,
        marginTop:4,
        paddingHorizontal:12
    },
    
    Titulo:{
        fontSize:20,
        fontWeight:"bold",
        marginStart:8,
        color:"rgba(0, 0, 0, 0.85)"
    },

      inputWrapper: {
        marginRight: 10,
        width: '45%', // Definindo uma largura fixa para os inputs
      },
  
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%', // Isso faz com que o input preencha a largura definida
      },
    
    formLogin:{
        paddingTop:8,
        justifyContent: 'space-between',
    },

    containerRecuperar:{
        marginTop:14,
        flexDirection:"row",
    },

    TextBold:{
        fontSize:26,
        fontWeight:"bold",
        color:"#19191B"
    },
    TextBemVindo:{
        fontSize:18,
        fontWeight:"bold",
        color:"#19191B",
        marginTop:24
    },

      pdfLoadingBo:{
        alignItems:"center",
        width:"auto",
        height:250,
        borderRadius:12
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha       
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16,
        width: '100%', // Isso faz com que o input não mude de tamanho
        outlineStyle: "none",

      },
      Text:{
        fontSize:16,
        fontWeight:"bold",
        color:"rgba(0, 0, 0, 0.6)"
        },
        TextDescr:{
          fontSize:16,
          fontWeight:"bold",
          color:"rgba(0, 0, 0, 0.6)",
          marginTop:24
          },

 
      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(19, 64, 116, 1)',
        marginBottom:10
      },

   
  
      textCapa: {
        color:"rgba(0, 0, 0, 0.85)",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:15,
      },
      textCapa2: {
        color:"#FFFFFF",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:14,
        paddingHorizontal:8,
        paddingVertical:1,
        borderRadius:4,
        backgroundColor:"rgba(242, 50, 50, 1)",
        marginTop:24
      },
      text: {
        color:"#FFFFFF",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:16,
      },
  
  
      errorText:{
        color:"#DD5757",
        fontWeight:"normal",
        marginBottom:4,
      },

      icon: {
        width: 24,
        height: 24,
      },
      checkView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8
      },
      Textcheck:{
        fontSize:15,
        marginStart:4,
        fontWeight:"normal"
      },
      TextLer:{
        fontSize:15,
        marginStart:2,
        color:"rgba(19, 64, 116, 1)",
        fontWeight:"bold"
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle:{
        outlineStyle: "none",
        width:"100%"
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define um fundo escuro transparente
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        elevation: 5,
        marginHorizontal:16,
        marginBottom:"auto",
        marginTop:"auto"

      },
      titlePopUp: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:4
      },
      buttonPopUP:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: "10%",
        backgroundColor: 'rgba(19, 64, 116, 1)',
        marginTop:8
      },
      
});