import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:Constants.statusBarHeight +4 ,
        justifyContent: 'center',
    },
    containerLogo:{
      alignItems:"center"
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
        fontSize:24,
        fontWeight:"bold",
        color:"rgba(41, 82, 74, 0.9)"
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

      TextLogin:{
        fontSize:32,
        fontWeight:"bold",
        marginTop:24,
        color:"rgba(25, 25, 27, 0.9)"
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16,       
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
        fontSize:15,
        fontWeight:"normal",
        color:"rgba(19, 64, 116, 1)",
        marginBottom:8,
      },
      Textm:{
        fontSize:15,
        fontWeight:"normal",
        color:"rgba(25, 25, 27, 0.8)",
      },

      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(19, 64, 116, 1)',
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

      icon: {
        width: 24,
        height: 24,
      },
      errorText:{
        color:"#DD5757",
        marginTop:4,
        fontWeight:"bold"
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
        marginBottom:"auto",
        marginHorizontal:16,

      },
      checkView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8
      },
      titlePopUp: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4
      },
      sim:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"rgba(19, 64, 116, 1)"
      },
      textButton:{
        color:"#FFFFFF"
     },
     inputPopUp: {
      marginTop:8,
      borderBottomWidth: 2, // Define a largura da linha na parte inferior
      borderBottomColor: '#134074', // Define a cor da linha
      marginBottom: 20,
      paddingBottom: 12, // Espaçamento entre o texto e a linha
      fontSize:16,
      width:"100%",
      outlineStyle: "none",

    },

    botoes:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:4
  },
  nao:{
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:4,
    backgroundColor:"#F8F8F8"
  },

});