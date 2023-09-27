import { useNavigate } from 'react-router';
import * as Styled from './styled';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { TbFaceId } from 'react-icons/tb';
import { BiSolidDownload } from 'react-icons/bi'
import { event } from 'jquery';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate();
    const [promptEvent, setPromptEvent] = useState<any>(null)

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            setPromptEvent(event);
        });
    }, []);

    const handleClick = () => {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            setPromptEvent(event);
        });
        console.log(promptEvent)
        if (promptEvent) {
            (promptEvent).prompt();
        } else {
            console.log('aqui')
            toast.error('O aplicativo já foi instalado')
        }
    };

    return (
        <Styled.Hader>
            <Styled.DivLogo>
                <TbFaceId />
                SafeFace
            </Styled.DivLogo>

            <Styled.DivAction>
                <Styled.LogoutButtonInstall onClick={handleClick}>
                    Instalar
                    <BiSolidDownload />
                </Styled.LogoutButtonInstall>

                <Styled.LogoutButton onClick={() => navigate(`/`)}>
                    Sair
                    <RiLogoutBoxRLine />
                </Styled.LogoutButton>
            </Styled.DivAction>
        </Styled.Hader>
    );
};

export default Header;
