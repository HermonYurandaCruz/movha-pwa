import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarrosselDeImagens.css'; // Importe seu arquivo CSS personalizado aqui

const CarrosselDeImagens = ({ urlsImagens }) => {
  console.log('urls no carrossel', urlsImagens);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false, // Altera a direção do carrossel para horizontal
    adaptiveHeight: true, // Permite que a altura do slide seja ajustada dinamicamente
  };

  return (
     <div className="carrossel-container"> {/* Container para o carrossel e as bolinhas */}
      <Slider {...settings}>
        {urlsImagens.map((url, index) => (
          <div key={index}  className="image-container">
            <img src={url} alt={`Imagem ${index}`} />
          </div>
        ))}
      </Slider>
      {/* Bolinhas de navegação */}
      <div className="slick-dots" />
    </div>

  );
};

export default CarrosselDeImagens;
