import { useEffect, useState } from 'react';
import styled from 'styled-components';

import EstilosGlobais from './componentes/EstilosGlobais';
import Cabecalho from './componentes/Cabecalho';
import BarraLateral from './componentes/BarraLateral';
import Banner from './componentes/Banner';
import Galeria from './componentes/Galeria';
import Rodape from './componentes/Rodape';
import ModalZoom from './componentes/ModalZoom';
import bannerBackground from './assets/banner.png'

import fotos from './fotos.json';


const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  height: 100%;
`;

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos);
  const [filtro, setFiltro] = useState('');
  const [tag, setTag] = useState(0);
  const [fotoComZoom, setFotoComZoom] = useState(null);

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag;
      const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase());
      return filtroPorTag && filtroPorTitulo;
    });

    setFotosDaGaleria(fotosFiltradas);
  }, [filtro, tag]);

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoComZoom?.id) {
      setFotoComZoom({
        ...fotoComZoom,
        favorita: !fotoComZoom.favorita
      });
    }
  
    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !foto.favorita : fotoDaGaleria.favorita
      }
    }))
  }

  return (
    <>
      <FundoGradiente>
        <EstilosGlobais />
        <AppContainer>
          <Cabecalho
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <MainContainer>
            <BarraLateral />
            <ConteudoGaleria>
              <Banner
                texto="A galeria mais completa de fotos do espaço!"
                backgroundImage={bannerBackground}
              />
              <Galeria
                aoFotoSelecionada={foto => {
                  setFotoComZoom(foto);
                  window.scrollTo(0, 280);
                }}
                aoAlternarFavorito={aoAlternarFavorito}
                fotos={fotosDaGaleria}
                setTag={setTag}
              />
            </ConteudoGaleria>
          </MainContainer>
        </AppContainer>
        <ModalZoom
          foto={fotoComZoom}
          aoFechar={() => setFotoComZoom(null)}
          aoAlternarFavorito={aoAlternarFavorito}
        />
        <Rodape />
      </FundoGradiente>
    </>
  )
}

export default App
