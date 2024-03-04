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
    marginBottom:4,
    justifyContent:"space-between"
    },

    buttonFechar: {
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: '#F8F8F8',
      marginBottom:10,
    },
    
    Titulo:{
        fontSize:22,
        fontWeight:"bold",
        color:"rgba(0, 0, 0, 0.85)"
    },
    TituloPreco:{
      fontSize:16,
      fontWeight:"bold",
      color:"rgba(0, 0, 0, 0.65)"
  },
  TextMarca:{
    fontSize:15,
    fontWeight:"normal",
    color:"rgba(0, 0, 0, 0.8)",
    marginTop:8
  },
  dropdown: {
    height: 50,
    borderBottomWidth: 2, // Define a largura da linha na parte inferior
    borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha       
    borderRadius: 8,
  },


    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginTop:12
    },
        row2:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingEnd:16,
        marginTop:8,
        marginBottom:8
    },

    imagePerfil:{
      width:42,height:42,
      borderRadius:100,
      marginStart:4
  },

  iconBox:{
    paddingVertical:4,
    paddingHorizontal:6,
    backgroundColor:"rgba(19, 64, 116, 0.1)",
    borderRadius:8,
    marginStart:8
},


  

      Text:{
        fontSize:16,
        fontWeight:"bold",
        color:"rgba(0, 0, 0, 0.90)"
        },
        TextContacto:{
          fontSize:16,
          fontWeight:"bold",
          marginTop:32,
          color:"rgba(0, 0, 0, 0.80)"
          },
  

 
          button: {
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(19, 64, 116, 1)',
            marginBottom:10,
            marginTop:16
          },

   
  
      textCapa: {
        color:"rgba(0, 0, 0, 0.85)",
        fontWeight:"normal",
        fontSize:14,
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
        marginBottom:92,
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
        fontWeight:"normal",
        color:"rgba(0, 0, 0, 0.6)",
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

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define um fundo escuro transparente
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        elevation: 10,
        marginTop:"auto",
        marginBottom:"auto",
        marginHorizontal:16,
        height:"auto",
      },

      titlePopUp: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4
      },
      buttonPopUP:{
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#254E46',
        marginTop:8
      },


      Veiculo:{
        alignItems:"center",
        marginEnd:8,
    
    },
    tipoVeiculoMoto:{
      alignItems:"center",
      backgroundColor:"rgba(141, 169, 196, 0.1)",
      paddingVertical:8,
      paddingHorizontal:8,
      borderRadius: 8, 
  },
  logoMarca:{
    width:22,
    height:22
},
fotoCar:{
  width:"100%",
  height:250,
  borderRadius:8,
  marginTop:4,alignItems:"center"
},
text2: {
  textAlign: 'center',
  fontWeight:"normal",
  fontSize:16,
},


      
});