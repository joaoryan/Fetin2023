import * as Styled from './styled';
import { useNavigate } from 'react-router';
import AnimateWhenVisible from '../../components/AnimateWhenVisible';
import { MdGroupAdd } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md'
import { RiContactsFill } from 'react-icons/ri'
import TeamCard from '../../components/Equip';
import Header from '../../components/Hader';
import image1 from '../../assets/image/joao-ryan.png'
import image2 from '../../assets/image/matheus.png'
import image3 from '../../assets/image/joao.png'
import image4 from '../../assets/image/gustavo.png'
import { load } from '../../services/axios';
import iconFace1 from '../../assets/image/face-id2.png';
import iconFace2 from '../../assets/image/face-scanner.png';
import iconFace3 from '../../assets/image/face-id1.png';

export function Home(): JSX.Element {
  const navigate = useNavigate();

  load()
    .then(resp => {
      console.log(resp)
    })
    .catch(error => {
      console.log(error)
    })

  return (
    <><Styled.Container>
      <Styled.backgroundGif>
        <Header />
        <Styled.CardDiv>
          <a href="http://127.0.0.1:5500/faceApi/index.html" target="_blank">
            <Styled.CardButtonDiv>
              <Styled.CardButton>
                <MdAccountCircle />
                <Styled.Title>
                  Identificação
                </Styled.Title>
              </Styled.CardButton>
            </Styled.CardButtonDiv>
          </a>
          <Styled.CardButtonDiv onClick={() => navigate(`/visitant`)}>
            <Styled.CardButton>
              <RiContactsFill />
              <Styled.Title>
                Visitantes
              </Styled.Title>
            </Styled.CardButton>
          </Styled.CardButtonDiv>
          <Styled.CardButtonDiv onClick={() => navigate(`/user/:id/visitant/creat`)}>
            <Styled.CardButton>
              <MdGroupAdd />
              <Styled.Title>
                Adicionar visitante
              </Styled.Title>
            </Styled.CardButton>
          </Styled.CardButtonDiv>
        </Styled.CardDiv>
      </Styled.backgroundGif>
      <Styled.infoDiv>
        <Styled.Title>Conheça a SafeFace</Styled.Title>
        <Styled.Text1>O projeto propõe o desenvolvimento de um sistema de controle de acesso facial inteligente que utiliza tecnologias avançadas de reconhecimento facial para aumentar a segurança e a conveniência em ambientes residenciais, comerciais e até mesmo em eventos. O sistema visa substituir métodos tradicionais de autenticação, como cartões de identificação e senhas, proporcionando uma solução mais rápida, precisa e eficaz para controlar o acesso às instalações.
        </Styled.Text1>
        <Styled.info2Div>

          <AnimateWhenVisible icon={iconFace1} text={`Um sistema de reconhecimento facial pode oferecer uma maneira conveniente de desbloquear portas ou acessar áreas restritas sem
            a necessidadede chaves ou senhas Isso pode ser particularmente útil em eventos ou reuniões, onde muitas pessoas precisam acessar áreas restritas.`} />

          <AnimateWhenVisible icon={iconFace2} text={`O sistema de controle de acesso proposto tem o potencial de revolucionar a segurança e autenticação em condomínios, empresas e eventos.`} />

          <AnimateWhenVisible icon={iconFace3} text={`Utilizar o reconhecimento facial avançado, busca-se melhorar a eficiência e precisão do controle de acesso, proporcionando maior modernização e eficácia na segurança desses locais.`} />

        </Styled.info2Div>
      </Styled.infoDiv>
      <Styled.TeamDiv>
        <Styled.Title>Nosso time</Styled.Title>
        <Styled.Text1>Somos um grupo dinâmico de indivíduos apaixonados pelo que fazemos e dedicados a oferecer os melhores resultados para nossos clientes.</Styled.Text1>
        <Styled.TeamCardDiv>
          <TeamCard img={image1} name={'João Ryan'} work={'develop'} timeAnimate={1} />
          <TeamCard img={image2} name={'Matheus'} work={'develop'} timeAnimate={1.5} />
          <TeamCard img={image3} name={'João Victor'} work={'develop'} timeAnimate={2} />
          <TeamCard img={image4} name={'Gustavo'} work={'develop'} timeAnimate={2.5} />
        </Styled.TeamCardDiv>
        <Styled.Footer>
          <p>&copy; 2023 Controle de Acesso Ltda - FETIN</p>
        </Styled.Footer>
      </Styled.TeamDiv>
    </Styled.Container>

    </>
  );
};
