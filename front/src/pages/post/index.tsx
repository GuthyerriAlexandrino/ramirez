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
    PostImage,
    CommentaryInputContainer,
    CommentaryInput,
    CommentaryButton
} from "./style";

// import Image01 from "../../assets/water-animal/image5.jpg"

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
                            <img 
                                src="https://picsum.photos/200" 
                            />
                        </PostImage>
                        <ContentFooter>
                            <span>R$ 25,00</span>
                            <IconsArea>
                                <TrashSimple 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill"
                                    style={{cursor: "pointer"}}
                                />
                                <Chat 
                                    color={pallete.grayOne} 
                                    size={30} weight="fill" 
                                    style={{marginLeft: "1.25rem", cursor: "pointer"}} 
                                />
                                <Heart 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill" 
                                    style={{marginLeft: "1.25rem", cursor: "pointer"}} 
                                />
                            </IconsArea>
                        </ContentFooter>
                    </PostContent>
                    <CommentaryInputContainer>
                        <CommentaryInput/>
                        <CommentaryButton/>
                    </CommentaryInputContainer>
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
