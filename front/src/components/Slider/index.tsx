import React, { useState } from "react"
import { 
    ArrowSliderLeft, 
    ArrowSliderRight, 
    Bar, 
    Container, 
    Divider, 
    ImageSlider, 
    Slide, 
    SlideContent, 
    SlideContentItems, 
    SlideIndex, 
    Typography 
} from "./style"
import SlideOne from "../../assets/sliderOne.jpg"
import SlideTwo from "../../assets/sliderTwo.jpg"
import SlideThree from "../../assets/sliderThree.jpg"
import LeftArrow from "../../assets/leftArrow.svg"
import RightArrow from "../../assets/rightArrow.svg"

const imagesSlide = [
    {
        image: SlideOne,
    },
    {
        image: SlideTwo,
    },
    {
        image: SlideThree,
    }
]

export const Slider = () => {

    const [current, setCurrent] = useState(0);
    const length = imagesSlide.length;

    
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }
    
    if (!Array.isArray(imagesSlide) || imagesSlide.length <= 0) {
        return null;
    }

    return (
        <Container>
            <ArrowSliderLeft src={LeftArrow} height={50} width={50} onClick={prevSlide}/>
            {imagesSlide.map((slide, index) => {
                return (
                    <Slide isActive={index === current ? true : false} key={index}>
                        {index === current && (
                            <SlideContent>
                                <ImageSlider src={slide.image} width={1000} height={500} />
                                <SlideContentItems>
                                    <Bar/>
                                    <Typography>
                                        Reunindo inspirações
                                    </Typography>
                                    <SlideIndex>
                                        {(index + 1).toString().padStart(2, "0")}
                                        <Divider/>
                                        {length.toString().padStart(2, "0")}
                                    </SlideIndex>
                                </SlideContentItems>
                            </SlideContent>
                        )}
                    </Slide>
                )
            })}
            <ArrowSliderRight src={RightArrow}  height={50} width={50} onClick={nextSlide}/>
        </Container>
    )
}