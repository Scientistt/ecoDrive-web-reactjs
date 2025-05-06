import { countryImages } from "assets";
import { AWSRegion } from "types";

const AWS_REGION: Record<string, AWSRegion> = {
    "us-east-1": {
        key: "us-east-1",
        icon: countryImages.united_states,
        name: "Norte da Virgínia",
        color: "blue.400",
        description: "Principal região dos EUA, com grande disponibilidade de serviços."
    },
    "us-east-2": {
        key: "us-east-2",
        icon: countryImages.united_states,
        name: "Ohio",
        color: "blue.500",
        description: "Região dos EUA com alta performance e custo mais acessível."
    },
    "us-west-1": {
        key: "us-west-1",
        icon: countryImages.united_states,
        name: "Norte da Califórnia",
        color: "purple.500",
        description: "Ideal para workloads na costa oeste dos EUA."
    },
    "us-west-2": {
        key: "us-west-2",
        icon: countryImages.united_states,
        name: "Oregon",
        color: "purple.400",
        description: "Uma das regiões mais econômicas da AWS nos EUA."
    },
    "ca-central-1": {
        key: "ca-central-1",
        icon: countryImages.canada,
        name: "Canadá (Central)",
        color: "cyan.500",
        description: "Data center no Canadá, atende exigências locais de dados."
    },
    "sa-east-1": {
        key: "sa-east-1",
        icon: countryImages.brazil,
        name: "América do Sul (São Paulo)",
        color: "green.500",
        description: "Região brasileira ideal para latência mínima na América Latina."
    },
    "eu-west-1": {
        key: "eu-west-1",
        icon: countryImages.ireland,
        name: "Irlanda",
        color: "orange.400",
        description: "Popular na Europa por sua estabilidade e conformidade."
    },
    "eu-west-2": {
        key: "eu-west-2",
        icon: countryImages.england,
        name: "Londres",
        color: "orange.500",
        description: "Boa opção para aplicações no Reino Unido."
    },
    "eu-west-3": {
        key: "eu-west-3",
        icon: countryImages.france,
        name: "Paris",
        color: "orange.600",
        description: "Para workloads com requisitos legais na França."
    },
    "eu-central-1": {
        key: "eu-central-1",
        icon: countryImages.germany,
        name: "Frankfurt",
        color: "orange.300",
        description: "Região alemã com foco em conformidade e segurança."
    },
    "eu-north-1": {
        key: "eu-north-1",
        icon: countryImages.sweden,
        name: "Estocolmo",
        color: "teal.400",
        description: "Energia renovável e boa performance no norte da Europa."
    },
    "eu-south-1": {
        key: "eu-south-1",
        icon: countryImages.italy,
        name: "Milão",
        color: "teal.500",
        description: "Região para compliance e baixa latência no sul da Europa."
    },
    "eu-south-2": {
        key: "eu-south-2",
        icon: countryImages.spain,
        name: "Espanha (Madri)",
        color: "teal.600",
        description: "Nova região para workloads focados na Península Ibérica."
    },
    "eu-central-2": {
        key: "eu-central-2",
        icon: countryImages.switzerland,
        name: "Zurique",
        color: "orange.200",
        description: "Ideal para requisitos financeiros e governamentais na Suíça."
    },
    "me-south-1": {
        key: "me-south-1",
        icon: countryImages.bahrain,
        name: "Oriente Médio (Bahrein)",
        color: "red.500",
        description: "Para aplicações no Golfo Pérsico com alta segurança."
    },
    "me-central-1": {
        key: "me-central-1",
        icon: countryImages.emirates,
        name: "Oriente Médio (Emirados Árabes)",
        color: "red.400",
        description: "Infraestrutura moderna no Oriente Médio."
    },
    "af-south-1": {
        key: "af-south-1",
        icon: countryImages.south_africa,
        name: "África do Sul (Cidade do Cabo)",
        color: "yellow.500",
        description: "Primeira região africana da AWS."
    },
    "ap-southeast-1": {
        key: "ap-southeast-1",
        icon: countryImages.singapore,
        name: "Cingapura",
        color: "pink.400",
        description: "Popular na Ásia por sua baixa latência e estabilidade."
    },
    "ap-southeast-2": {
        key: "ap-southeast-2",
        icon: countryImages.australia,
        name: "Sydney",
        color: "pink.500",
        description: "Boa conectividade para usuários na Oceania."
    },
    "ap-southeast-3": {
        key: "ap-southeast-3",
        icon: countryImages.indonesia,
        name: "Jacarta",
        color: "pink.600",
        description: "Nova região estratégica no sudeste asiático."
    },
    "ap-southeast-4": {
        key: "ap-southeast-4",
        icon: countryImages.australia,
        name: "Melbourne",
        color: "pink.300",
        description: "Atende clientes no sul da Austrália."
    },
    "ap-east-1": {
        key: "ap-east-1",
        icon: countryImages.hong_kong,
        name: "Hong Kong",
        color: "pink.200",
        description: "Região especializada para a China e Ásia Oriental."
    },
    "ap-northeast-1": {
        key: "ap-northeast-1",
        icon: countryImages.japan,
        name: "Tóquio",
        color: "purple.300",
        description: "Alta disponibilidade para o Japão e leste da Ásia."
    },
    "ap-northeast-2": {
        key: "ap-northeast-2",
        icon: countryImages.south_korea,
        name: "Seul",
        color: "purple.400",
        description: "Alta performance para aplicações na Coreia do Sul."
    },
    "ap-northeast-3": {
        key: "ap-northeast-3",
        icon: countryImages.japan,
        name: "Osaka",
        color: "purple.200",
        description: "Redundância e recuperação de desastres no Japão."
    },
    "ap-south-1": {
        key: "ap-south-1",
        icon: countryImages.india,
        name: "Mumbai",
        color: "green.400",
        description: "Região indiana com alta demanda e conformidade local."
    },
    "ap-south-2": {
        key: "ap-south-2",
        icon: countryImages.india,
        name: "Hyderabad",
        color: "green.300",
        description: "Complementa a capacidade na Índia."
    },
    "cn-north-1": {
        key: "cn-north-1",
        icon: countryImages.china,
        name: "Pequim",
        color: "gray.500",
        description: "Região isolada operada por parceiros locais na China."
    },
    "cn-northwest-1": {
        key: "cn-northwest-1",
        icon: countryImages.china,
        name: "Ningxia",
        color: "gray.400",
        description: "Região AWS operada por parceiros na China continental."
    },

    unknown: {
        key: "unknown",
        icon: countryImages.blank,
        name: "Região desconhecida",
        color: "gray.200",
        description: "Essa região não está mapeada ou não é pública."
    }
};

export const getAWSRegion = (region: string = "unknown"): AWSRegion => {
    return AWS_REGION[region] || AWS_REGION.unknown;
};

export const listAWSRegions = (showBlank: boolean) => {
    const regions = [];
    for (const i in AWS_REGION) {
        if (i !== "unknown") regions.push(AWS_REGION[i]);
        else if (showBlank) regions.push(AWS_REGION[i]);
    }
    return regions;
};
