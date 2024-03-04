import { StyleSheet,Dimensions} from "react-native";
import Constants from 'expo-constants';



export default StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:12,
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
        color:"rgba(25, 25, 27, 0.9)",
        marginBottom:8
    },

    inputPesquisa:{
        flexDirection:"row",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        alignItems:"center",
        marginBottom:8
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


    Categoria:{
        borderWidth: 1.2, 
        paddingVertical:8,
        paddingHorizontal:12,
        margin: 4,
        borderRadius: 12,
        borderColor:"rgba(54, 33, 62, 0.7)"
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
        flexDirection:"row",
        borderRadius:8,
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
    CardBank:{
        backgroundColor:"#FFFFFF",
        borderRadius:8,
        paddingVertical:8,
        paddingHorizontal:8,
        marginTop:8
    },
    CardRow:{
        flexDirection:"row",
    },
    imgBank:{
        width: 68,
        height: 68,
        borderRadius:8
    },

 


  

    textButton:{
        fontSize:14,
        fontWeight:"normal",
        color:"#36213E"
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
        fontSize:16,
        fontWeight:"bold",
        color:"rgba(25, 25, 27, 0.9)"
    },
    TextTitulo:{
        fontSize:16,
        fontWeight:"bold",
        color:"rgba(25, 25, 27, 0.9)"
    },
    TextTitulo2:{
        fontSize:14,
        fontWeight:"bold",
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
        fontSize:13,
        fontWeight:"normal",
    },
 
    estiloRefre:{
        marginTop:18,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    

 
 
  






});
