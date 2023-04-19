import '../css/slick-theme.css';
import '../css/slick.css'
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import InformationBox from "./InformationBox";

export default function InformationSlider({placeList,setPlaceIndex,polylines}) {
    
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    dots:true,
    afterChange:(index) => setPlaceIndex(index),
  };

  
  return (
    
    <Slider {...settings}>
        {placeList.map((place,index) => {
            if(index<5){
            return <InformationBox key={index} place={place} distance={polylines}/>
        }
        })}
      
    </Slider>

  );
}


