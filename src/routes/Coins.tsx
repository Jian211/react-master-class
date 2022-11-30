import { Link } from 'react-router-dom';
import styled from "styled-components";
import {useQuery} from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from '../atoms';

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  align-items: center;
`;

const CoinList = styled.ul`
`;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.textColor};
  border-radius: 28px;
  margin-bottom: 16px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  
  a {
    transition: color 0.5ms ease-in;
    padding: 28px 20px;
  }

  &:hover{
    color: ${props => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  color : ${props => props.theme.accentColor};
  font-size : 30px;
  grid-column: 2/ span 1;
  margin: auto;
`

const Loading = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const DarkModeBtn = styled.button`
  border-radius: 25px;
  height: 40px;
  grid-column: 3 / span 1;
  
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


// const getCoinList = (url:string) => fetch(url).then(res => res.json());

const Coins = () => {

  const {isLoading, data} = useQuery<ICoin[]>('allCoin', fetchCoins);

  const setDarkModeFn = useSetRecoilState(isDarkAtom);

  const toggleDarkMode = () => setDarkModeFn( curr => !curr);

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <DarkModeBtn onClick={toggleDarkMode}>DarkMode</DarkModeBtn>
      </Header>
      { isLoading 
        ? <Loading>"Loading..." </Loading> 
        : <CoinList>
            {data?.slice(0,100).map( coin => 
                <Coin key={coin.id}>
                  <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} />
                  <Link to={{
                    pathname: `/${coin.id}`,
                    state: {
                      name : coin.name
                    }
                  }}>{coin.name} &rarr; </Link>
                </Coin>
            )}
          </CoinList>
      }
    </Container>
  )
}

export default Coins;