import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { Navigate, useNavigate } from 'react-router';
import RotateBanner from '../../components/RotateBanner';
import { useInView } from "react-intersection-observer";
import { useState } from 'react';
import AnimateWhenVisible from '../../components/AnimateWhenVisible';
import { MdGroupAdd } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md'
import { RiContactsFill } from 'react-icons/ri'
import { FaArrowLeft } from 'react-icons/fa'
import TeamCard from '../../components/Equip';
import Header from '../../components/Hader';
import image from '../../assets/image/cat2.jpg';
import CardVisitant from '../../components/CardVisitant';
import ModalDeleteUser from '../../components/Modals/ModalDeleteUser';
//RiContactsFill

export function Visitant(): JSX.Element {
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const navigate = useNavigate();
  const test = [
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' },
    { nome: 'joao ryan', img: '' }
  ]

  return (
    <>

      {showModalDeleteUser && (
        <ModalDeleteUser
          id={1}
          onCancel={() => setShowModalDeleteUser(false)}
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
          {test.map((item, index) =>
            <CardVisitant img={item.img} name={item.nome} timeAnimate={index / 4} modalDelete={() => setShowModalDeleteUser(true)} />
          )}

        </Styled.BodyDiv>
      </Styled.Container>
    </>
  );
};
