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
    PhotosGallery,
    ProfileLocation,
    MansoryGrid,
    ImageLazyLoad
} from "./style";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion }from "framer-motion";
import { GetServerSideProps } from "next";
import { Header } from "../../../../components/Header";
import { UserP } from "../../../search";
import { MenuButton } from "../../../../components/MenuButton";
import { PublishPhoto } from "../../../../components/PublishPhoto";
import { getDownloadURL } from "firebase/storage";
import { ref as refFirebase, storage } from "../../../../utils/keys/firebaseconfig";
import { useAuthLogin } from "../../../../context/AuthContext";

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

    const data: UserP = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const user = {
        _id: data._id ?? null,
        name: data.name ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        bio: data.bio ?? null,
        specialization: data.specialization ?? null,
        services_price: data.services_price ?? null,
        profile_img: data.profile_img ?? null,
        views: data.views ?? null
    }

    return {
        props: {
            user,
        },
    }
}

interface PhotographerProps {
    user: UserP;
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

interface Post {
    _id: {
        $oid: string;
    },
    image: string;
}

export default function ProfilePhotographer({user}: PhotographerProps) {

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [allPostsList, setAllPostsList] = useState<Post[]>([]);

    const {
        userProfileImage
    } = useAuthLogin();


    const { ref, inView } = useInView();
    const animation = useAnimation();

    const cookies = parseCookies();
    const userSectionId = cookies["ramirez-user-id"]
    const token = cookies["ramirez-user"]

    
    function handlePopUpScreen(value: boolean) {
        setPopupIsOpen(value);
    }

    async function getAllPostsFromUser() {
        const allPosts: string[] = await fetch(`http://localhost:3001/posts/${userSectionId}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
        .catch(error => error.json());

        if (allPosts) {
            Array.from(allPosts).forEach(async (post: any) => {
                const foresRef = refFirebase(storage, post.image);
                await getDownloadURL(foresRef)
                .then(url => setAllPostsList([...allPostsList, {_id: post._id, image: url}]))
                .catch(error => console.log(error));
            })
        }
    }

    useEffect(() => {
        getAllPostsFromUser();
    }, [])

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
    }, [animation, inView])

    return (
        <Container
            initial={{width: 0}} 
            animate={{width: "100vw"}} 
            exit={{ x: "100%" }}
        >
            <Header userId={userSectionId}/>
            <MenuButton id={user?._id?.$oid} openModal={() => handlePopUpScreen(true)}/>
            <ProfileInfoContainer>
                <ProfileInfo>
                    <ProfileAside>
                        <ProfileImage>
                            <Image 
                                src={userProfileImage ? userProfileImage : "/default-user.png"}
                                layout="responsive"
                                objectFit="cover"
                                width={176}
                                height={176}
                                alt={"Foto de perfil"}
                            />
                        </ProfileImage>
                        <ProfileName>
                            {user?.name}
                        </ProfileName>
                        <ProfileLocation>
                            {user?.city} - {user?.state}
                        </ProfileLocation>
                        <Divider vertical={false} height={2}/>
                        <ProfileViews>
                            <p>
                                Esse perfil recebeu <br/>
                                <span>
                                    {user?.views <= 1 ? `${user?.views} visualização` : `${user?.views} visualizações`}
                                </span>
                            </p>
                        </ProfileViews>
                    </ProfileAside>
                    <ProfileAbout>
                        <h2>Sobre mim</h2>
                        <p data-bio={user?.bio !== "" ? "hasBio" : 'noBio'}>
                            {user?.bio !== "" ? user?.bio : "Nenhuma informação escrita..."}
                        </p>
                    </ProfileAbout>
                    <ProfileCareer>
                        <h2>Carreira Profissional</h2>
                        <CareerDataContainer>
                            <CareerData isRight={false}>
                                <h3>Especialização</h3>
                                {user?.specialization?.map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </CareerData>
                            <Divider vertical={true} height={90}/>
                            <CareerData isRight={true}>
                                <h3>Valor de Serviço</h3>
                                {user?.services_price?.length >  0 ? (
                                    <span>R$ {user?.services_price[0]} -  R$ {user?.services_price[1]} / foto</span>
                                ) : (
                                    <span>Sem informações</span>
                                )}
                            </CareerData>
                        </CareerDataContainer>
                    </ProfileCareer>
                </ProfileInfo>
            </ProfileInfoContainer>
            <DividerArea>
                <Divider vertical={false} height={2}/>
            </DividerArea>
            <PhotosGallery variants={stagger} ref={ref}>
                <MansoryGrid>
                     {Array.from(allPostsList).map((id) => (
                        // eslint-disable-next-line @next/next/link-passhref
                        <Link 
                            href={`/profile/photographer/${user?._id?.$oid}/post/${id._id.$oid}`} 
                            key={id._id.$oid} 
                        >
                            <motion.div 
                                key={id._id.$oid} 
                                animate={animation}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ImageLazyLoad
                                    effect="blur" 
                                    src={id.image} 
                                    alt="Foto da galeria"
                                />
                            </motion.div>
                        </Link>
                    ))}
                </MansoryGrid>
            </PhotosGallery>
            {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen}/>}
        </Container>
    )
}
