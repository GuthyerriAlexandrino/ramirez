import { 
    Container, 
    ProfileAbout, 
    ProfileCareer,
    ProfileInfo,
    ProfileImage,
    ProfileInfoContainer, 
    ProfileName,
    Divider,
    ProfileViews,
    ProfileAside,
    CareerData,
    CareerDataContainer,
    DividerArea,
    PublishButton,
    PhotosGallery,
    PhotoItem
} from "./style";

import styles from "./styles.module.css"

import ProfileImg from "../../../assets/profile.jpg"
import Image from "next/image";

import Image1 from "../../../assets/water-animal/image1.jpg";
import Image2 from "../../../assets/water-animal/image2.jpg";
import Image3 from "../../../assets/water-animal/image3.jpg";
import Image4 from "../../../assets/water-animal/image4.jpg";
import Image5 from "../../../assets/water-animal/image5.jpg";
import Image6 from "../../../assets/water-animal/image6.jpg";
import Image7 from "../../../assets/water-animal/image7.jpg";
import Image8 from "../../../assets/water-animal/image8.jpg";
import Image9 from "../../../assets/water-animal/image9.jpg";
import Image10 from "../../../assets/water-animal/image10.jpg";
import Image11 from "../../../assets/water-animal/image11.jpg";
import Masonry from "react-masonry-css";
import { Header } from "../../../components/Header";
import { useState } from "react";
import { PublishPhoto } from "../../../components/PublishPhoto";

let photos = [
    { id: 1, src: Image1 },
    { id: 2, src: Image2 },
    { id: 3, src: Image3 },
    { id: 4, src: Image4 },
    { id: 5, src: Image5 },
    { id: 6, src: Image6 },
    { id: 7, src: Image7 },
    { id: 8, src: Image8 },
    { id: 9, src: Image9 },
    { id: 10, src: Image10 },
    { id: 11, src: Image11 },
];

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

export default function ProfilePhotographer() {

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    
    function handlePopUpScreen(value: boolean) {
        setPopupIsOpen(value);
    }

    return (
        <Container>
            <Header/>
            <ProfileInfoContainer>
                <ProfileInfo>
                    <ProfileAside>
                        <ProfileImage>
                            <Image 
                                src={ProfileImg}
                                layout="responsive"
                                objectFit="cover"
                                width={176}
                                height={176}
                            />
                        </ProfileImage>
                        <ProfileName>
                            Letícia Montenegro Sampaio
                        </ProfileName>
                        <Divider vertical={false} height={1}/>
                        <ProfileViews>
                            <p>
                                Esse perfil recebeu <br/> <span>12 visualizações</span>
                            </p>
                        </ProfileViews>
                    </ProfileAside>
                    <ProfileAbout>
                        <h2>Sobre mim</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet tellus pharetra, fermentum massa feugiat, ornare felis. Curabitur et mattis mi. Ut gravida purus dictum dui porttitor hendrerit. Curabitur a porta augue.</p>
                    </ProfileAbout>
                    <ProfileCareer>
                        <h2>Carreira Profissional</h2>
                        <CareerDataContainer>
                            <CareerData isRight={false}>
                                <h3>Especialização</h3>
                                <span>Fotografia subaquática</span>
                            </CareerData>
                            <Divider vertical={true} height={90}/>
                            <CareerData isRight={true}>
                                <h3>Valor de Serviço</h3>
                                <span>R$ 30 -  R$ 40 / foto</span>
                            </CareerData>
                        </CareerDataContainer>
                    </ProfileCareer>
                </ProfileInfo>
            </ProfileInfoContainer>
            <DividerArea>
                <PublishButton 
                    onClick={() => handlePopUpScreen(true)}
                >
                    Postar nova foto
                </PublishButton>
                <Divider vertical={false} height={2}/>
            </DividerArea>
            <PhotosGallery>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.myMasonryGrid}
                    columnClassName={styles.myMasonryGridColumn}
                >
                    {photos.map((photo, id) => (
                        <PhotoItem key={id}>
                            <Image src={photo.src}/>
                        </PhotoItem>
                    ))}
                </Masonry>
            </PhotosGallery>
            {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen}/>}
        </Container>
    )
}
