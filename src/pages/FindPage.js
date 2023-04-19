
import { useContext, useEffect,useState } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import styled from 'styled-components';
import FindHeader from '../components/FindHeader';
import MapContainer from '../components/MapContainer';
import { UserContext } from '../store/UserContext';
import {motion} from 'framer-motion';


function FindPage(){
    const userCtx = useContext(UserContext);
    const navigation=useNavigate();
   
  
    function goBack(){
        userCtx.setIsButtonClick(true);
        navigation(-1); 
    }

    function goHome(){
        navigation("/")
    }
    
    useEffect(() => {        
        if (userCtx.users.length<2){  
            window.kakao.maps.load(() => {
                goHome();
            })          

        }
    })

    useEffect(() => {
        userCtx.setIsButtonClick(false);
    },[])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
      }, []);

    return(
        <StyledContainer
        initial={userCtx.isButtonClick ? {x:window.innerWidth} : false}
        animate={userCtx.isButtonClick ? {x:0,transition:{duration:0.4}} : false} 
        // exit={{x:0,transition:{duration:0.1}}}
        >
            <FindHeader onClick={goBack} title={'중간장소 찾기'}/>
            <MapContainer />
        </StyledContainer>
    )
}

export default FindPage;

const StyledContainer = styled(motion.div)`
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    margin: 0;
    background-color: black;
`

