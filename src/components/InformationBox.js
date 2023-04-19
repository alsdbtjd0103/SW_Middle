import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";
import {IoNavigateCircleOutline} from 'react-icons/io5';
import {RiKakaoTalkFill} from 'react-icons/ri';
import { ShareKakao } from "../util/ShareKakao";
export default function InformationBox({ place, distance }) {

    const userCtx = useContext(UserContext);
    const users = userCtx.users;
    
    const distanceCalc = (distance) => {
        if (distance>=1000){
            return (distance/1000).toFixed(1)+'km'
        }
        else{
            return distance+'m'
        }
    }

    const link = `https://map.kakao.com/link/to/${place.id}`
    
  return (
    <BoxContainer number={users.length}>
        <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'flex-end'
        }}>
      <span style={{ fontSize: "18px", fontStyle: "bold" }}>{place.place_name}</span>
      <div style={{
        display:'flex',
        
      }}>
      <StyledButton href={link} target='_blank'>
      <IoNavigateCircleOutline style={{paddingRight:'3px'}} color="black" size={22}></IoNavigateCircleOutline>
        길찾기
        </StyledButton>
      <StyledButton>|</StyledButton>
      
      <StyledButton onClick={() => ShareKakao(link,`${place.place_name}`,userCtx.users)}>
      <RiKakaoTalkFill  style={{paddingRight:'3px'}} color="black" size={22}/>
        공유하기</StyledButton>
      </div>
      </div>

      <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{place.address_name}</span>
      
      <UserContainer>
      {users.map((user,index) => {
        return(
        <StyledUser key={index}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <img width={25} height={25} src={`image/marker_${markerColor[index]}.png`} alt={`${user.name}'s image`}></img>
            <span style={{fontSize:'13px',opacity:0.8}}>{user.name}</span>
            </div>
            <span style={{ fontSize: "13px", color: "#9a9a9a" }}>{distance.length>0 ? distanceCalc(parseInt(distance[index].getLength())) : ''}</span>
        </StyledUser>
        )
      })}
      </UserContainer>

    </BoxContainer>
  );
}

const markerColor = {
    0: "F56BFF",
    1: "FF6E6E",
    2: "6B6BFF",
    3: "6BFF77",
    4: "6BC4FF",
    5: "FFF56B",
    6: "FFAE6B",
    7: "6BFFCB",
    8: "EB1E55",
  };

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
`

const BoxContainer = styled.div`
    justify-content: flex-start;
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  border-radius: 20px;
  padding: 15px 15px 20px 15px;
  flex-direction: column;
  overflow: scroll;
  cursor: pointer;
  opacity: 1;


  overflow: ${props => props.number>4 ? 'scroll' : 'hidden'};


`;

const StyledUser=styled.span`
    display: flex;
    width:50%;
    justify-content: space-between;
    align-items: center;
    margin:0;
    padding-top:14px;
    padding-left: 5px;
`

const StyledButton=styled.a`
   display: flex;
   justify-content: center;
   align-items: center;
    font-size: 12px;
    color:#676767;
    margin:0;
    text-align: center;
    padding: 0 5px;
    cursor: pointer;
    text-decoration: none;
    @media (min-width:800px){
    &:hover{
    opacity: 0.7;
  }
  }
`
