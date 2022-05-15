import { CardContainer, Especialization, PhotographerImage, PhotographerInfo } from "./style";

import Photographer from "../../assets/photographer-profile.png"


export function PhotographerCard() {
    return (
        <CardContainer>
            <PhotographerImage src={Photographer} width={72} height={72}  />
            <PhotographerInfo>
                <span>Jéssica Gomez</span>
                <small>Santos - SP</small>
            </PhotographerInfo>
            <Especialization>
                <span>Área:</span>
                <span>Fotojornalismo com foco em criminologia</span>
            </Especialization>
        </CardContainer>
    )
}  
