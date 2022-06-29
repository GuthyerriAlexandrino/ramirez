import { 
    AditionalInputs,
     Container,
     Divider,
     InputName,
     LocationAccordion,
     PhotographersList,
     GenericInput,
     PriceRange,
     SearchButton,
     SearchInputContainer, 
     SearchPhotographerContainer, 
     PriceRangeContainer
} from "./styles";
import { SelectInput } from "../../components/SelectInput";
import { useEffect, useState } from "react";
import { PhotographerCard } from "../../components/PhotographerCard";
import { Header } from "../../components/Header";
import { parseCookies } from "nookies";
import { useAuthLogin } from "../../context/AuthContext";
import Router from "next/router";
import { PopupItem } from "../../components/SelectInput/style";
import { GetServerSideProps } from "next";

export type UserP = {
    _id: {
        $oid: string;
    },
    name: string;
    city: string;
    state: string;
    bio: string;
    specialization: string[];
	profile_img: string,
	services_price: number[],
	views: number
}

type Specialization = {
    name: string;
}

type Search = {
    name: string;
    orderBy: string;
    location: string;
    specialization: string;
    minPrice: number;
    maxPrice: number;
}

const orderOptions = [
    {name: "Nenhum", field: null},
    {name: "Visitas", field: "views"},
    {name: "Curtidas", field: "likes"},
    {name: "Preço", field: "price"}
]

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}


export default function Search() {

    const [search, setSearch] = useState({} as Search);

    const [isLocationActive, setIsLocationActive] = useState(false);
    const [users, setUsers] = useState<UserP[]>([]);
    const [specializationOptions, setSpecializationOptions] = useState<Specialization[]>([]);
    const [selectOrderByValue, setSelectOrderByValue] = useState("");

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"]

    const {
        verifyTokenExpiration,
        getProfileImage,
    } = useAuthLogin();


    useEffect(() => {
        async function getAllSpecializations() {
            const data = await fetch("http://localhost:3001/specializations", {
                method: "GET"
            }).then(response => response.json());
            setSpecializationOptions(data)
        }
        getAllSpecializations();
    }, [])

    useEffect(() => {
        getProfileImage();
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getUsers() {
        if (!verifyTokenExpiration()) {
            Router.push("/login");
            return;
        } 

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        let url = `http://localhost:3001/users?${buildQuery(search)}`
        const data = await fetch(url, {
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

        setUsers(data);
    }

    function buildQuery(search: Search) {
        let query = "";
        for (let field in search) {
            let value = search[field as keyof typeof search]
            if (value) {
                query += `${field}=${value}&`
            }
        }
        return query
    }   

    return (
        <Container
            initial={{width: 0}} 
            animate={{width: "100vw"}} 
            exit={{ x: "100%" }}
        >
            <Header userId={userSectionId}/>
            <SearchPhotographerContainer>
                <h1>Pesquisa por algum fotógrafo</h1>
                <SearchInputContainer>
                    <div>
                        <InputName 
                            type="text" 
                            placeholder="Digite aqui o nome de um fotógrafo" 
                            onChange={(event) => setSearch({...search, name: event.target.value})}
                            required/>
                        <SearchButton onClick={() => getUsers()}>Pesquisar</SearchButton>
                    </div>
                    <AditionalInputs>
                        <SelectInput selectName={search.specialization ? search.specialization : "Especialização"} >
                            {Array.isArray(specializationOptions) && specializationOptions.map((item, id) => (
                                <PopupItem key={id} onClick={() => setSearch({...search, specialization: item.name === "Nenhum" ? "" : item.name})}>
                                    {item.name}
                                </PopupItem>
                            ))}
                        </SelectInput>
                        <SelectInput selectName={search.orderBy ? selectOrderByValue : "Ordenação por:"}>
                            {orderOptions.map((item, id) => (
                                <PopupItem 
                                    key={id} 
                                    onClick={() => {
                                        setSearch({...search, orderBy: item.name === "Nenhum" ? "" : item.field!})
                                        setSelectOrderByValue(item.name === "Nenhum" ? "" : item.name)
                                    }}
                                >
                                    {item.name}
                                </PopupItem>
                            ))}
                        </SelectInput>
                        <PriceRangeContainer>
                            <PriceRange>Faixa de preço:</PriceRange>
                            <label htmlFor="minPrice"></label>
                            <GenericInput 
                                type="number" 
                                id="minPrice" 
                                name="minPrice" 
                                placeholder="Mínimo"
                                onChange={(event) => setSearch({...search, minPrice: Number(event.target.value)})}
                            />
                            <Divider/>
                            <label htmlFor="maxPrice"></label>
                            <GenericInput 
                                type="number" 
                                id="maxPrice" 
                                name="maxPrice" 
                                placeholder="Máximo"
                                onChange={(event) => setSearch({...search, maxPrice: Number(event.target.value)})}
                            />
                        </PriceRangeContainer>
                        <LocationAccordion isActive={isLocationActive}>
                            <label htmlFor="location" onClick={() => setIsLocationActive(!isLocationActive)}>
                                <div></div>
                                Local
                            </label>
                            <div>
                                <GenericInput 
                                    type="text" 
                                    id="location" 
                                    name="location" 
                                    placeholder="Quixadá"
                                    onChange={(event) => setSearch({...search, location: event.target.value})}
                                />
                            </div>
                        </LocationAccordion>
                    </AditionalInputs>
                </SearchInputContainer>
                <PhotographersList>
                    {Array.isArray(users) && users?.map(user => (
                        <PhotographerCard key={user._id.$oid} user={user}/>
                    ))}
                </PhotographersList>
            </SearchPhotographerContainer>
        </Container>
    )
}
