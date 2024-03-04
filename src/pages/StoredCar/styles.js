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
    heade:{
        flexDirection: "row",
        alignItems:"center",
        marginBottom:16
        },
    text: {
        color:"#FFFFFF",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:16,
      },
       
    UserName:{
        fontSize:26,
        fontWeight:"600",
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
        width:"100%",
    },
    rouw:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8,
        justifyContent:"space-between"
    },
    filter:{
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(19, 64, 116, 0.77)',
        alignItems:"center",
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
    input2: {
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha       
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16,
        width: '100%', // Isso faz com que o input não mude de tamanho

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

    button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(19, 64, 116, 1)',
        marginBottom:10,
        marginTop:16
      },

      buttonFechar: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(242, 50, 50, 0.9)',
        marginBottom:10,
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
    
    loadingLista:{
        paddingBottom:"25%",
    },

    infoBank:{
        marginStart:6
    },
 
    CardRow:{
        flexDirection:"row",
        alignItems:"center"
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
      dadosNome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      inputWrapper: {
        marginRight: 10,
        width: '45%', // Definindo uma largura fixa para os inputs
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
      dropdown: {
        height: 50,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(19, 64, 116, 1)', // Define a cor da linha       
        borderRadius: 8,
      },


});
