import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:12,
        marginBottom:24
    },
    heade:{
    flexDirection: "row",
    alignItems:"center",
    marginBottom:16
    },

    Titulo:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)"
    },

    ImgaEscolhida:{
      width: 100, 
      height: 100, 
      borderRadius:100,
      marginStart:"30%",
      alignItems:"center"
    },
    dadosNome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop:12
      },
      inputWrapper: {
        marginRight: 10,
        width: '45%', // Definindo uma largura fixa para os inputs
      },
  

    
      inputSearchStyle:{
        width: '100%', 
        outlineStyle: "none",
      },
      
    formLogin:{
        paddingTop:8,
        justifyContent: 'space-between',
    },

    containerRecuperar:{
        marginTop:32,
        flexDirection:"row",
    },

    TextBold:{
        fontSize:26,
        fontWeight:"700",
        color:"#19191B"
    },
    TextBemVindo:{
        fontSize:18,
        fontWeight:"400",
        color:"#19191B"
    },
    TextForm:{
        fontSize:16,
        fontWeight:"400",
        marginTop:8,
        color:"#606060"
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, 
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12,
        fontSize:16,
        width: '100%', 
        outlineStyle: "none",
      },
      Text:{
        fontSize:16,
        fontWeight:"500",
        marginTop:6,
        color:"rgba(25, 25, 27, 0.9)"
      },
      img:{
        width:72,
        height: 72,
        marginTop:24
    },

      TextRecuperar:{
        textAlign:"right",
        fontSize:16,
        fontWeight:"400",
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
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",

      },
      textGoogle:{
        color: '#254E46',
        textAlign: 'center',
        marginLeft: 35, 
        fontWeight:"bold",
      },
      Text2:{
        fontSize:16,
        fontWeight:"400",
        marginTop:6,
        color:"#0F5257", 
        marginStart:4,
        fontWeight:"500"
      },
      Text3:{
        fontSize:16,
        fontWeight:"400",
        marginTop:22,
        marginBottom:22,
        color:"#606060", 
        textAlign:"center"
      },

      errorText:{
        color:"#DD5757",
        marginTop:4,
        fontWeight:"600"
      },

      icon: {
        width: 24,
        height: 24,
      }

});