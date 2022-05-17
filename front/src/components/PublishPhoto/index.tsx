import { 
    FormArea,
    InputContainer,
    InputValue,
    InputFileLabel,
    InputFile,
    FormAreaContainer, 
    PopupContainer,
    Typography,
    ButtonSubmit,
    IconArea
} from "./style";

import { FilePlus, XCircle } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { useState } from "react";

type PublishPhotoProps = {
    handlePopUp: (value: boolean) => void;
}

export function PublishPhoto({handlePopUp}: PublishPhotoProps) {

    const [fileName, setFileName] = useState("");

    return (
        <PopupContainer>
            <FormAreaContainer>
                <IconArea onClick={() => handlePopUp(false)}>
                    <XCircle color={pallete.red} weight="fill" size={40} />
                </IconArea>
                <Typography>Postar uma nova foto</Typography>
                <FormArea>
                    <InputContainer>
                        <label htmlFor="title">Título</label>
                        <InputValue 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Digite aqui um título para sua foto"
                        />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="price">Preço</label>
                        <InputValue
                            type="number" 
                            id="price" 
                            name="price" 
                            placeholder="Digite aqui o preço da voto. Ex.: 100"
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Foto</label>
                        <InputFileLabel>
                            <span>{fileName ? `> ${fileName}` : "Insira aqui uma foto"}</span>
                            <div>
                                <FilePlus color={pallete.grayTwo} weight="fill" size={40}/>
                            </div>
                            <InputFile
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Insira aqui uma foto"
                                onChange={(e) => setFileName(e.target.value.substring(12))}
                            />
                        </InputFileLabel>
                    </InputContainer>
                    <ButtonSubmit type="submit">Postar foto</ButtonSubmit>
                </FormArea>
            </FormAreaContainer>            
        </PopupContainer>
    )
}
