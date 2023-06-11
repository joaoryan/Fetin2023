import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { useNavigate } from 'react-router';
import Header from '../../components/Hader';
import ModalCreatVisitant from '../../components/Modals/ModalCreatVisitant';

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
      <ModalCreatVisitant
        id={1}
        onCancel={() => navigate('/home')}
      />
      <Styled.Container>
        <Header />
      </Styled.Container>
    </>
  );
};
