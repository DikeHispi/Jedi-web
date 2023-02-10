let id = 1;
const API_URL = "http://localhost:3000/Gats";

const load = Gat => {
    if (!Gat) return;
    const descriptio = Gat.desc;
    const foto = Gat.image;
    const gat_types = Gat.types.map( ({ type }) => type.name);
    const gat_moves = Gat.moves.map( (moves) => moves.idMov);

    $('#api-data').replaceWith(
        `<div id="api-data" class="col">
            <h3 class="nom_poke">${Gat.name}</h3>
            <hr class="post-nom" size="5px">
            <div class="row">
                <div class="col-2 espai-esq"></div>
                <div class="col espai-centre centre-esq">
                    <p>${ descriptio }</p>
                    <p> <b>Habilitat:</b> ${ Gat.habilitat }</p>
                    <p> <b>Tipos:</b> ${ gat_types.join(' & ') }</p>
                    <p> <b>Atacs:</b> ${ gat_moves.join(', ') }</p>
                </div>
                <div class="col espai-centre centre-dre">
                    <img class="fotoGato" src="${foto}" alt="${Gat.name}" >
                </div>
                <div class="col-2 espai-dre"></div>
            </div>
        </div>`
    );

    id = Gat.id;
};

$(window).on("load",  async () => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        load( data );
    } catch (error) {
        console.log(error)
    }

    $('#anterior').on("click", async () => {
        try {
            switch (id) {
                case 1:
                    id = 10;
                    break;
                default:
                    --id;
                    break;
            }
            const { data } = await axios.get(`${API_URL}/${id}`);
            load( data );
        } catch (error) {
            console.log(error)
        }
    });

    $('#posterior').on("click", async () => {
        try {
            switch (id) {
                case 10:
                    id = 1;
                    break;
                default:
                    ++id;
                    break;
            }
            const { data } = await axios.get(`${API_URL}/${id}`);
            load( data );
        } catch (error) {
            console.log(error)
        }
    });
});
