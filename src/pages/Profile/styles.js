import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:12,
        
    },
    heade:{
        flexDirection:"row",
        alignItems:"center"
    },
    perfil:{
        alignItems:"center"
    },
    rouw:{
      flexDirection:"row",
      alignItems:"center",
      marginBottom:8,
      justifyContent:"space-between"
  },
 
  inputPesquisa:{
    flexDirection:"row",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    alignItems:"center",
    width:"100%",
    },

    input:{
      fontSize:14,
      color:"#19191B",
      marginStart:8,
      marginEnd:24,
      paddingVertical:2,
      width:'100%',
      outlineStyle: "none",
  },
    botoes:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:4,
      paddingHorizontal:4,
      paddingVertical:2
  },
  
    botoesVendido:{
        alignItems:"center",
        marginTop:4,
        backgroundColor:"rgba(0, 145, 110, 0.8)",
        paddingHorizontal:3,
        paddingVertical:2,
        borderRadius:4,
        marginEnd:2
    },
    botoesEditar:{
      alignItems:"center",
      marginTop:4,
      backgroundColor:"rgba(39, 93, 173, 0.8)",
      paddingHorizontal:3,
      paddingVertical:2,
      borderRadius:4,
      marginEnd:2
  },
  botoesApagar:{
    alignItems:"center",
    marginTop:4,
    backgroundColor:"rgba(247, 23, 53, 0.8)",
    paddingHorizontal:3,
    paddingVertical:2,
    borderRadius:4
},
 
      texto:{
        marginStart:6,
        fontSize:14,
        fontWeight:"normal",
      },

      texto2:{
        fontSize:9,
        fontWeight:"600",
        paddingHorizontal:4,
        color:'#FFFFFF',
        marginBottom:2
      },
      textoSair:{
        fontSize:16,
        fontWeight:"500",
        color:"#F23232",
        fontWeight:"500",

      },
      Titulo:{
        fontSize:18,
        fontWeight:"bold",
        marginBottom:4,
        color:"rgba(25, 25, 27, 0.9)"
    },
    textoNome:{
        fontSize:18,
        fontWeight:"500",
    },
    textoEmail:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(147, 147, 147, 1)",

    },
    img:{
        width:82,
        height: 82,
        marginTop:16,
        borderRadius: 100,

        
    },
    TextHeade:{
        fontSize:18,
        fontWeight:"600",
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
 
      sim:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"rgba(242, 50, 50, 0.9)"
      },
      simVenda:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"rgba(19, 64, 116, 1)"
      },
      nao:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:4,
        backgroundColor:"#F8F8F8"
      },
      textButton:{
         color:"#FFFFFF"
      },

      UserName:{
        fontSize:26,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)",
        marginBottom:8
    },
    boxMaisLidos:{
      borderRadius:8,
      width: '49%', // Cada item ocupa metade da largura da tela
      backgroundColor:"#FFFFFF",
      marginEnd:8,
      marginTop:8
  },
  capaMais:{
    width:"100%",
    height:120,
    borderTopLeftRadius:8,
    borderTopRightRadius:8
},
dadosLivroMais:{
  padding:10
},
    botoes73:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:8
  },
TextTitulo2:{
  fontSize:14,
  fontWeight:"bold",
  color:"rgba(25, 25, 27, 0.9)",
},

TextCategoria2:{
  fontSize:13,
  fontWeight:"normal",
},
})