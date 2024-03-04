import React from 'react';
import { View, Image,ActivityIndicator } from 'react-native';
import styles from './styles';

const ExibirImagens = ({ urlsImagens }) => {
    if (!urlsImagens || urlsImagens.length === 0) {
      // Renderizar um indicador de carregamento ou mensagem enquanto as imagens estão sendo carregadas
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    // Exibir apenas a primeira imagem
    const primeiraImagem = urlsImagens[0];
  
    return (
      <View>
        <Image style={styles.capaMais} resizeMode='cover' source={{ uri: primeiraImagem }} />
      </View>
    );
  };
export default ExibirImagens;
