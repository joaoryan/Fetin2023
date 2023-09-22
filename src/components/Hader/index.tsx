
import { useNavigate } from 'react-router';
import * as Styled from './styled';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { TbFaceId } from 'react-icons/tb';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Styled.Hader>
            <Styled.DivLogo>
                <TbFaceId />
                SafeFace
            </Styled.DivLogo>

            <Styled.LogoutButton onClick={() => navigate(`/`)}>
                Sair
                <RiLogoutBoxRLine />
            </Styled.LogoutButton>
        </Styled.Hader>
    );
};

export default Header;
