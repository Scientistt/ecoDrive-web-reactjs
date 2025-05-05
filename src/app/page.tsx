import { Heading, VStack, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <>
            <VStack
                minH="100vh"
                align="center"
                pt="10%"
                pl="30%"
                pr="30%"
                pb="10%"
                bg={{ base: "gray.100", _dark: "gray.900" }}
            >
                <Heading fontSize="5xl">🌿 EcoDrive</Heading>
                <Text fontWeight="bold" mt="10px">
                    Armazene com consciência. Use com liberdade.
                </Text>
                <Text textAlign="justify" fontWeight="normal" mt="10px">
                    O EcoDrive é um sistema de armazenamento pessoal open source baseado em buckets (como os da AWS S3),
                    que organiza arquivos em tiers de armazenamento para otimizar espaço e reduzir custos. Ideal para
                    quem lida com muitos arquivos e precisa de uma solução eficiente, elegante e personalizável.
                </Text>

                <Text fontWeight="normal" mt="10px" textAlign="justify">
                    O EcoDrive nasceu da necessidade pessoal de guardar muitos arquivos sem sobrecarregar o SSD nem
                    depender de soluções comerciais e caras. Criado com amor, ele busca unir eficiência, economia e
                    liberdade. Mais que um drive, o EcoDrive é um lar consciente para os seus dados.
                </Text>
                <Text mt="30px">
                    💡 Para saber mais acesse:
                    <b>
                        <a href="https://github.com/Scientistt/ecoDrive-web-reactjs/">
                            github.com/Scientistt/ecoDrive-web-reactjs
                        </a>
                    </b>
                </Text>

                <Text mt="10px">Com carinho,</Text>

                <Text textAlign="center">
                    Fabio Vitor<br></br>
                    <b>
                        <a href="https://github.com/Scientistt">@Scientistt</a>
                    </b>
                    <br></br>
                    Criador e mantenedor do 🌿EcoDrive
                </Text>
            </VStack>
        </>
    );
}
