import styled from 'styled-components';
import { Colors } from '../../assets/styles/StyleTypes'
import imageLogin1 from '../../assets/image/cat1.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vw;
  padding: 0px 0px 0px 0px;
`;

export const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
`;

export const Image = styled.div`
  width: 300px;
  height: 300px;
  background-color: blue;
  border-radius: 50%;
  img{
    width: 300px;
  height: 300px;
    border-radius: 50%;
  }
  
`
