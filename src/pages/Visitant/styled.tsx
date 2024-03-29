import styled from 'styled-components';
import { Colors } from '../../assets/styles/StyleTypes'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //background-color: #202446;
  width: 100vw;
  height: 100vh;
  padding: 0px 0px 0px 0px;
`;

export const RegressDiv = styled.div`
  font-size: 20px;
  padding: 20px 0px 0px 60px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const DivIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    .img{
        width: 450px;
    }
    @media (max-width: 600px) {
      .img{
        width: 200px;
    }
    font-size: 14px;
  }
`;

export const Regress = styled.div`
  gap: 10px;
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover{
    color: ${props => props.theme.colors.hoverColor};
  }
`;

export const BodyDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-evenly;
 
  padding: 40px;
  gap: 40px;
//  height: 100%
`;

export const Image = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  img{
    width: 400px;
    height: 400px;
    border-radius: 50%;
  }
`

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  width: 482px;
  height: 542px;
  background-color: rgb(25, 29, 63);
  border-radius: 10%;
  gap: 30px;
  padding: 20px 60px;
`

export const Title = styled.div`
  font-size: 25px;

`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 100%;
  gap: 40px;
`
export const Subtitle = styled.div`
  font-size: 20px;

`
export const Text = styled.div`
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`

export const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.textPrimary};
  color: #000000;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  width: 168px;
  &:hover {
    background-color: ${props => props.theme.colors.hoverColor}
  }

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;
