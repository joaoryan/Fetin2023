import styled from 'styled-components';


export const Content = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const Paragraph = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.textPrimary};
  color: #000000;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  width: 178px;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    background-color: ${props => props.theme.colors.hoverColor}
  }

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

export const Error = styled.p`
  color: #ff0000;
`;

export const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  //height: 100%;
`;

export const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  svg{
    font-size: 248px;
    cursor: pointer;
    &:hover {
    transition: 0.5s;
    color: #F231A5
  }
  }
  img{
      width: 229px;
    height: 171px;
    border-radius: 10%;
  }
`

export const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    color: #F231A5
  }
`

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  width: 382px;
  background-color: rgb(25, 29, 63);
  border-radius: 4%;
  gap: 3px;
 // padding: 20px 60px;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 8px;
  width: 300px;
  gap:5px;
  border: hidden;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    color: #F231A5
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: hidden;
  background-color: ${props => props.theme.colors.textPrimary};
  border-radius: 4px;
  font-size: 16px;
`;

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

`

export const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`
