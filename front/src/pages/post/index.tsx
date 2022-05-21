import Image from "next/image";
import { Header } from "../../components/Header";
import { 
    Container, 
    ContentFooter, 
    FeedBackArea, 
    FeedBackList, 
    IconsArea, 
    PostContainer, 
    PostArea,
    PostContent, 
    PostImage
} from "./style";

import Image01 from "../../assets/water-animal/image5.jpg"

import { TrashSimple, Chat, Heart } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { CommentaryCard } from "../../components/CommentaryCard";

export default function Post() {
    return (
        <Container>
            <Header/>
            <PostContainer>
                <PostArea>
                    <PostContent>
                        <PostImage>
                            <Image 
                                src={Image01} 
                                layout="responsive"
                                objectFit="cover"
                            />
                        </PostImage>
                        <ContentFooter>
                            <span>R$ 25,00</span>
                            <IconsArea>
                                <TrashSimple 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill" 
                                />
                                <Chat 
                                    color={pallete.grayOne} 
                                    size={30} weight="fill" 
                                    style={{marginLeft: "1.25rem"}} 
                                />
                                <Heart 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill" 
                                    style={{marginLeft: "1.25rem"}} 
                                />
                            </IconsArea>
                        </ContentFooter>
                    </PostContent>
                    <FeedBackArea>
                        <h2>Comentários (4)</h2>
                        <FeedBackList>
                            <CommentaryCard/>
                        </FeedBackList>
                    </FeedBackArea>
                </PostArea> 
            </PostContainer>
        </Container>
    )
}
