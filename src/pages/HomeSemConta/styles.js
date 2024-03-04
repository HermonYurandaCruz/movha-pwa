import { StyleSheet,Dimensions} from "react-native";
import Constants from 'expo-constants';



export default StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:12,
    },
    rouw:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:4,
        justifyContent:"space-between"
    },
    rouw2:{
        flexDirection:"row",
        alignItems:"center",
    },

    add:{
        paddingVertical:2,
        paddingHorizontal:4,
        backgroundColor:"rgba(19, 64, 116, 0.1)",
        borderRadius:8
    },
    logoMotorLink:{
        width:38,height:38
    },
    imagePerfil:{
        width:32,height:32,
        borderRadius:6,
        marginStart:4
    },
    dropdown: {
        height: 50,
        borderRadius: 8,
        width:"40%"
      },
    header:{
        position: 'absolute',
        bottom: 10,
        right:10,
        borderRadius: 12,
        paddingEnd:2,
        paddingVertical:2,
        backgroundColor:"#FFFFFF"
    },

       
    UserName:{
        fontSize:25,
        fontWeight:"bold",
        color:"rgba(19, 64, 116, 1)",
    },




    filter:{
        marginStart:6,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(19, 64, 116, 0.77)',
        alignItems:"center",
    },

    
    input:{
        fontSize:16,
        color:"#19191B",
        marginStart:18,
        marginEnd:24,
        paddingVertical:4
    },


    Categoria:{
        borderWidth: 1.2, 
        paddingVertical:20,
        paddingHorizontal:20,
        margin: 4,
        borderRadius: 500,
    },

    Veiculo:{
        alignItems:"center",
        marginEnd:8,
    
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
    tipoVeiculoMoto:{
        alignItems:"center",
        backgroundColor:"rgba(19, 64, 116, 0.1)",
        paddingVertical:8,
        paddingHorizontal:8,
        borderRadius: 12, 
    },
    logoMarca:{
        width:42,
        height:42
    },
    ler:{
        borderWidth: 1.2, 
        borderColor: '#36213E', 
        paddingVertical:8,
        paddingHorizontal:8,
        marginTop:4,
        borderRadius: 8,
        width: 80,
    },

    boxAler:{
        flexDirection:"row",
        borderRadius:12,
        backgroundColor:"#FFFFFF",
        marginEnd:12,
        marginTop:8
    },
    ImagemLivro:{
        padding:12,
        backgroundColor:"#CBF5FF",
        borderTopLeftRadius:12,
        borderBottomLeftRadius:12
    },
    capa:{
        width:65,
        height:90
    },
    dadosLivro:{
        padding:12,
        paddingStart:12,
        paddingEnd:22,
        paddingTop:12,
        paddingBottom:12
    },
    categoriasContainer: {
        paddingVertical: 10,
    },

    boxMaisLidos:{
        borderRadius:8,
        width: '49%', // Cada item ocupa metade da largura da tela
        backgroundColor:"#FFFFFF",
        marginEnd:8,
        marginTop:8
    },
    ImagemLivroMais:{
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        alignItems:"center",
    },
    capaMais:{
        width:"100%",
        height:120,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },


 


  
  
  

    textButton:{
        fontSize:14,
        fontWeight:"normal",
        color:"#FFFFFF"
    },
    boxTItulo:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    dadosLivroMais:{
        padding:10
    },
 
    TextTitulo:{
        fontSize:18,
        fontWeight:"bold",
        color:"rgba(25, 25, 27, 0.9)"
    },
    TextTitulo2:{
        fontSize:16,
        fontWeight:"bold",
        color:"rgba(25, 25, 27, 0.9)",
    },
    Text:{
        fontSize:14,
        fontWeight:"normal",
        color:"rgba(25, 25, 27, 0.9)", 
    },
    curtidasText:{
        fontSize:12,
    },
    coracao:{
        flexDirection:"row",
        padding:4,
        backgroundColor:"#FFF8E0",
        borderRadius:8
    },
    TextCategoria:{
        fontSize:15,
        fontWeight:"normal",
    },

    TextCategoria2:{
        fontSize:12,
        fontWeight:"normal",
    },
 
    estiloRefre:{
        marginTop:18,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    
    loadingLista:{
        paddingBottom:"25%",
    },

    infoBank:{
        marginStart:6
    },
 
    CardRow:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:12,
        marginBottom:12
    },
  


  
    loadingIndicator:{
        position:"absolute",
        paddingTop:"100%",
        paddingStart:"80%"
    },
 

    img:{
        width:42,
        height: 42,
        borderRadius: 100, 
    },

    buttonSim: {
        borderRadius: 8,
        width:"100%",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(19, 64, 116, 1)',
        alignItems:"center",
        marginTop:4     
    },

      buttonNao: {
        borderRadius: 8,
        width:"100%",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor:"#F8F8F8",
        alignItems:"center",
        marginTop:8   


      },




});
