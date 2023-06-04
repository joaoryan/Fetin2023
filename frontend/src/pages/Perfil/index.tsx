import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { Navigate, useNavigate } from 'react-router';
import RotateBanner from '../../components/RotateBanner';
import { useInView } from "react-intersection-observer";
import { useState } from 'react';
import AnimateWhenVisible from '../../components/AnimateWhenVisible';
import { FaArrowLeft } from 'react-icons/fa'
import TeamCard from '../../components/Equip';
import Header from '../../components/Hader';
import image from '../../assets/image/cat2.jpg';
import ModalDeleteUser from '../../components/Modals/ModalDeleteUser';
import ModalUpdateUser from '../../components/Modals/ModalUpdateUser';

//RiContactsFill

type FormValues = {
  email: string;
  password: string;
};

export function Profile(): JSX.Element {
  const navigate = useNavigate();
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  return (
    <>

      {showModalDeleteUser && (
        <ModalDeleteUser
          id={1}
          onCancel={() => setShowModalDeleteUser(false)}
        />
      )}
      {showModalUpdateUser && (
        <ModalUpdateUser
          id={1}
          onCancel={() => setShowModalUpdateUser(false)}
        />
      )}
      <Styled.Container>
        {/*
       <Styled.backgroundGif>
       </Styled.backgroundGif>
       */}
        <Header />
        <Styled.RegressDiv>
          <Styled.Regress onClick={() => navigate(`/home`)}>
            <FaArrowLeft />
            voltar
          </Styled.Regress>
        </Styled.RegressDiv>

        <Styled.BodyDiv>
          <Styled.Image>
            <img src={image} />
          </Styled.Image>

          <Styled.InfoDiv>
            <Styled.Title>Minhas informações</Styled.Title>
            <Styled.Info>
              <div>
                <Styled.Subtitle>Nome</Styled.Subtitle>
                <Styled.Text>Joao Ryan dos Santos</Styled.Text>
              </div>
              <div>
                <Styled.Subtitle>CPF</Styled.Subtitle>
                <Styled.Text>Joao Ryan dos Santos</Styled.Text>
              </div>
              <div>
                <Styled.Subtitle>Endereço</Styled.Subtitle>
                <Styled.Text>Joao Ryan dos Santos</Styled.Text>
              </div>
              <div>
                <Styled.Subtitle>Telefone</Styled.Subtitle>
                <Styled.Text>Joao Ryan dos Santos</Styled.Text>
              </div>
            </Styled.Info>
            <Styled.DivButton>
              <Styled.Button onClick={() => setShowModalDeleteUser(true)}>
                deletar
              </Styled.Button>
              <Styled.Button onClick={() => setShowModalUpdateUser(true)} >
                editar
              </Styled.Button>
            </Styled.DivButton>

          </Styled.InfoDiv>
        </Styled.BodyDiv>
      </Styled.Container>
    </>
  );
};
