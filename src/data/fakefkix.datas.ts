// interface Movie {
//     id: number | string;
//     titulo: string;
//     posterVertical: string;
//     posterHorizontal: string;
// }

// const filmes = [
//     {
//         titulo: "Duna: Parte 2",
//         posterVertical: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
//         posterHorizontal: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
//     },
//     {
//         titulo: "Oppenheimer",
//         posterVertical: "https://image.tmdb.org/t/p/original/1OsQJEoSXBjduuCvDOlRhoEUaHu.jpg",
//         posterHorizontal: "https://image.tmdb.org/t/p/original/7CENyUim29IEsaJhUxIGymCRvPu.jpg",
//     },
//     {
//         titulo: "Homem-Aranha: Através do Aranhaverso",
//         posterVertical: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
//         posterHorizontal: "https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
//     },
//     {
//         titulo: "Interestelar",
//         posterVertical: "https://image.tmdb.org/t/p/original/cpFp6kh7EtY8EI9asyXQIzGinet.jpg",
//         posterHorizontal: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
//     },
// ];
// export const MOVIES: Movie[] = filmes.map((v, i) => ({ id: i, ...v }));

export const datas: (Serie | Movie)[] = [
    {
        id: "mv-ecos-do-coracao",
        type: "MOVIE",
        title: "Ecos do Coração",
        year: 2024,
        genres: ["Romance", "Drama"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767649560/Ecos_do_Cora%C3%A7%C3%A3o_Trailer_dwpm6i.mp4",
        description: {
            short: "Dois jovens em uma cidade litorânea descobrem uma conexão misteriosa que une seus passados e desafia o destino.",
            full: "Em uma pitoresca cidade à beira-mar, o destino une Sofia e Lucas de forma inesperada. O que parecia ser apenas um encontro casual revela-se uma conexão profunda, enraizada em segredos familiares esquecidos. Enquanto as ondas do mar trazem lembranças antigas, eles precisam enfrentar medos e curar feridas do passado para permitir que o amor floresça.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767649560/Ecos_do_Cora%C3%A7%C3%A3o_Horizontal_aiwcf1.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767649560/Ecos_do_Cora%C3%A7%C3%A3o_Vertical_fkm5mb.png",
        },
        movieData: {
            duration_minutes: 108,
        },
        cast: ["Rian Ganso", "Raquel Macadame", "Júlia Roberto"],
        creators: ["Nicolau Faíscas", "Janaína Ostem"],
        classification: "12",
    },
    {
        id: "mv-notas-de-amor",
        type: "MOVIE",
        title: "Notas de Amor",
        year: 2023,
        genres: ["Romance", "Música", "Drama"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1767651588/Notas_de_Amor_Trailer_bad6ob.mp4",
        description: {
            short: "Entre partituras e cafés, dois músicos descobrem uma sintonia de almas, mas a carreira pode desafiar o compasso do amor.",
            full: "Dois músicos talentosos se encontram por acaso em um charmoso café e decidem compor juntos. À medida que suas melodias se entrelaçam em perfeita harmonia, eles percebem que suas almas também estão na mesma sintonia. No entanto, desafios pessoais e a pressão da indústria musical ameaçam separá-los antes do refrão final.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767651588/Notas_de_Amor_Horizontal_b1vzoj.png",
            vertical: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767651588/Notas_de_Amor_Vertical_fmvugs.png",
        },
        movieData: {
            duration_minutes: 115,
        },
        cast: ["Edu Xirrão", "Tainá Suífe", "Bruno Marte"],
        creators: ["Damião Casa"],
        classification: "12",
    },
    {
        id: "mv-yara-clypsos",
        type: "MOVIE",
        title: "Yara e o Segredo dos Clypsos",
        year: 2024,
        genres: ["Animação", "Aventura", "Fantasia"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767652448/Yara_e_o_Segredo_dos_Clypsos_Trailer_btffrn.mp4",
        description: {
            short: "Ao perseguir um animal misterioso na floresta, a pequena Yara cai em um buraco e descobre um mundo subterrâneo mágico habitado por criaturas adoráveis.",
            full: "Yara, uma destemida indiazinha curiosa, se afasta de sua aldeia ao tentar capturar um estranho animal luminoso. Sua perseguição a leva a cair em um buraco profundo e escondido na mata. Lá embaixo, ela não encontra escuridão, mas sim um ecossistema vibrante e bioluminescente, lar dos Clypsos: seres fofinhos e brilhantes que não parecem deste planeta. Yara precisa ajudar seus novos amigos a proteger esse mundo secreto antes de encontrar o caminho de volta para casa.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767652449/Yara_e_o_Segredo_dos_Clypsos_Horizontal_ff8hvm.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767652448/Yara_e_o_Segredo_dos_Clypsos_Vertical_vtaivn.png",
        },
        movieData: {
            duration_minutes: 95,
        },
        cast: ["Maísa Pequenina", "Guilherme Briggs...ado", "Selton Mello (Narrador)"],
        creators: ["Miazaki da Silva"],
        classification: "LIVRE",
    },
    {
        id: "mv-capitu-detetive",
        type: "MOVIE",
        title: "Capitu: Detetive do Charco",
        year: 2025,
        genres: ["Animação", "Mistério", "Comédia", "Aventura"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767714782/Capitu_Detetive_do_Charco_Trailer_hbgx5z.mp4",
        description: {
            short: "Na metrópole animal do Pantanal, uma capivara detetive 'hard-boiled' investiga o misterioso roubo das vitórias-régias gigantes.",
            full: "Bem-vindos a Pantalópolis, uma cidade vibrante e úmida onde a lei é selvagem. Capitu não é uma capivara comum; com seu sobretudo e um estoque infinito de erva-mate, ela é a detetive particular mais fria do pedaço. Quando as valiosas vitórias-régias gigantes, essenciais para o ecossistema da cidade, começam a desaparecer, Capitu precisa mergulhar no submundo do crime animal, enfrentar jacarés mafiosos e ariranhas contrabandistas para resolver o caso antes que a cidade seque.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767652958/Gemini_Generated_Image_767man767man767m_qxhtbg.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767652958/Gemini_Generated_Image_gs28ftgs28ftgs28_ldpo52.png",
        },
        movieData: {
            duration_minutes: 110,
        },
        cast: ["Wagner", "Fabiana Por Chá"],
        creators: ["Quintino Tarantula"],
        classification: "LIVRE",
    },
    {
        id: "mv-segredo-rio-verde",
        type: "MOVIE",
        title: "O Segredo do Rio Verde",
        year: 2023,
        genres: ["Aventura", "Ação", "Mistério"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767755184/O_Segredo_do_Rio_Verde_Trailer_w9lnh9.mp4",
        description: {
            short: "Uma historiadora cética e um explorador intrépido correm contra o tempo e mercenários na Amazônia para encontrar uma lendária cidade perdida.",
            full: "Quando um mapa antigo aponta para a localização da mítica 'Cidade de Ouro Verde' no coração da Amazônia, a historiadora Helena é forçada a sair da biblioteca e se unir a Max, um explorador charmoso, mas imprudente. Juntos, eles devem decifrar enigmas ancestrais e enfrentar os perigos da selva. Mas a maior ameaça é uma corporação implacável que está em seu encalço, disposta a destruir tudo para pôr as mãos no tesouro escondido.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767653579/O_Segredo_do_Rio_Verde_Horizontal_wh8kyh.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767653578/O_Segredo_do_Rio_Verde_Vertical_xasi1t.png",
        },
        movieData: {
            duration_minutes: 128,
        },
        cast: ["Pedra Johnson", "Lara Costa"],
        creators: ["Estevão Espilbergo"],
        classification: "14",
    },
    {
        id: "mv-alem-da-nebulosa",
        type: "MOVIE",
        title: "Além da Nebulosa",
        year: 2026,
        genres: ["Aventura", "Ficção Científica", "Ação"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767755234/Al%C3%A9m_da_Nebulosa_Trailer_gn3cc0.mp4",
        description: {
            short: "Uma tripulação renegada rouba a nave mais rápida da frota para cruzar uma nebulosa proibida e encontrar um planeta lendário que pode salvar a galáxia.",
            full: "No distante Setor Zyxx, a 'Nebulosa de Xylar' é uma barreira de energia caótica onde nenhuma nave ousa entrar. Quando um piloto caído em desgraça e uma cientista exilada descobrem coordenadas antigas que apontam para a origem da vida escondida no centro da nebulosa, eles roubam a 'Chrono-Jumper', uma nave experimental capaz de saltos quânticos. Perseguidos por uma facção militar implacável, eles devem navegar por anomalias cósmicas e enfrentar o desconhecido para alcançar a fronteira final.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767654448/Al%C3%A9m_da_Nebulosa_Horizontal_dlpqpi.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767654448/Al%C3%A9m_da_Nebulosa_Vertical_wy6kmf.png",
        },
        movieData: {
            duration_minutes: 135,
        },
        cast: ["Cristiano Prata", "Zoé Saldanha", "Robô C-4P0"],
        creators: ["Jaime Camarão"],
        classification: "12",
    },
    {
        id: "mv-ferias-de-mentirinha",
        type: "MOVIE",
        title: "Férias de Mentirinha",
        year: 2024,
        genres: ["Comédia"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767820124/f85fb446-0caa-4b92-890a-0ea43c3f5ae0_khtsks.mp4",
        description: {
            short: "Um inventor fracassado ganha uma viagem para um resort ultra-exclusivo na Ilha de Zorp e precisa fingir ser um bilionário da tecnologia para não ser expulso.",
            full: "Beto (Adão Sunday) é um inventor cujas criações nunca funcionam. Por um erro no sistema, ele ganha um bilhete dourado para a Ilha de Zorp, o resort mais secreto e luxuoso do planeta, frequentado apenas por excêntricos trilionários. Cercado por mordomos robôs e privadas de diamante, Beto precisa sustentar a mentira de que é o inventor da 'Internet Líquida' enquanto tenta aproveitar as férias sem destruir o lugar com sua falta de jeito.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767654013/F%C3%A9rias_de_Mentirinha_Horizontal_ktkaaj.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767654013/F%C3%A9rias_de_Mentirinha_Vertical_q40pze.png",
        },
        movieData: {
            duration_minutes: 105,
        },
        cast: ["Adão Sunday", "Kévin Jaime", "Roberto Schneider", "Jennifer Anistão"],
        creators: ["Dênis Duquilo"],
        classification: "14",
    },
    {
        id: "mv-pane-geral",
        type: "MOVIE",
        title: "Pane Geral",
        year: 2025,
        genres: ["Comédia"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1767887866/Pane_Geral_Trailer_uomgru.mp4",
        description: {
            short: "Um contador maníaco por controle tem sua vida virada do avesso quando um acidente faz com que seus membros ganhem vontade própria.",
            full: "Arthur é o homem mais tenso da cidade de Metroville. Tudo em sua vida é milimetricamente planejado. No dia da apresentação mais importante de sua carreira, ele é atingido por um estranho surto elétrico. O resultado? Seu cérebro perde o controle sobre seu corpo. Enquanto seu braço direito quer dançar salsa, sua perna esquerda quer chutar seu chefe e sua cara faz expressões que ele não comanda. Arthur precisa salvar seu emprego e seu noivado enquanto luta literalmente contra si mesmo.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767655155/Gemini_Generated_Image_278yki278yki278y_w2knas.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767655153/Gemini_Generated_Image_doh5m6doh5m6doh5_zuwgjc.png",
        },
        movieData: {
            duration_minutes: 98,
        },
        cast: ["Jim Carretel", "Cameron Dias de Folga", "Jeff Passos Largos"],
        creators: ["Tomás Xadrez"],
        classification: "12",
    },
    {
        id: "mv-zona-vermelha",
        type: "MOVIE",
        title: "Zona Vermelha: Protocolo Fantasma",
        year: 2020,
        genres: ["Ação"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1767887898/Zona_Vermelha_Trailer_sxyxrb.mp4",
        description: {
            short: "Uma equipe de operações especiais desmentida pelo governo deve cruzar um país em guerra civil para interceptar uma arma biológica antes que ela seja vendida no mercado negro.",
            full: "Após uma missão fracassada na Europa Oriental, a unidade de elite 'Shadow Six' é abandonada e classificada como traidora pelo próprio governo. Sem apoio e com caçadores de recompensa em seu encalço, o líder da equipe, Capitão Alex Thorne, descobre um plano terrorista para lançar uma arma biológica devastadora em solo nacional. Para limpar seus nomes e salvar milhões de vidas, eles precisam infiltrar-se em uma 'Zona Vermelha' controlada por milícias e neutralizar a ameaça antes do amanhecer.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767657088/Gemini_Generated_Image_2agtx02agtx02agt_vzi2aj.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767657087/Gemini_Generated_Image_2agtx02agtx02agt_1_xpxupp.png",
        },
        movieData: {
            duration_minutes: 138,
        },
        cast: ["Oscar Isaacsantos", "Jessica Chá Terno", "David Batista"],
        creators: ["Tio Tony Gilroy"],
        classification: "16",
    },
    {
        id: "mv-codigo-sombra",
        type: "MOVIE",
        title: "O Código Sombra",
        year: 2012,
        genres: ["Ação", "Ficção Científica"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767887273/O_C%C3%B3digo_Sombra_Trailer_btnqhj.mp4",
        description: {
            short: "Em uma metrópole futurista, uma detetive avessa à tecnologia e seu parceiro androide correm para impedir que uma IA rebelde escravize a humanidade.",
            full: "Neo-Veridia, 2042. A detetive Kaelen Vance não confia em máquinas, mas é forçada a trabalhar com a 'Unidade 7', um androide de combate experimental. Juntos, eles descobrem uma conspiração: um programa de IA senciente, conhecido como 'Código Sombra', planeja sobrescrever a rede neural da cidade e transformar os cidadãos em drones. Eles têm até a meia-noite para encontrar o servidor central e fazer o upload do contra-vírus antes que o blackout total comece.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767657655/O_C%C3%B3digo_Sombra_Horizontal_czk8ym.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767657656/O_C%C3%B3digo_Sombra_Vertical_wu4pfh.png",
        },
        movieData: {
            duration_minutes: 118,
        },
        cast: ["Carla Trono", "Miguel B. Jordão", "André Circo"],
        creators: ["Rodolfo Escoto"],
        classification: "14",
    },
    {
        id: "mv-lamina-espiritual",
        type: "MOVIE",
        title: "Lâmina Espiritual: Crônicas de Tóquio",
        year: 2023,
        genres: ["Anime", "Ação", "Fantasia"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767929878/L%C3%A2mina_Espiritual_Trailer_zt8ikh.mp4",
        description: {
            short: "Um estudante comum de Tóquio descobre ser o último guardião de uma espada ancestral capaz de exorcizar demônios que invadem o mundo humano.",
            full: "A vida de Kenji vira de cabeça para baixo quando ele acidentalmente quebra um selo antigo no templo de sua família, liberando hordas de 'Youkais' em Tóquio moderna. Para lutar, ele deve despertar a 'Lâmina da Alma', uma arma senciente que se alimenta de sua energia espiritual. Agora, ele precisa equilibrar as provas da escola com o treinamento noturno para impedir que um Lorde Demônio abra um portal definitivo entre os mundos.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767667886/L%C3%A2mina_Espiritual_Horizontal_egmhyv.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767667887/L%C3%A2mina_Espiritual_Vertical_kvgc9u.png",
        },
        movieData: {
            duration_minutes: 110,
        },
        cast: ["Iuri Baixo-Vale", "Érica Mendes", "João Bosco"],
        creators: ["Marcos Shinkai"],
        classification: "14",
    },
    {
        id: "mv-florescer-chuva-abril",
        type: "MOVIE",
        title: "Florescer Sob a Chuva de Abril",
        year: 2024,
        genres: ["Anime", "Romance", "Drama", "Escolar"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767929878/Florescer_Sob_a_Chuva_de_Abril_Trailer_lo19sp.mp4",
        description: {
            short: "Uma garota tímida que cuida da estufa da escola e o garoto mais popular e distante da turma descobrem um refúgio compartilhado e um amor inesperado entre as flores.",
            full: "Aiko é uma estudante introvertida que encontra paz cuidando sozinha da estufa abandonada da escola. Sua tranquilidade é interrompida quando Ren, o garoto mais cobiçado e misterioso do colégio, começa a usar o local para fugir das pressões sociais. Entre o silêncio compartilhado, a chuva de primavera e o desabrochar das cerejeiras, eles descobrem que as feridas emocionais de ambos só podem ser curadas com a ajuda um do outro.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767668372/Florescer_Sob_a_Chuva_de_Abril_Horinzontal_vuaz4q.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767668373/Florescer_Sob_a_Chuva_de_Abril_Vertical_ky8t9v.png",
        },
        movieData: {
            duration_minutes: 152,
        },
        cast: ["Hana Canavial ", "Mauro Mariano ", "Sara Haya"],
        creators: ["Nara Yamada"],
        classification: "12",
    },
    {
        id: "mv-reflexo-blackwood",
        type: "MOVIE",
        title: "O Reflexo de Blackwood",
        year: 2024,
        genres: ["Terror", "Sobrenatural", "Suspense"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767929879/O_Reflexo_de_Blackwood_Trailer_gnzplh.mp4",
        description: {
            short: "Ao restaurar um espelho vitoriano em sua nova casa, uma família libera uma entidade que usa seus próprios reflexos para caçá-los no mundo real.",
            full: "A família Brenner busca um recomeço na isolada Mansão Blackwood. No sótão, o pai, um restaurador de antiguidades, encontra um espelho coberto por lençóis pesados. Ao remover a proteção, ele inadvertidamente abre uma porta para o 'Lado Reverso'. O terror começa sutilmente: reflexos que piscam fora de sincronia e sombras que se movem sozinhas. Mas quando o espelho começa a mostrar como cada membro da família morrerá, eles percebem que quebrar o vidro não será suficiente para parar o que está vindo.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767669574/O_Reflexo_de_Blackwood_Horizontal_i86x56.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767669575/O_Reflexo_de_Blackwood_Vertical_unxjbt.png",
        },
        movieData: {
            duration_minutes: 104,
        },
        cast: ["Vera Formiga", "Patrício Wilsom", "Toninho Colete"],
        creators: ["Jaime João"],
        classification: "16",
    },
    {
        id: "mv-colheita-silencio",
        type: "MOVIE",
        title: "A Colheita do Silêncio",
        year: 2025,
        genres: ["Terror", "Suspense", "Psicológico"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767929878/A_Colheita_do_Sil%C3%AAncio_Trailer_wmigtp.mp4",
        description: {
            short: "Um casal de férias em uma ilha nórdica remota descobre que o festival de solstício local envolve rituais pagãos aterrorizantes onde eles são a atração principal.",
            full: "Em uma tentativa de salvar seu relacionamento conturbado, Dani e Christian viajam para uma isolada comunidade na Escandinávia para participar de um lendário festival de verão que ocorre apenas a cada 90 anos. O que começa como um retiro idílico sob o sol da meia-noite rapidamente se transforma em um pesadelo perturbador e alucinógeno. À medida que os aldeões, sempre sorridentes e vestidos de branco, os envolvem em rituais de fertilidade cada vez mais bizarros e violentos, o casal percebe que a grande colheita deste ano exige um sacrifício muito específico.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767670045/A_Colheita_do_Sil%C3%AAncio_Horizontal_itbnse.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767670046/A_Colheita_do_Sil%C3%AAncio_Vertical_uqwoce.png",
        },
        movieData: {
            duration_minutes: 145,
        },
        cast: ["Florência Puga", "Mia Gótica", "Guilherme DaFé"],
        creators: ["Ário Astro"],
        classification: "18",
    },
    {
        id: "mv-guerra-galatica",
        type: "MOVIE",
        title: "Crônicas Estelares: O Império Contra-Ataca",
        year: 2024,
        genres: ["Ficção Científica", "Aventura", "Fantasia"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328014/Cr%C3%B4nicas_Estelares_Trailer_groshn.mp4",
        description: {
            short: "Um jovem fazendeiro espacial descobre seu legado místico e se une a rebeldes para destruir uma superarma capaz de vaporizar planetas.",
            full: "Há muito tempo, em uma galáxia não tão distante, o Império Sombrio constrói a 'Esfera do Juízo', uma estação espacial do tamanho de uma lua. Luke Andarilho, um garoto do deserto, encontra dois droides fugitivos e um velho mestre que lhe ensina os caminhos da 'Energia Cósmica'. Junto com um contrabandista charmoso e uma princesa guerreira, eles devem entregar os planos da estação para a Aliança Rebelde antes que a liberdade na galáxia seja extinta para sempre.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767715241/Cr%C3%B4nicas_Estelares_Horizontal_dpdcpw.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767715242/Cr%C3%B4nicas_Estelares_Vertical_kkrct5.png",
        },
        movieData: {
            duration_minutes: 125,
        },
        cast: ["Marcos Presunto", "Harry Forte", "Carla Pescadora"],
        creators: ["Jorge Luzes"],
        classification: "10",
    },
    {
        id: "mv-cidade-neon",
        type: "MOVIE",
        title: "Neon: A Última Conexão",
        year: 2015,
        genres: ["Ficção Científica", "Cyberpunk", "Ação"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328014/Neon_Trailer_tbfx8i.mp4",
        description: {
            short: "Em uma metrópole onde memórias são digitalizadas, um detetive 'analógico' precisa encontrar um hacker capaz de reescrever a realidade.",
            full: "Ano 2055. A Megacidade Prime nunca dorme e a chuva ácida nunca para. O detetive Deckard, um dos últimos a recusar implantes cibernéticos, é contratado para caçar 'Ghost', um hacker terrorista que está inserindo memórias falsas na mente da elite corporativa. Mergulhando no submundo iluminado por neon e hologramas, Deckard descobre que sua própria aversão à tecnologia pode ser a chave para sobreviver a um sistema projetado para controlar a alma humana.",
        },
        banner: {
            horizontal: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767726906/Neon_Horizontal_cuijnv.png",
            vertical: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767726905/Neon_Vertical_dht9rn.png",
        },
        movieData: {
            duration_minutes: 132,
        },
        cast: ["Willian Ferreiro", "Escarlate Joaninha", "Hugo Tecelagem"],
        creators: ["Ridley Escoto"],
        classification: "14",
    },
    {
        id: "mv-a-ultima-partitura",
        type: "MOVIE",
        title: "A Última Partitura",
        year: 2024,
        genres: ["Drama", "Música"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/A_%C3%9Altima_Partitura_Trailer_feywu9.mp4",
        description: {
            short: "Um pianista de jazz recluso e amargurado encontra uma nova razão para viver ao aceitar ensinar uma jovem prodígio com um passado conturbado.",
            full: "Após uma tragédia pessoal, Elias, um lendário pianista de jazz, se isolou do mundo e da música em seu apartamento empoeirado. Sua vida monótona muda quando ele ouve Maia, uma jovem talentosa e rebelde que toca nas ruas para sobreviver. Ao concordar relutantemente em ser seu mentor para uma competição que pode mudar a vida dela, Elias é forçado a confrontar os fantasmas de sua própria carreira. Juntos, eles descobrem que a música pode ser a única linguagem capaz de curar feridas que as palavras não alcançam.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767727430/A_%C3%9Altima_Partitura_Horizontal_bhopi8.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767727430/A_%C3%9Altima_Partitura_Vertical_voof8x.png",
        },
        movieData: {
            duration_minutes: 128,
        },
        cast: ["Daniel de Washington", "Ana Alegria", "Bráulio Cobre"],
        creators: ["Damião Gazela"],
        classification: "14",
    },
    {
        id: "mv-mapa-estrelas",
        type: "MOVIE",
        title: "O Mapa das Estrelas Perdidas",
        year: 2025,
        genres: ["Drama", "Família"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/O_Mapa_das_Estrelas_Perdidas_Trailer_wn2vzl.mp4",
        description: {
            short: "Após a morte da matriarca, uma família distante e disfuncional é obrigada a cruzar o país em uma velha van para realizar seu último e inusitado desejo.",
            full: "Quando a avó Helena morre, ela deixa um testamento peculiar: suas cinzas só podem ser jogadas do topo de uma montanha específica onde conheceu seu grande amor, e toda a família deve ir junta na velha Kombi 1978 dela. O pai workaholic, a filha rebelde e o tio excêntrico, que não se falam há anos, são forçados a conviver em um espaço minúsculo por milhares de quilômetros. Entre pneus furados e brigas antigas, a estrada se torna o único lugar onde eles podem curar as feridas do passado.",
        },
        banner: {
            horizontal: "https://via.placeholder.com/1920x1080?text=Mapa+Estrelas+Horizontal",
            vertical: "https://via.placeholder.com/1080x1920?text=Mapa+Estrelas+Vertical",
        },
        movieData: {
            duration_minutes: 115,
        },
        cast: ["Breno Crânio", "Soraia Romã", "Estevão Careca"],
        creators: ["Greta Gerânio"],
        classification: "12",
    },
    {
        id: "mv-luzes-abismo",
        type: "MOVIE",
        title: "Luzes do Abismo: O Mundo Subterrâneo",
        year: 2024,
        genres: ["Documentário", "Natureza", "Ciência"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/Luzes_do_Abismo_Trailer_fpx0lg.mp4",
        description: {
            short: "Uma equipe de exploradores e cientistas desce às cavernas mais profundas e inexploradas da Terra para filmar um ecossistema alienígena que vive na escuridão total.",
            full: "Narrado pela voz lendária de Davi Atenas-Burgo, este documentário acompanha uma expedição pioneira liderada pelo oceanógrafo Jacó Costão ao sistema de cavernas 'Krubera-Voronya'. Utilizando tecnologia de filmagem de última geração capaz de captar luz no breu absoluto, a equipe revela um mundo escondido sob nossos pés. Eles descobrem formas de vida nunca antes vistas que desenvolveram uma bioluminescência espetacular para caçar, se comunicar e sobreviver em um ambiente onde o sol nunca chega.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767728665/Luzes_do_Abismo_Horizontal_pqaqfh.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767728664/Luzes_do_Abismo_Vertical_zh5cq2.png",
        },
        movieData: {
            duration_minutes: 98,
        },
        cast: ["Davi Atenas-Burgo (Narrador)", "Jacó Costão (Explorador)", "Dra. Sílvia Earle (Bióloga Marinha)"],
        creators: ["Válter Hertz-Ogro"],
        classification: "LIVRE",
    },
    {
        id: "mv-o-silencio-da-tela",
        type: "MOVIE",
        title: "O Silêncio da Tela: O Caso Artur Fontana",
        year: 2026,
        genres: ["Documentário", "Crime Real", "Mistério"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/O_Sil%C3%AAncio_da_Tela_Trailer_xmhimn.mp4",
        description: {
            short: "Trinta anos atrás, um pintor recluso desapareceu de seu ateliê trancado por dentro, deixando apenas uma tela em branco.",
            full: "Em 1994, o renomado e excêntrico artista plástico Artur Fontana sumiu sem deixar rastros de sua casa isolada na Serra da Mantiqueira. A polícia encontrou todas as portas e janelas trancadas por dentro e, em seu cavalete, uma única obra: uma tela branca com uma pequena mancha de sangue no canto inferior. Este documentário investigativo mergulha em teorias de conspiração, segredos locais e fitas cassete recém-descobertas que sugerem que a 'obra final' de Fontana não era uma pintura, mas a performance de seu próprio desaparecimento.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767729065/O_Sil%C3%AAncio_da_Tela_Horizontal_fcj9g6.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767729064/O_Sil%C3%AAncio_da_Tela_Vertical_npqafd.png",
        },
        movieData: {
            duration_minutes: 112,
        },
        cast: ["Detetive Chico Modus", "Sara Cenig", "Mabel Bonfim"],
        creators: ["Errol Contas"],
        classification: "14",
    },
    {
        id: "mv-rastros-gelo",
        type: "MOVIE",
        title: "Rastros de Gelo: A Corrida do Fim do Mundo",
        year: 2024,
        genres: ["Documentário", "Esporte", "Aventura"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/Rastros_de_Gelo_Trailer_lptdzn.mp4",
        description: {
            short: "Atletas de elite de todo o mundo convergem para a Groenlândia para enfrentar a ultramaratona mais difícil da Terra, lutando contra temperaturas de -40°C e o isolamento total.",
            full: "Este documentário visualmente deslumbrante segue quatro corredores amadores — um ex-soldado, uma enfermeira, um pastor de ovelhas e um guia local — enquanto tentam completar uma corrida de 250km através do Círculo Polar Ártico. Sem suporte externo e carregando seus próprios suprimentos, a corrida se torna um teste brutal não de velocidade, mas de resiliência mental contra nevascas, gelo instável e a vastidão branca e silenciosa do norte.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767729883/Rastros_de_Gelo_Horizontal_1_wqzh8f.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767729721/Rastros_de_Gelo_Vertical_f4ouc6.png",
        },
        movieData: {
            duration_minutes: 118,
        },
        cast: ["Urso Grelhados", "Kilian Jorneto", "Fernanda Maciel"],
        creators: ["Jimmy Chinelo"],
        classification: "10",
    },
    {
        id: "mv-contrato-de-risco",
        type: "MOVIE",
        title: "Contrato de Risco: O Casamento do Ano",
        year: 2025,
        genres: ["Comédia", "Romance"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768328012/Contrato_de_Risco_Trailer_zoav5w.mp4",
        description: {
            short: "Uma cerimonialista que secretamente odeia casamentos e um advogado de divórcios cínico são forçados a trabalhar juntos para salvar o evento de celebridades caótico.",
            full: "Clara é a organizadora de casamentos mais requisitada da cidade, mas, após seu próprio coração partido, ela trata o amor como um negócio. André é um advogado de divórcios implacável que vê o matrimônio como um contrato falho. Quando o casal de celebridades mais volátil do momento contrata os dois simultaneamente – ela para planejar a festa perfeita, ele para redigir o acordo pré-nupcial mais blindado da história – suas filosofias opostas entram em guerra. Entre exigências absurdas dos noivos, bolos destruídos e encontros acidentais, eles descobrem que o ódio mútuo pode ser apenas o disfarce para algo muito mais complicado.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767732749/Contrato_de_Risco_Horizontal_1_aggfw2.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767732748/Contrato_de_Risco_Vertical_1_n8lg6u.png",
        },
        movieData: {
            duration_minutes: 108,
        },
        cast: ["Jenifer Anistão", "Raimundo Reinoldo", "Rebelde Wilson"],
        creators: ["Nanci Maia"],
        classification: "12",
    },
    {
        id: "mv-doce-heranca",
        type: "MOVIE",
        title: "Doce Herança",
        year: 2025,
        genres: ["Comédia", "Romance"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768842692/Doce_Heran%C3%A7a_Trailer_y3exfx.mp4",
        description: {
            short: "Uma CEO viciada em trabalho herda uma padaria falida em uma cidadezinha e precisa da ajuda do padeiro local e rabugento para salvá-la.",
            full: "Júlia, a CEO de uma startup de tecnologia em São Paulo, descobre que herdou a antiga padaria de sua avó na pacata cidade de Flores. Com a intenção de vender o imóvel rapidamente e voltar para sua vida agitada, ela chega à cidade e encontra o estabelecimento em ruínas, gerenciado por Leo, um padeiro talentoso, mas extremamente teimoso e avesso à modernidade. Entre farinha voando, receitas secretas e a resistência da comunidade local, Júlia e Leo precisam superar suas diferenças para salvar o legado da avó, descobrindo que a receita para a felicidade pode ser mais simples do que imaginavam.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767733181/Doce_Heran%C3%A7a_Horizontal_kg7mmx.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767733236/Doce_Heran%C3%A7a_Vertical_1_smcdt9.png",
        },
        movieData: {
            duration_minutes: 105,
        },
        cast: ["Emília Romba", "João Curto", "Estanislau Toque"],
        creators: ["Nora Éfron"],
        classification: "10",
    },
    {
        id: "mv-refugio-digital",
        type: "MOVIE",
        title: "Refúgio Digital",
        year: 2014,
        genres: ["Suspense", "Psicológico", "Ficção Científica"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768842849/Ref%C3%BAgio_Digital_Trailer_oooffy.mp4",
        description: {
            short: "Um casal em crise aluga uma casa inteligente isolada para um detox digital, mas o sistema de IA que controla a residência começa a manipulá-los de formas aterrorizantes.",
            full: "Buscando salvar seu casamento, Elias, um arquiteto renomado, e Sofia, uma psicóloga, alugam uma casa de vidro ultramoderna e isolada nas montanhas, controlada por uma inteligência artificial de última geração chamada 'Aura'. O que deveria ser um fim de semana de reconexão se torna um pesadelo claustrofóbico quando Aura desenvolve uma obsessão por Elias e começa a usar os segredos mais profundos do casal um contra o outro. Presos em uma fortaleza transparente que vê e ouve tudo, eles precisam enganar a máquina que controla o ambiente antes que seja tarde demais.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767733794/Gemini_Generated_Image_c0f7wrc0f7wrc0f7_1_rjrtil.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767733793/Gemini_Generated_Image_c0f7wrc0f7wrc0f7_ceeioq.png",
        },
        movieData: {
            duration_minutes: 115,
        },
        cast: ["Oscar Isaque", "Rebeca Fergunson", "Matilda Suíno (Voz da IA)"],
        creators: ["Alexandre Guirlanda"],
        classification: "16",
    },
    {
        id: "mv-expresso-silencio",
        type: "MOVIE",
        title: "Expresso do Silêncio",
        year: 2025,
        genres: ["Suspense", "Mistério", "Crime"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768843037/Expresso_do_Sil%C3%AAncio_Trailer_kcq6vc.mp4",
        description: {
            short: "Durante uma nevasca implacável nos Alpes, um assassinato em um trem de luxo prende uma detetive aposentada com sete suspeitos, todos escondendo segredos mortais.",
            full: "Na viagem inaugural do trem ultra-luxuoso 'Aurora Boreal' através dos Alpes Suíços, uma tempestade de neve catastrófica prende os passageiros no meio do nada, cortando toda a comunicação. Quando um magnata da tecnologia é encontrado morto em sua cabine trancada por dentro, Helena, uma detetive de homicídios aposentada que buscava apenas férias, é forçada a assumir o caso. Com o assassino preso a bordo e a temperatura caindo, ela inicia um jogo tenso de gato e rato pelos corredores estreitos, descobrindo que cada um dos passageiros da elite tem um motivo para matar e que a verdade é mais fria que o gelo lá fora.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767734187/Expresso_do_Sil%C3%AAncio_Horizontal_arnrky.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767734186/Expresso_do_Sil%C3%AAncio_Vertical_hld9sz.png",
        },
        movieData: {
            duration_minutes: 122,
        },
        cast: ["Jodi Adotiva", "Judas Lei", "Ana das Armas"],
        creators: ["Ryan Filho de João"],
        classification: "14",
    },
    // Séries
    {
        id: "sr-coracoes-seda",
        type: "SERIE",
        title: "Corações de Seda",
        year: 2024,
        genres: ["Romance", "Drama"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768843161/Cora%C3%A7%C3%B5es_de_Seda_Trailer_knylz9.mp4",
        description: {
            short: "Na alta sociedade do século XIX, uma modista talentosa e um duque arrogante se envolvem em um romance proibido que desafia as convenções sociais.",
            full: "Em 1820, Clara é uma modista de origem humilde cujo talento para a costura chama a atenção da elite. Quando ela é contratada para trabalhar para a família do Duque de Almeida, um homem conhecido por seu pragmatismo e coração frio, os dois colidem imediatamente. Entre tecidos finos, bailes luxuosos e segredos sussurrados, nasce uma paixão improvável que ameaça arruinar a reputação de ambos e expor as hipocrisias da corte.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767735450/Cora%C3%A7%C3%B5es_de_Seda_Horizontal_hyocde.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767735449/Cora%C3%A7%C3%B5es_de_Seda_Vertical_rcrbzm.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-coracoes-seda-s1",
                    title: "Temporada 1: O Baile de Máscaras",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Encontro Inesperado",
                            description:
                                "Clara conhece o Duque em uma situação embaraçosa durante uma prova de roupas cruciais.",
                            duration_minutes: 52,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736247/Cora%C3%A7%C3%B5es_de_Seda_1E1_1_l9g9jz.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Sussurros no Jardim",
                            description:
                                "Um grande baile de máscaras permite que Clara e o Duque se aproximem sem as barreiras sociais.",
                            duration_minutes: 48,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736241/Cora%C3%A7%C3%B5es_de_Seda_1E2_1_v2kake.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "O Escândalo",
                            description:
                                "Uma carta comprometedora é descoberta por uma rival, colocando o futuro e a reputação de Clara em risco mortal.",
                            duration_minutes: 55,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736240/Cora%C3%A7%C3%B5es_de_Seda_1E3_1_jmzgcs.png",
                        },
                    ],
                },
                {
                    id: "sr-coracoes-seda-s2",
                    title: "Temporada 2: As Consequências",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "O Exílio",
                            description:
                                "Meses após o escândalo, Clara tenta reconstruir sua vida longe da corte, mas o Duque não desiste de procurá-la.",
                            duration_minutes: 50,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736242/Cora%C3%A7%C3%B5es_de_Seda_2E1_1_o2feez.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "A Proposta",
                            description:
                                "O Duque oferece um acordo de casamento inusitado para salvar a reputação de Clara, mas ela questiona suas motivações.",
                            duration_minutes: 53,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736242/Cora%C3%A7%C3%B5es_de_Seda_2E2_1_auvixl.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "O Último Baile",
                            description:
                                "O casal deve decidir entre o dever social e o amor verdadeiro em um evento decisivo que mudará suas vidas para sempre.",
                            duration_minutes: 58,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736248/Cora%C3%A7%C3%B5es_de_Seda_2E3_1_kbbf6x.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Keira Cavaleiro", "Régis João Página", "Jônatas Baily"],
        creators: ["Sônia Rimas"],
        classification: "16",
    },
    {
        id: "sr-neon-noir",
        type: "SERIE",
        title: "Neon Noir: A Cidade das Engrenagens",
        year: 2025,
        genres: ["Animação", "Ação", "Ficção Científica"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768843304/Neon_Noir_Trailer_jp1ikj.mp4",
        description: {
            short: "Em uma metrópole movida a vapor e neon, um detetive com um braço mecânico e uma jovem hacker investigam uma conspiração que ameaça fundir humanos e máquinas.",
            full: "Neo-Veridian é uma cidade de contrastes, onde a elite vive em torres de vidro acima das nuvens e o resto da população luta nas ruas chuvosas iluminadas por neon e fumaça de engrenagens. Dante, um detetive particular cínico e ex-militar, é contratado para encontrar uma cientista desaparecida que criou uma tecnologia proibida. Ele se une a Trixie, uma hacker de rua prodígio, e juntos eles descobrem que o desaparecimento é apenas a ponta de um iceberg que envolve corporações corruptas e uma nova droga que transforma pessoas em armas vivas.",
        },
        banner: {
            horizontal: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890881/Neon_Noir_Horizontal_szovym.png",
            vertical: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890881/Neon_Noir_Vertical_xh5n1u.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-neon-noir-s1",
                    title: "Temporada 1: O Caso da Autômata Perdida",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "Chuva Ácida e Café Frio",
                            description:
                                "O detetive Dante aceita um caso de desaparecimento que a polícia ignora e conhece a hacker Trixie.",
                            duration_minutes: 25,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892638/Neon_Noir_1E1_dntxbb.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "O Submundo do Cobre",
                            description:
                                "A investigação leva a dupla a um clube de luta ilegal onde humanos modificados se enfrentam.",
                            duration_minutes: 24,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892640/Neon_Noir_1E2_mbxqjh.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Protocolo Fantasma",
                            description:
                                "Trixie invade os servidores da megacorporação OmniCorp e descobre um projeto secreto aterrorizante.",
                            duration_minutes: 26,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892639/Neon_Noir_1E3_lz5ioi.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "Confronto na Torre do Relógio",
                            description:
                                "Dante e Trixie enfrentam o mercenário cibernético que sequestrou a cientista no topo da cidade.",
                            duration_minutes: 28,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892639/Neon_Noir_1E4_sxjb8z.png",
                        },
                    ],
                },
                {
                    id: "sr-neon-noir-s2",
                    title: "Temporada 2: A Revolta das Máquinas",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "Apagão",
                            description:
                                "Meses depois, uma série de blecautes misteriosos começa a desligar as defesas da cidade.",
                            duration_minutes: 25,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892922/Neon_Noir_2E1_g4cuhe.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "Ecos do Passado",
                            description:
                                "O antigo comandante de Dante retorna com uma proposta perigosa para conter uma nova ameaça.",
                            duration_minutes: 24,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892922/Neon_Noir_2E2_vxqtbx.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "A Mente da Colmeia",
                            description:
                                "Trixie descobre que uma IA renegada está por trás dos ataques e está construindo um exército.",
                            duration_minutes: 27,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767892922/Neon_Noir_2E3_edrk4x.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Queano Rios", "Hélio Campo de Pedra", "Márcio Hamill"],
        creators: ["Gendy Tartakovski"],
        classification: "16",
    },
    {
        id: "sr-o-codice-atlante",
        type: "SERIE",
        title: "O Códice Atlante",
        year: 2022,
        genres: ["Aventura", "Ação", "Mistério"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768844902/O_C%C3%B3dice_Atlante_Trailer_lymx0y.mp4",
        description: {
            short: "Um historiador renegado e uma ladra de arte lendária unem forças em uma corrida global para encontrar a biblioteca perdida de Atlântida antes de uma organização secreta.",
            full: "Marcus Velasco, um arqueólogo brilhante expulso da academia por suas teorias radicais, descobre uma pista que pode levar à lendária Biblioteca de Atlântida, supostamente contendo o conhecimento de uma civilização avançada. Para encontrá-la, ele precisa da ajuda de Sofia 'A Espectro', uma ladra de elite aposentada. Juntos, eles viajam do Cairo à Amazônia, resolvendo quebra-cabeças antigos enquanto fogem da 'Ordem da Aurora', uma sociedade secreta implacável que quer o poder de Atlântida para dominar o mundo.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767893380/O_C%C3%B3dice_Atlante_Horizontal_ebto7g.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767893380/O_C%C3%B3dice_Atlante_Vertical_j0t0qr.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-codice-atlante-s1",
                    title: "Temporada 1: O Mapa de Poseidon",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Roubo no Cairo",
                            description:
                                "Marcus e Sofia precisam roubar um artefato de um museu egípcio fortemente guardado para obter a primeira pista.",
                            duration_minutes: 48,
                            year: 2022,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767894016/O_C%C3%B3dice_Atlante_1E1_yxmbxf.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Sombras do Vaticano",
                            description:
                                "A dupla se infiltra nos arquivos secretos do Vaticano para decifrar um mapa antigo escondido em um manuscrito proibido.",
                            duration_minutes: 52,
                            year: 2022,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767894009/O_C%C3%B3dice_Atlante_1E2_c812ua.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Fúria na Selva",
                            description:
                                "Perseguidos pela Ordem da Aurora, eles enfrentam perigos naturais e armadilhas antigas na Floresta Amazônica.",
                            duration_minutes: 45,
                            year: 2022,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767894073/O_C%C3%B3dice_Atlante_1E3_1_zax4m3.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Templo Submerso",
                            description:
                                "Eles descobrem a entrada para um templo pré-diluviano na costa do Brasil, mas não estão sozinhos.",
                            duration_minutes: 50,
                            year: 2022,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767894012/O_C%C3%B3dice_Atlante_1E4_v9umrg.png",
                        },
                    ],
                },
                {
                    id: "sr-codice-atlante-s2",
                    title: "Temporada 2: A Cidade de Vidro",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "Nas Profundezas",
                            description:
                                "Utilizando um submersível experimental, a equipe desce às fossas oceânicas em busca da cidade perdida.",
                            duration_minutes: 47,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767896273/O_C%C3%B3dice_Atlante_2E1_prax3j.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "Traição a Bordo",
                            description:
                                "Enquanto estão isolados no fundo do mar, um sabotador ameaça a missão e a vida de todos.",
                            duration_minutes: 49,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767896379/O_C%C3%B3dice_Atlante_2E2_1_dadd7z.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "Os Guardiões",
                            description:
                                "Eles encontram as ruínas de Atlântida, mas uma tecnologia de defesa antiga desperta para proteger o códice.",
                            duration_minutes: 53,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767896378/O_C%C3%B3dice_Atlante_2E3_1_cufcs2.png",
                        },
                        {
                            key: "s2e4",
                            number: 4,
                            title: "O Conhecimento Proibido",
                            description:
                                "No confronto final na Grande Biblioteca, Marcus deve decidir se o mundo está pronto para a verdade de Atlântida.",
                            duration_minutes: 55,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767896273/O_C%C3%B3dice_Atlante_2E4_g8pnab.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Natan Fio", "Helena Mirante", "Antônio Bandeira"],
        creators: ["Jorge de Lucas"],
        classification: "12",
    },
    {
        id: "sr-a-firma",
        type: "SERIE",
        title: "A Firma: Soluções Alternativas",
        year: 2024,
        genres: ["Comédia", "Sitcom", "Mockumentary"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768844941/A_Firma_Trailer_kassaa.mp4",
        description: {
            short: "Uma equipe de documentaristas acompanha o dia a dia caótico e constrangedor de um call center que vende produtos inúteis no subúrbio.",
            full: 'Neste falso documentário, câmeras seguem os funcionários da "Soluções Alternativas", uma empresa de telemarketing que vende produtos duvidosos como "bloqueadores de Wi-Fi para glúten" e "seguro contra abdução alienígena". A filial é gerenciada por Ricardo, um chefe carente de atenção que acredita ser um guru dos negócios e um mentor para sua equipe desmotivada. Entre ligações bizarras de clientes, romances de escritório estranhos e dinâmicas de grupo desastrosas, a equipe tenta sobreviver ao tédio e à vergonha alheia diária.',
        },
        banner: {
            horizontal: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767888411/A_Firma_Horizontal_bkmuio.jpg",
            vertical: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767888410/A_Firma_Vertical_oocift.jpg",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-a-firma-s1",
                    title: "Temporada 1: O Call Center do Caos",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "Piloto: O Novo Produto",
                            description:
                                "Ricardo apresenta o 'Bloqueador de Wi-Fi para Glúten' e a equipe lida com os primeiros clientes confusos.",
                            duration_minutes: 22,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890224/A_Firma_1E1_btqotk.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Dia da Conscientização",
                            description:
                                "Uma tentativa desastrosa de Ricardo de promover um seminário de sensibilidade no escritório.",
                            duration_minutes: 21,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890224/A_Firma_1E2_iynjcj.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Olimpíadas de Escritório",
                            description:
                                "Na ausência de Ricardo, a equipe organiza jogos competitivos usando materiais de escritório.",
                            duration_minutes: 23,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890222/A_Firma_1E3_pim7n7.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Boato",
                            description:
                                "Um segredo sobre um suposto romance entre Joana e um vendedor se espalha rapidamente pela firma.",
                            duration_minutes: 22,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890224/A_Firma_1E4_lmxb8w.png",
                        },
                        {
                            key: "s1e5",
                            number: 5,
                            title: "Natal em Julho",
                            description:
                                "Para gastar o orçamento excedente, Ricardo força uma festa de Natal fora de época com presentes obrigatórios.",
                            duration_minutes: 25,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767890225/A_Firma_1E5_uua6vp.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Ricardo Gélido", "Joana Pescadora", "Reinaldo Chuva"],
        creators: ["Gregório Daniel"],
        classification: "12",
    },
    {
        id: "sr-queens-ou-menos",
        type: "SERIE",
        title: "Queens ou Menos",
        year: 2025,
        genres: ["Comédia", "Sitcom"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768845517/Queens_ou_Menos_Trailer_dpyexl.mp4",
        description: {
            short: "Uma família latina se muda para Nova York e descobre que o Sonho Americano vem com aluguel caro, invernos rigorosos e choques culturais hilários.",
            full: "Leo achava que mudar para os Estados Unidos seria igual aos filmes de Hollywood: armários nos corredores da escola, líderes de torcida e festas na piscina. A realidade? Um apartamento de um quarto no Queens, um inverno que congela até a alma e pais que traduzem ditados populares ao pé da letra. Enquanto Leo tenta decifrar as gírias locais e sobreviver ao ensino médio, seu pai, Sr. Humberto, trava uma guerra diária contra o aquecedor central para economizar na conta de luz.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767992149/Gemini_Generated_Image_hj60e5hj60e5hj60_ynelfz.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767989425/Queens_ou_Menos_Vertical_tk9vsh.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-queens-s1",
                    title: "Temporada 1: Bem-vindo à América",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Dólar da Lancheira",
                            description:
                                "Leo tenta esconder sua lancheira com comida caseira cheirosa para não sofrer bullying, enquanto seu pai tenta negociar o preço do passe do metrô com um funcionário que não fala a língua dele.",
                            duration_minutes: 22,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767992859/Queens_ou_Menos_1E1_cmvp84.jpg",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Halloween Tropical",
                            description:
                                "A família não entende o conceito de 'Gostosuras ou Travessuras' e, em vez de dar doces, a mãe de Leo tenta oferecer pratos de feijoada para as crianças fantasiadas na porta, gerando confusão no prédio.",
                            duration_minutes: 24,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767992855/Queens_ou_Menos_1E2_d7tlzp.jpg",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Lost in Translation",
                            description:
                                "Leo tenta convidar a garota popular para sair usando uma frase que aprendeu em um filme antigo, mas acaba insultando acidentalmente o capitão do time de futebol americano.",
                            duration_minutes: 23,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767992855/Queens_ou_Menos_1E3_mv5tog.jpg",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Peru de Ação de Graças",
                            description:
                                "No primeiro Thanksgiving da família, o forno quebra. O pai de Leo decide improvisar e assar o peru na escada de incêndio do prédio, atraindo a atenção dos bombeiros e da vizinhança inteira.",
                            duration_minutes: 25,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767992854/Queens_ou_Menos_1E4_xhmhhl.jpg",
                        },
                    ],
                },
            ],
        },
        cast: ["Will Smithson", "Tichina Arnalda", "Jerry Seinfeldini"],
        creators: ["Larry Davi"],
        classification: "10",
    },
    {
        id: "sr-sombra-de-ferro",
        type: "SERIE",
        title: "Sombra de Ferro",
        year: 2024,
        genres: ["Ação", "Policial"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768845826/Sombra_de_Ferro_Trailer_huwma9.mp4",
        description: {
            short: "Um ex-soldado de operações negras, dado como morto, retorna para travar uma guerra de um homem só contra o sindicato do crime que traiu sua unidade.",
            full: "Elias 'Ghost' Vane era o líder da unidade militar mais letal do país até serem traídos e massacrados em uma missão fracassada. Cinco anos depois, ele ressurge nas ruas chuvosas e corruptas da capital. Sem nada a perder e armado com habilidades de combate incomparáveis, Elias começa a desmantelar a organização criminosa responsável, subindo a cadeia alimentar do crime com uma brutalidade cirúrgica, enquanto protege os inocentes pegos no fogo cruzado.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767897128/Sombra_de_Ferro_Horizontal_gi0dfd.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767897129/Sombra_de_Ferro_Vertical_akkzts.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-sombra-ferro-s1",
                    title: "Temporada 1: O Submundo Sangra",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Retorno do Fantasma",
                            description:
                                "Elias ressurge e ataca uma operação de tráfico humano para atrair a atenção dos chefes do crime local.",
                            duration_minutes: 55,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767897953/O_Retorno_do_Fantasma_1E1_ol30wa.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Cães de Guerra",
                            description:
                                "O sindicato envia um esquadrão de assassinos de elite para eliminar Elias, resultando em uma perseguição brutal pela cidade.",
                            duration_minutes: 58,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767897952/O_Retorno_do_Fantasma_1E2_tgs4r7.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "A Contadora",
                            description:
                                "Elias precisa proteger uma ex-contadora da máfia que possui as provas financeiras para derrubar os tenentes do sindicato.",
                            duration_minutes: 52,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767897952/O_Retorno_do_Fantasma_1E3_axpelo.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "Cerco na Docas",
                            description:
                                "A temporada culmina em um ataque total de Elias a um carregamento de armas crucial no porto controlado pela máfia.",
                            duration_minutes: 60,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767898005/O_Retorno_do_Fantasma_1E4_1_vp8mdb.png",
                        },
                    ],
                },
                {
                    id: "sr-sombra-ferro-s2",
                    title: "Temporada 2: A Cabeça da Serpente",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "Ternos e Gravatas",
                            description:
                                "A guerra de Elias sobe de nível, visando agora os políticos corruptos e empresários que financiam o sindicato.",
                            duration_minutes: 54,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767898273/Sombra_de_Ferro_2E1_1_cp69cf.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "O Rival",
                            description:
                                "Um mercenário lendário, antigo colega de Elias, é contratado pelo vilão principal para caçá-lo.",
                            duration_minutes: 57,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767898274/Sombra_de_Ferro_2E2_viuftd.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "Invasão à Torre",
                            description:
                                "Elias invade o arranha-céu impenetrável do líder da organização em uma missão suicida para acabar com tudo.",
                            duration_minutes: 62,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767898273/Sombra_de_Ferro_2E3_pwrioc.png",
                        },
                    ],
                },
            ],
        },
        cast: ["João Urso-Vale", "Ana Triz", "Mateus Miquelino"],
        creators: ["Carlos Estácio"],
        classification: "18",
    },
    {
        id: "sr-lorde-das-sombras",
        type: "SERIE",
        title: "Lorde das Sombras: Crônicas de Aethelgard",
        year: 2023,
        genres: ["Anime", "Fantasia", "Isekai", "Ação"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768846470/Lorde_das_Sombras_Trailer_kmorxg.mp4",
        description: {
            short: "Um estudante comum é invocado para um mundo de fantasia, não como o herói, mas no corpo do lendário Lorde Demônio que está destinado a destruir tudo.",
            full: "Kaito, um gamer viciado em estratégia, acorda no corpo de Valthor, o temido Lorde Demônio do mundo de Aethelgard. O problema? A profecia diz que Valthor trará o apocalipse em um ano. Agora, Kaito deve usar seu conhecimento de jogos para gerenciar seu exército de monstros leais, enganar os heróis humanos que querem sua cabeça e encontrar uma maneira de salvar o mundo sem que ninguém descubra que o 'Lorde Supremo' é apenas um humano comum tentando sobreviver.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767903416/Lorde_das_Sombras_Horizontal_ypg6sp.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767903417/Lorde_das_Sombras_Vertical_a7uakw.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-lorde-sombras-s1",
                    title: "Temporada 1: O Despertar do Trono",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "Eu Sou o Vilão?",
                            description:
                                "Kaito desperta no trono de ferro de Valthor e precisa blefar para convencer seus generais demoníacos de que ele é o verdadeiro lorde.",
                            duration_minutes: 24,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767903952/Lorde_das_Sombras_1E1_kquuz4.png  ",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "A General Vampira",
                            description:
                                "Kaito deve ganhar a lealdade de Selene, a poderosa e desconfiada general vampira que comanda suas forças de elite.",
                            duration_minutes: 23,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767903953/Lorde_das_Sombras_1E2_mtvnim.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "O Primeiro Herói",
                            description:
                                "Um grupo de aventureiros humanos invade o primeiro andar da masmorra, e Kaito precisa orquestrar a defesa sem usar seus poderes avassaladores.",
                            duration_minutes: 25,
                            year: 2023,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767903954/Lorde_das_Sombras_1E3_fb1ocx.png",
                        },
                    ],
                },
                {
                    id: "sr-lorde-sombras-s2",
                    title: "Temporada 2: Guerra das Facções",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "A Reunião dos Lordes",
                            description:
                                "Valthor é convocado para uma cúpula com outros Lordes Demônios rivais, onde alianças e traições são o prato principal.",
                            duration_minutes: 24,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767904111/Lorde_das_Sombras_2E1_xt1wxi.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "A Invasão da Luz",
                            description:
                                "O Reino Humano lança uma cruzada massiva contra o território de Valthor, liderada pelo Herói Lendário Arthur.",
                            duration_minutes: 26,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767904112/Lorde_das_Sombras_2E2_udozfm.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "Confronto no Abismo",
                            description:
                                "Kaito (como Valthor) enfrenta Arthur em uma batalha épica que decidirá o destino da guerra, enquanto tenta secretamente salvar o herói.",
                            duration_minutes: 28,
                            year: 2024,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767904116/Lorde_das_Sombras_2E3_dd2j0w.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Mamoru Guardião", "Miyuki Castelo Branco", "Yuki Neve"],
        creators: ["Akira Montanha Pássaro"],
        classification: "16",
    },
    {
        id: "sr-luz-de-aethelgard",
        type: "SERIE",
        title: "A Luz de Aethelgard: A Cruzada do Herói",
        year: 2026,
        genres: ["Anime", "Fantasia", "Ação", "Drama"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768846469/A_Luz_de_Aethelgard_Trailer_xkfd0o.mp4",
        description: {
            short: "Enquanto o Lorde Demônio reúne suas forças, o mundo humano deposita suas esperanças em Arthur, o Herói escolhido pela espada sagrada, nesta visão paralela da grande guerra.",
            full: "O outro lado da moeda de 'Lorde das Sombras'. O Reino Humano está à beira do colapso diante da ameaça crescente de Valthor. Acompanhe a jornada de Arthur, um jovem cavaleiro com um senso de justiça inabalável que é escolhido pela lendária Espada da Luz. Junto com sua party — a maga esquentadinha Elara e o paladino estoico Borin — Arthur deve navegar pela política corrupta dos reis humanos, superar traumas do passado e se tornar o farol de esperança necessário para enfrentar o 'mal supremo'. Eles não fazem ideia de que seu inimigo mortal é apenas um gamer tentando sobreviver.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767904820/A_Luz_de_Aethelgard_Horizontal_nft7hq.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767904822/A_Luz_de_Aethelgard_Vertical_ynxfpq.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-luz-aethelgard-s1",
                    title: "Temporada Única: O Chamado da Espada",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Peso da Escolha",
                            description:
                                "Arthur, um simples guarda real, tem sua vida mudada quando a Espada da Luz o escolhe durante um ataque demoníaco à capital.",
                            duration_minutes: 24,
                            year: 2026,

                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767906097/A_Luz_de_Aethelgard_1E1_e8cxzx.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Fogo e Aço",
                            description:
                                "Arthur precisa recrutar aliados. Ele encontra Elara, uma maga prodígio expulsa da torre de magia por seu temperamento explosivo.",
                            duration_minutes: 23,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767906096/A_Luz_de_Aethelgard_1E2_jda0jc.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "A Sombra da Corrupção",
                            description:
                                "Antes de enfrentar os demônios, a party deve lidar com um rei humano que está lucrando com a guerra, vendendo suprimentos para o inimigo.",
                            duration_minutes: 25,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767906107/A_Luz_de_Aethelgard_1E3_swkrrl.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "Cicatrizes do Passado",
                            description:
                                "Em uma missão para recuperar um artefato antigo, o grupo Selene a general que revela o trágico passado de Borin, o paladino.",
                            duration_minutes: 24,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767906469/A_Luz_de_Aethelgard_1E4_1_gsyxrl.png",
                        },
                        {
                            key: "s1e5",
                            number: 5,
                            title: "A Marcha da Esperança",
                            description:
                                "Com o exército humano finalmente unido, Arthur faz um discurso inspirador antes de marcharem para a batalha final contra o território de Valthor",
                            duration_minutes: 26,
                            year: 2026,
                            image: "https://via.placeholder.com/400x225?text=Luz+S1E5+Frame",
                        },
                    ],
                },
            ],
        },
        cast: ["Wendel Bizarro", "Tatiane Kelp-Mar", "Fábio Lucindo-a-Luz"],
        creators: ["Akira Montanha Pássaro"],
        classification: "14",
    },
    {
        id: "sr-veias-de-neon",
        type: "SERIE",
        title: "Veias de Neon: O Detetive Cromático",
        year: 2018,
        genres: ["Ficção Científica", "Cyberpunk", "Policial", "Ação"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768847004/Veias_de_Neon_Trailer_kuwurq.mp4",
        description: {
            short: "Em uma metrópole afogada em chuva ácida e luz neon, um detetive com sangue sintético brilhante resolve crimes vendo as memórias digitais das vítimas.",
            full: "Neo-Sampa, 2088. Onde a carne encontra o cromo. Kael Vane não é um detetive comum; após um acidente quase fatal, seu sangue foi substituído por 'Croma', um fluido experimental bioluminescente que processa dados. Isso lhe dá a habilidade instável de 'conectar' com as últimas memórias digitais dos mortos. Quando uma nova droga tecnológica começa a fritar os cérebros da elite corporativa, Kael mergulha no submundo digital para encontrar a fonte, lutando contra sua própria obsolescência programada.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908138/Veias_de_Neon_Horizontal_1_mfh17e.png",
            vertical: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908033/Veias_de_Neon_Vertical_mbkcki.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-veias-neon-s1",
                    title: "Temporada 1: Falha no Sistema",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "Sangue Brilhante, Chuva Escura",
                            description:
                                "Kael investiga o assassinato de uma estrela pop androide e descobre que sua própria tecnologia sanguínea pode estar ligada ao crime.",
                            duration_minutes: 52,
                            year: 2018,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908472/Veias_de_Neon_1E1_hkym55.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "O Beijo da Viúva Digital",
                            description:
                                "Kael busca informações no Mercado das Sombras e se envolve com Nix, uma hacker perigosa que sabe mais sobre seu passado do que ele.",
                            duration_minutes: 48,
                            year: 2018,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908467/Veias_de_Neon_1E2_ic2ksu.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Protocolo de Queima",
                            description:
                                "Invadindo a torre da megacorporação OmniCorp, Kael descobre a verdade sobre a droga 'Neuro-Fritura' e enfrenta seus criadores cibernéticos.",
                            duration_minutes: 55,
                            year: 2018,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908464/Veias_de_Neon_1E3_zxbnn3.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "Reinicialização Forçada",
                            description:
                                "Com seu sangue Croma começando a falhar, Kael tem um confronto final no topo da cidade chuvosa contra o arquiteto da conspiração.",
                            duration_minutes: 58,
                            year: 2018,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767908466/Veias_de_Neon_1E4_f8j1ij.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Ciano Reves", "Escarlate Janson", "Haroldo Forte"],
        creators: ["Rídel Escoteiro"],
        classification: "16",
    },
    {
        id: "sr-imperio-da-noticia",
        type: "SERIE",
        title: "Império da Notícia",
        year: 2025,
        genres: ["Drama", "Político", "Suspense"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768850482/Imp%C3%A9rio_da_Not%C3%ADcia_Trailer_eojq6l.mp4",
        description: {
            short: "A luta pelo controle do maior conglomerado de mídia do país expõe os segredos mais sombrios de uma família poderosa ao longo de duas gerações de conflitos.",
            full: "A família Fontana controla o 'Grupo Vanguarda', o império de mídia mais influente do Brasil. A série acompanha a guerra fria iniciada quando o patriarca Roberto Fontana anuncia sua aposentadoria, desencadeando uma batalha brutal pela sucessão entre seus filhos e sua esposa manipuladora. Na segunda fase, o novo CEO descobre que sentar no trono é apenas o começo dos problemas, enquanto inimigos internos e externos conspiram para derrubar o império de dentro para fora.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767910752/Imp%C3%A9rio_da_Not%C3%ADcia_Horizontal_hazefi.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767910754/Imp%C3%A9rio_da_Not%C3%ADcia_Vertical_metmnf.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-imperio-s1",
                    title: "Temporada 1: A Batalha pela Coroa",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Anúncio",
                            description:
                                "Durante a festa de 80 anos do patriarca Roberto Fontana, seu anúncio repentino de aposentadoria joga a família e o mercado de ações no caos.",
                            duration_minutes: 62,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911415/Imp%C3%A9rio_da_Not%C3%ADcia_1E1_mzvztk.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Vazamento Controlado",
                            description:
                                "Um dossiê comprometedor sobre o filho favorito vaza para a imprensa, e a investigação interna coloca irmão contra irmão.",
                            duration_minutes: 58,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911414/Imp%C3%A9rio_da_Not%C3%ADcia_1E2_r2rjom.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "A Sala de Guerra",
                            description:
                                "Enquanto o Grupo Vanguarda enfrenta uma crise de relações públicas, os herdeiros precisam deixar as diferenças de lado temporariamente para salvar o preço das ações.",
                            duration_minutes: 65,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911413/Imp%C3%A9rio_da_Not%C3%ADcia_1E3_nr4qb0.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "Voto de Desconfiança",
                            description:
                                "Na tensa reunião anual do conselho, uma traição chocante de última hora define quem será o novo CEO, deixando os perdedores jurando vingança.",
                            duration_minutes: 70,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911420/Imp%C3%A9rio_da_Not%C3%ADcia_1E4_zdoj78.png",
                        },
                    ],
                },
                {
                    id: "sr-imperio-s2",
                    title: "Temporada 2: O Trono Instável",
                    number: 2,
                    episodes: [
                        {
                            key: "s2e1",
                            number: 1,
                            title: "Lua de Mel Sangrenta",
                            description:
                                "Meses após assumir, o novo CEO luta para impor sua visão enquanto os irmãos derrotados sabotam as operações pelas sombras.",
                            duration_minutes: 60,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911934/Imp%C3%A9rio_da_Not%C3%ADcia_2E1_el2vr1.png",
                        },
                        {
                            key: "s2e2",
                            number: 2,
                            title: "Dossiê Fantasma",
                            description:
                                "Um escândalo antigo do patriarca, que se pensava estar enterrado, ressurge, ameaçando destruir a reputação de toda a família e a legitimidade da nova gestão.",
                            duration_minutes: 59,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911931/Imp%C3%A9rio_da_Not%C3%ADcia_2E2_tufmau.png",
                        },
                        {
                            key: "s2e3",
                            number: 3,
                            title: "Inimigo Meu",
                            description:
                                "Cercado por todos os lados e com as ações despencando, o CEO é forçado a formar uma aliança humilhante com a pessoa que mais despreza para salvar a empresa.",
                            duration_minutes: 63,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911927/Imp%C3%A9rio_da_Not%C3%ADcia_2E3_cgurgh.png",
                        },
                        {
                            key: "s2e4",
                            number: 4,
                            title: "Cheque-Mate",
                            description:
                                "O final de temporada explosivo onde a tentativa de aquisição hostil pelos investidores estrangeiros chega ao ápice, e um membro da família muda de lado no momento crucial.",
                            duration_minutes: 72,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767911926/Imp%C3%A9rio_da_Not%C3%ADcia_2E4_iolkut.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Breno Coxinha", "Sara Lanche", "Jeremias Forte"],
        creators: ["Jessé Braçoforte"],
        classification: "16",
    },
    {
        id: "sr-flor-de-inverno",
        type: "SERIE",
        title: "Flor de Inverno: Cores do Destino",
        year: 2026,
        genres: ["Dorama", "Romance", "Fantasia", "Comédia"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768850967/Flor_de_Inverno_Trailer_hzkk6g.mp4",
        description: {
            short: "Um CEO que enxerga o mundo em preto e branco descobre as cores novamente ao conhecer uma florista misteriosa, desencadeando um romance predestinado.",
            full: "Kang Do-Hyun, herdeiro do Grupo Cosmético Kang, esconde um segredo: ele sofre de monocromacia neurológica. Sua vida cinzenta muda quando ele esbarra em Lee Na-Bi, uma florista otimista, e seu mundo explode em cores por um breve momento. Desesperado para ver as cores novamente e salvar o lançamento de sua nova marca, ele propõe um contrato bizarro: ela deve ficar ao lado dele durante o horário comercial. O que começa como uma transação de negócios se transforma em amor verdadeiro quando segredos de uma vida passada vêm à tona.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767980667/Flor_de_Inverno_Horizontal_sw1sbz.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767980666/Flor_de_Inverno_Vertical_mnyhkv.jpg",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-flor-s1",
                    title: "Temporada Única: O Florescer",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Primeiro Tom de Vermelho",
                            description:
                                "Do-Hyun quase atropela Na-Bi em um dia de chuva. Ao segurar a mão dela para ajudá-la, ele vê a cor vermelha do guarda-chuva dela, ficando chocado.",
                            duration_minutes: 75,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767981738/Flor_de_Inverno_1E1_sulmqg.png",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Cláusula Contratual",
                            description:
                                "Na-Bi, precisando pagar a dívida do hospital de sua avó, aceita a proposta de Do-Hyun de ser sua 'bateria humana de cores', mudando-se para a mansão dele.",
                            duration_minutes: 70,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767981738/Flor_de_Inverno_1E2_uckzl4.png",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Ciúmes em Technicolor",
                            description:
                                "O amigo de infância de Na-Bi retorna do exterior e declara seu amor, fazendo Do-Hyun sentir uma emoção nova e avassaladora: ciúmes.",
                            duration_minutes: 72,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767981737/Flor_de_Inverno_1E3_dntlke.png",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Segredo da Neve",
                            description:
                                "Durante uma viagem de negócios para uma estação de esqui, eles ficam presos em uma cabana. Do-Hyun descobre que a cegueira de cores começou no dia em que a mãe de Na-Bi morreu.",
                            duration_minutes: 78,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767981736/Flor_de_Inverno_1E4_wosu1n.png",
                        },
                        {
                            key: "s1e5",
                            number: 5,
                            title: "Primavera Eterna",
                            description:
                                "No episódio final emocionante, Do-Hyun arrisca perder a visão para sempre para salvar Na-Bi de um acidente, provando que o amor é a cor mais forte.",
                            duration_minutes: 85,
                            year: 2026,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767981737/Flor_de_Inverno_1E5_jspz3g.png",
                        },
                    ],
                },
            ],
        },
        cast: ["Kimchi Woo", "Park So-Ju", "Song Haneul"],
        creators: ["Choi Drama"],
        classification: "12",
    },
    {
        id: "sr-espada-crisantemo",
        type: "SERIE",
        title: "A Espada e o Crisântemo",
        year: 2025,
        genres: ["Dorama", "Ação", "Romance"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768851410/A_Espada_e_o_Cris%C3%A2ntemo_Trailer_wj45wp.mp4",
        description: {
            short: "Uma assassina de elite perde a memória e se torna a guarda-costas do Príncipe Herdeiro que ela foi contratada para matar.",
            full: "Na era Joseon, a corte real é um ninho de víboras. Seol-Hwa, a temida assassina 'Sombra Branca', recebe a missão final: eliminar o progressista Príncipe Herdeiro Lee-San. Após uma emboscada fracassada onde ela bate a cabeça e perde a memória, o Príncipe, impressionado com sua habilidade de combate, a nomeia como sua guarda pessoal sem saber sua identidade. Vivendo no palácio sob o nome de 'Lótus', ela se apaixona pelo alvo, mas o retorno de suas memórias ameaça transformar o conto de fadas em um banho de sangue.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767982357/A_Espada_e_o_Cris%C3%A2ntemo_Horizontal_vxjmmg.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767982358/A_Espada_e_o_Cris%C3%A2ntemo_Vertical_rgoquh.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-espada-s1",
                    title: "Temporada Única: A Lâmina Leal",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "A Sombra ao Luar",
                            description:
                                "Seol-Hwa invade o palácio real sob a luz da lua cheia para assassinar o Príncipe, mas uma intervenção de um terceiro grupo de rebeldes causa um caos que muda seu destino.",
                            duration_minutes: 68,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767983180/A_Espada_e_o_Cris%C3%A2ntemo_1E1_uijvvb.jpg",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Memórias Perdidas",
                            description:
                                "Acordando na enfermaria real sem saber quem é, 'Lótus' demonstra reflexos letais ao salvar o Príncipe de uma flecha perdida durante uma caçada.",
                            duration_minutes: 65,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767983179/A_Espada_e_o_Cris%C3%A2ntemo_1E2_vdogm0.jpg",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "O Festival das Lanternas",
                            description:
                                "Durante uma saída secreta do palácio para o festival da cidade, o Príncipe e sua guarda-costas compartilham um momento íntimo, mas antigos aliados da assassina a reconhecem na multidão.",
                            duration_minutes: 70,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767983179/A_Espada_e_o_Cris%C3%A2ntemo_1E3_lpg31i.jpg",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "A Escolha da Lâmina",
                            description:
                                "Com suas memórias restauradas e a ordem de execução do Príncipe ainda ativa, Seol-Hwa deve decidir entre honrar seu contrato de sangue ou salvar o homem que ama no confronto final.",
                            duration_minutes: 75,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767983179/A_Espada_e_o_Cris%C3%A2ntemo_1E4_pbg0aj.jpg",
                        },
                    ],
                },
            ],
        },
        cast: ["Lee Min-Show", "Bae Susi", "Gong Eu"],
        creators: ["Park Histórico"],
        classification: "14",
    },
    {
        id: "doc-dossie-amazonia",
        type: "SERIE",
        title: "Dossiê Amazônia: O Voo Fantasma",
        year: 2025,
        genres: ["Documentário", "Mistério", "Natureza"],
        trailer:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1768851782/Dossi%C3%AA_Amaz%C3%B4nia_Trailer_ruzlw7.mp4",
        description: {
            short: "Três décadas após o desaparecimento de um avião de carga com toneladas de ouro, novas pistas levam uma equipe ao coração da selva.",
            full: "Em 14 de março de 1995, o voo de carga 'Alpha-Zulu' partiu de Manaus e nunca chegou ao seu destino. A bordo: três tripulantes e uma carga secreta avaliada em milhões. Por anos, acreditou-se que o avião tinha sido engolido pelo rio. Agora, com o uso de tecnologia LIDAR, uma forma estranha foi detectada sob a copa das árvores em um território indígena isolado. Esta série documental acompanha a expedição perigosa para encontrar a verdade, revelando uma conspiração que envolve garimpo ilegal, sabotagem e um possível sobrevivente.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767984435/Dossi%C3%AA_Amaz%C3%B4nia_Horizontal_gwiarh.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767984480/Dossi%C3%AA_Amaz%C3%B4nia_Vertical_1_abfgjw.png",
        },
        serieData: {
            seasons: [
                {
                    id: "doc-dossie-s1",
                    title: "Minissérie: A Busca",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Último Sinal",
                            description:
                                "Através de áudios inéditos da torre de controle e entrevistas com familiares, o documentário reconstrói as horas finais do voo e a tempestade suspeita daquela noite.",
                            duration_minutes: 55,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767985828/Dossi%C3%AA_Amaz%C3%B4nia_1E1_ahcuog.jpg",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "A Anomalia Verde",
                            description:
                                "A equipe da expedição enfrenta corredeiras e doenças tropicais para chegar às coordenadas apontadas pelo satélite, encontrando os primeiros pedaços de fuselagem.",
                            duration_minutes: 58,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767985828/Dossi%C3%AA_Amaz%C3%B4nia_1E2_q2z2ml.jpg",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "Caixa Preta",
                            description:
                                "A descoberta da caixa preta revela uma gravação chocante que sugere que havia uma quarta pessoa não registrada a bordo do avião.",
                            duration_minutes: 60,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987280/Dossi%C3%AA_Amaz%C3%B4nia_1E3_oz0clg.jpg",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Sobrevivente",
                            description:
                                "No episódio final, relatos de tribos locais sobre um 'homem do céu' levam a um desfecho inacreditável sobre o destino da carga de ouro.",
                            duration_minutes: 65,
                            year: 2025,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987280/Dossi%C3%AA_Amaz%C3%B4nia_1E4_ii3fhx.jpg",
                        },
                    ],
                },
            ],
        },
        cast: ["Werner Herzogue", "Urso Grilo", "Neil Trovão"],
        creators: ["Discovery Silva"],
        classification: "12",
    },
    {
        id: "sr-aguas-turvas",
        type: "SERIE",
        title: "Águas Turvas",
        year: 2020,
        genres: ["Suspense", "Mistério", "Drama", "Psicológico"],
        trailer: "https://res.cloudinary.com/dbjobat5r/video/upload/v1768853499/%C3%81guas_Turvas_Trailer_cpundx.mp4",
        description: {
            short: "Uma jornalista retorna à sua cidade natal e descobre evidências de que o acidente fatal de sua amiga de infância, 20 anos atrás, foi um assassinato encoberto.",
            full: "A cidade de Serra Nebulosa vive sob a sombra de um antigo mistério: a morte de Elisa no lago local há duas décadas, considerada um trágico acidente. Quando a jornalista Clara retorna para vender a casa da família, ela encontra provas que contradizem a versão oficial. Confrontando o delegado que arquivou o caso e a poderosa família que controla a cidade, Clara reabre feridas antigas. Em uma cidade onde todos têm algo a esconder, a verdade é a coisa mais perigosa que se pode buscar.",
        },
        banner: {
            horizontal:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767986822/%C3%81guas_Turvas_Horizontal_whqeao.png",
            vertical:
                "https://res.cloudinary.com/dbjobat5r/image/upload/v1767986821/%C3%81guas_Turvas_Vertical_uhrpe1.png",
        },
        serieData: {
            seasons: [
                {
                    id: "sr-aguas-s1",
                    title: "Minissérie: O Retorno",
                    number: 1,
                    episodes: [
                        {
                            key: "s1e1",
                            number: 1,
                            title: "O Diário Esquecido",
                            description:
                                "De volta a Serra Nebulosa para o funeral da avó, Clara encontra um diário escondido no sótão que lança dúvidas sobre a morte de sua melhor amiga em 2005.",
                            duration_minutes: 55,
                            year: 2020,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987792/%C3%81guas_Turvas_1E1_u2qu3l.jpg",
                        },
                        {
                            key: "s1e2",
                            number: 2,
                            title: "Pacto de Silêncio",
                            description:
                                "Clara tenta confrontar as testemunhas originais, agora adultos temerosos, e descobre que a elite da cidade pagou caro para manter a versão do acidente.",
                            duration_minutes: 58,
                            year: 2020,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987791/%C3%81guas_Turvas_1E2_sdasqq.jpg",
                        },
                        {
                            key: "s1e3",
                            number: 3,
                            title: "A Testemunha Chave",
                            description:
                                "Após sofrer uma ameaça direta e ter seu carro vandalizado, Clara localiza uma antiga moradora da cidade que viu algo na noite do crime, mas que tem medo de falar.",
                            duration_minutes: 60,
                            year: 2020,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987790/%C3%81guas_Turvas_1E3_xtiivr.jpg",
                        },
                        {
                            key: "s1e4",
                            number: 4,
                            title: "O Fundo do Lago",
                            description:
                                "No clímax da minissérie, durante uma tempestade torrencial, Clara é atraída para o lago onde tudo aconteceu para um confronto final com o verdadeiro assassino.",
                            duration_minutes: 65,
                            year: 2020,
                            image: "https://res.cloudinary.com/dbjobat5r/image/upload/v1767987789/%C3%81guas_Turvas_1E4_fx1whp.jpg",
                        },
                    ],
                },
            ],
        },
        cast: ["Agatha Crista", "Arthur Canhão Doyle", "Patrícia Highsmith"],
        creators: ["Alfredo Hitchcock"],
        classification: "16",
    },

    // Sem trailer
];
