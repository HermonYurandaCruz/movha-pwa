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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
      marginTop:"auto",
      marginHorizontal:16,
      marginBottom:"auto"
    },
    titlePopUp: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom:4
    },

    Titulo:{
        fontSize:22,
        fontWeight:"bold",
        marginStart:8,
        color:"rgba(25, 25, 27, 0.9)"
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
        fontWeight:"normal",
        color:"#19191B"
    },
    TextForm:{
        fontSize:16,
        fontWeight:"normal",
        marginTop:8,
        color:"rgba(25, 25, 27, 0.9)"
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16,
        width: '100%', 
        outlineStyle: "none",

      },
      Text:{
        fontSize:16,
        fontWeight:"normal",
        marginTop:6,
        color:"rgba(25, 25, 27, 0.9)"
      },

      TextRecuperar:{
        textAlign:"right",
        fontSize:16,
        fontWeight:"normal",
        marginTop:4,
        color:"#606060",
        marginBottom:8
      },
      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(19, 64, 116, 1)',
      },

      textButton:{
        color:"#FFFFFF"
     },
     simVenda:{
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginEnd:4,
      marginTop:4,
      backgroundColor:"rgba(19, 64, 116, 1)"
    },
      buttonGoogle:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(41, 82, 74, 0.15)',
      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color:"#FFFFFF",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:16,
      },
      textGoogle:{
        color: '#254E46',
        textAlign: 'center',
        marginLeft: 35, 
        fontWeight:"bold",
      },
      Text2:{
        fontSize:15,
        fontWeight:"bold",
        marginStart:4,
        color:"rgba(19, 64, 116, 1)",    
      },
      Text3:{
        fontSize:16,
        fontWeight:"normal",
        marginTop:22,
        marginBottom:22,
        color:"#606060", 
        textAlign:"center"
      },

      Textm:{
        fontSize:15,
        fontWeight:"normal",
        color:"rgba(25, 25, 27, 0.8)",
      },
      errorText:{
        color:"#DD5757",
        marginTop:4,
        fontWeight:"bold",
        marginBottom:24
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
      }

});