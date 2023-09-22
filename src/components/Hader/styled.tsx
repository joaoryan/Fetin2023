import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vw;
  padding: 0px 0px 30px 0px;
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  svg{
    font-size: 18px; 
  }
  :hover{
    color: ${props => props.theme.colors.hoverColor};
  }
`;


export const DivLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  svg{
    font-size: 24px; 
  }
`;


export const Hader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 0px 20px;
  border-bottom: #bbbbbb 1px solid;
  
`;
