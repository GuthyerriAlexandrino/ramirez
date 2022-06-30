import Image from "next/image";
import Link from "next/link";
import { Container, BackPageLink, Icon, Typography } from "./style";

import Logo from "../../assets/logo.svg"
import Confirm from "../../assets/confirm.svg"
import ArrowBack from "../../assets/arrow-back.svg"
import { motion } from "framer-motion";
import { stagger, makeFadeInUptAnimation } from "../../utils/animations";

export default function Conclusion() {
    return (
        <Container
            initial='initial' 
            animate='animate' 
            exit={{ opacity: 0 }}
            variants={stagger}
        >
            <motion.div 
               variants={makeFadeInUptAnimation()}
            >
                <Image 
                    src={Logo}
                />
            </motion.div>
            <Icon
               variants={makeFadeInUptAnimation()}
            >
                <Image src={Confirm}/>
            </Icon>
            <Typography 
               variants={makeFadeInUptAnimation()}
            >
                Cadastro concluído!
            </Typography>
            <Link href="/login">
                <BackPageLink
                    variants={makeFadeInUptAnimation()}
                >
                    <Image src={ArrowBack}/>
                    <button>Voltar para o login</button>
                </BackPageLink>
            </Link>
        </Container>
    )
}