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
    PhotoItem,
    ProfileLocation
} from "./style";

import styles from "./styles.module.css"

import ProfileImg from "../../../assets/profile.jpg"
import Image from "next/image";
import Link from "next/link";

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
import { useEffect, useState } from "react";
import { PublishPhoto } from "../../../components/PublishPhoto";
import { GetServerSideProps } from "next";
import { User } from "../../search";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const data: User = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const user = {
        id: data._id ?? null,
        name: data.name ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        specialization: data.specialization ?? null
    }

    return {
        props: {
            user,
        },
    }
}

interface PhotographerProps {
    user: User;
}

export default function ProfilePhotographer({user}: PhotographerProps) {

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    
    function handlePopUpScreen(value: boolean) {
        setPopupIsOpen(value);
    }

    const { ref, inView } = useInView();
    const animation = useAnimation();

    useEffect(() => {
        if (inView) {
            animation.start({
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99],
                }
            })
        } else {
            animation.start({
                y: 30,
                opacity: 0,
                transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
            });
        }
        console.log(inView);
    }, [animation, inView])

    return (
        <Container
            initial={{width: 0}} 
            animate={{width: "100vw"}} 
            exit={{ x: "100%" }}
        >
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
                            {user.name}
                        </ProfileName>
                        <ProfileLocation>
                            {user.city} - {user.state}
                        </ProfileLocation>
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
                                <span>{user.specialization}</span>
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
                    columnClassName={styles.msyMasonryGridColumn}
                >
                    {photos.map((photo, id) => (
                        <Link href="/post">
                            <PhotoItem key={id} ref={ref} animate={animation}>
                                <Image src={photo.src}/>
                            </PhotoItem>
                       </Link>
                    ))}
                </Masonry>
            </PhotosGallery>
            {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen}/>}
        </Container>
    )
}
