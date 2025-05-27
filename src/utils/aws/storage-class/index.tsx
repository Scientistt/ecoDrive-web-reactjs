import { AWSStorageClass } from "types";
import { LuFileCheck2, LuFileClock, LuFileX2 } from "react-icons/lu";

const TIER: Record<string, AWSStorageClass> = {
    STANDARD: {
        key: "STANDARD",
        bgColor: { base: "green.700", _dark: "green.500" },
        icon: <LuFileCheck2 />,
        color: "white",
        name: "Padrão",
        description: `A classe S3 Standard oferece armazenamento de objetos com alta durabilidade, disponibilidade e performance para dados acessados com frequência. É ideal para uma ampla variedade de casos de uso, como aplicações na nuvem, sites dinâmicos, distribuição de conteúdo, aplicações móveis e de jogos, e análise de big data. Com baixa latência e alto throughput, o S3 Standard é projetado para fornecer 99,99% de disponibilidade com um SLA de 99,9%.`
    },

    // INTELLIGENT_TIERING: {
    //     key: "INTELLIGENT_TIERING",
    //     bgColor: "yellow.600",
    //     color: "white",
    //     name: "Intelligent-Tiering",
    //     description: `O S3 Intelligent-Tiering é a primeira classe de armazenamento em nuvem que reduz automaticamente os custos de armazenamento em nível de objeto, movendo dados para o nível de acesso mais econômico com base na frequência de acesso. Sem impacto sobre a performance, taxas de recuperação ou sobrecarga operacional, é ideal para dados com padrões de acesso desconhecidos ou variáveis. Oferece latência de milissegundos e alta performance de taxa de transferência para dados acessados com muita frequência, pouca frequência e raramente acessados nos níveis Frequent Access, Infrequent Access e Archive Instant Access.`
    // },

    // STANDARD_IA: {
    //     key: "STANDARD_IA",
    //     bgColor: "green.800",
    //     color: "white",
    //     name: "Padrão - Acesso Infrequente",
    //     description: `A classe S3 Standard-Infrequent Access (Standard-IA) é indicada para dados acessados com menos frequência, mas que exigem acesso rápido quando necessários. Oferece os altos níveis de resiliência e throughput e a baixa latência da classe S3 Standard, com taxas reduzidas por GB de armazenamento e GB de recuperação. É ideal para armazenamento de longa duração, backups e armazenamentos de dados para arquivos de recuperação de desastres.`
    // },

    // ONEZONE_IA: {
    //     key: "ONEZONE_IA",
    //     bgColor: "pink.700",
    //     color: "white",
    //     name: "Zona Única - Acesso Infrequente",
    //     description: `O S3 One Zone-Infrequent Access (One Zone-IA) é indicado para dados acessados com menos frequência, mas que exigem acesso rápido quando necessários. Ao contrário de outras classes de armazenamento do S3, que armazenam dados em no mínimo três Zonas de Disponibilidade (AZs), o One Zone-IA armazena dados em uma única AZ, com um custo 20% inferior ao S3 Standard-IA. É ideal para clientes que querem uma opção de menor custo para dados acessados com pouca frequência, mas que não precisam da disponibilidade e da resiliência do S3 Standard ou S3 Standard-IA.`
    // },

    // GLACIER_IR: {
    //     key: "GLACIER_IR",
    //     bgColor: "cyan.600",
    //     color: "white",
    //     name: " Glacier Instant Retrieval",
    //     description: `A Amazon S3 Glacier Instant Retrieval é uma classe de armazenamento de arquivos que oferece o armazenamento de custo mais baixo para dados de longa duração, que raramente são acessados e exigem recuperação em milissegundos. É ideal para arquivar dados que precisam de acesso imediato, como imagens médicas, recursos de mídia de notícias ou arquivos de conteúdo gerado pelo usuário. Oferece o acesso mais rápido ao armazenamento de arquivo, com a mesma taxa de transferência e acesso em milissegundos que as classes de armazenamento S3 Standard e S3 Standard-IA.`
    // },

    // GLACIER: {
    //     key: "GLACIER",
    //     bgColor: "blue.700",
    //     color: "white",
    //     name: "Glacier Flexible Retrieval",
    //     description: `O S3 Glacier Flexible Retrieval oferece armazenamento de baixo custo para dados de arquivo que são acessados 1 a 2 vezes por ano e recuperados de forma assíncrona. É ideal para casos de uso de backup ou recuperação de desastres, oferecendo flexibilidade para recuperar grandes conjuntos de dados sem custo, com tempos de recuperação que variam de minutos a horas e com recuperações em massa gratuitas. Projetado para proporcionar 99,999999999% (onze noves) de durabilidade de dados e 99,99% de disponibilidade.`
    // },

    DEEP_ARCHIVE: {
        key: "DEEP_ARCHIVE",
        bgColor: { base: "blue.700", _dark: "blue.600" },
        color: "white",
        icon: <LuFileClock />,
        name: "Arquivamento Profundo",
        description: `A S3 Glacier Deep Archive é a classe de armazenamento mais acessível do Amazon S3, oferecendo suporte à retenção e preservação digital de longo prazo para dados que podem ser acessados uma ou duas vezes por ano. É ideal para clientes que mantêm conjuntos de dados por 7 a 10 anos ou mais para cumprir requisitos de conformidade regulatória, especialmente em setores altamente regulados como serviços financeiros, saúde e setores públicos. Todos os objetos armazenados no S3 Glacier Deep Archive são replicados e armazenados em, pelo menos, três zonas de disponibilidade distribuídas geograficamente, protegidos por 99,999999999% de resiliência e podem ser restaurados em até 12 horas.`
    },

    // OUTPOSTS: {
    //     key: "OUTPOSTS",
    //     bgColor: "orange.600",
    //     color: "white",
    //     name: "Outposts",
    //     description: `O Amazon S3 em Outposts oferece armazenamento de objetos no local, fornecendo a mesma API do S3 e as mesmas capacidades de gerenciamento de dados para ambientes on-premises. É ideal para workloads que exigem armazenamento local de dados devido a requisitos de latência, residência de dados ou conformidade. Os dados são armazenados em racks do Outposts, fornecendo uma solução de armazenamento de objetos gerenciada pela AWS em seu próprio data center.`
    // },

    unknown: {
        key: "unknown",
        bgColor: "red.600",
        color: "white",
        icon: <LuFileX2 />,
        name: "Desconhecido",
        description: `Não sei, porra!`
    }
};

export const getAWSStorageClass = (storageClass: string = "unknown"): AWSStorageClass => {
    return TIER[storageClass] || TIER.unknown;
};

export const listAWSStorageClasses = (showBlank: boolean) => {
    const tiers = [];
    for (const i in TIER) {
        if (i !== "unknown") tiers.push(TIER[i]);
        else if (showBlank) tiers.push(TIER[i]);
    }
    return tiers;
};
