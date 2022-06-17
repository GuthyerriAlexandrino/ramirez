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

import Masonry from "react-masonry-css";
import { Header } from "../../../components/Header";
import { useEffect, useState } from "react";
import { PublishPhoto } from "../../../components/PublishPhoto";
import { GetServerSideProps } from "next";
import { UserP } from "../../search";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MenuButton } from "../../../components/MenuButton";

let photos = [
    {id:1, width: 640, height: 960},
    {id:2, width: 1920, height: 2880},
    {id:3, width: 2400, height: 3600},
    {id:4, width: 640, height: 425},
    {id:5, width: 1440, height: 1277},
    {id:6, width: 2400, height: 1596},
    {id:7, width: 640, height: 960},
    {id:8, width: 1920, height: 2880},
    {id:9, width: 2400, height: 3600},
    {id:10, width: 640, height: 425},
    {id:11, width: 1920, height: 1277},
    {id: 12, width: 2400, height: 1596}
]

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

    const data: UserP[] = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const user = {
        id: data[0]._id ?? null,
        name: data[0].name ?? null,
        city: data[0].city ?? null,
        state: data[0].state ?? null,
        specialization: data[0].specialization ?? null
    }

    return {
        props: {
            user,
        },
    }
}

interface PhotographerProps {
    user: {
        id: {
            $oid: string;
        };
        name: string;
        city: string;
        state: string;
        specialization: string;
    }
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
            <MenuButton id={user.id.$oid} openModal={() => handlePopUpScreen(true)}/>
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
                <Divider vertical={false} height={2}/>
            </DividerArea>
            <PhotosGallery>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.myMasonryGrid}
                    columnClassName={styles.msyMasonryGridColumn}
                >
                    {photos.map((id) => (
                        <Link href="/post">
                            <PhotoItem key={id.id}>
                                <Image 
                                    loading="lazy" 
                                    src={`https://picsum.photos/${id.width}/${id.height}`} 
                                    width={id.width} 
                                    height={id.height}
                                />
                            </PhotoItem>
                        </Link>
                    ))}
                </Masonry>
            </PhotosGallery>
            {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen}/>}
        </Container>
    )
}
