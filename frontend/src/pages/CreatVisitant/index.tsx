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
import ModalDeleteUser from '../../components/Modals/ModalDeleteUser';
//RiContactsFill

type FormValues = {
  email: string;
  phone: number;
  password: string;
  codeAdm: string;
};

export function CreatVisitant(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();

  return (
    <>
      <ModalDeleteUser
        id={1}
        onCancel={() => navigate('/home')}
      />
      <Styled.Container>
        <Header />
      </Styled.Container>
    </>
  );
};
