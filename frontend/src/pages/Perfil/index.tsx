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
import { RiLogoutBoxRLine } from 'react-icons/ri'
import TeamCard from '../../components/Equip';
import Header from '../../components/Hader';
import image from '../../assets/image/cat2.jpg';
//RiContactsFill

type FormValues = {
  email: string;
  password: string;
};

export function Profile(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Styled.Container>
        {/*
       <Styled.backgroundGif>
       </Styled.backgroundGif>
       */}
        <Header />
        <Styled.BodyDiv>
          <Styled.Image>
            <img src={image} />
          </Styled.Image>

          <img src={image} />


        </Styled.BodyDiv>
      </Styled.Container>
    </>
  );
};
