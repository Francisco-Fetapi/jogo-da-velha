import React from "react";
import Grid from "@material-ui/core/Grid";

function Quadro({ quadro, jogar, vencedor, seqVencedora }) {
  console.log(seqVencedora);
  return (
    <Grid container className={`grid-container ${vencedor ? "terminado" : ""}`}>
      {quadro.map((item, key) => (
        <Grid
          onClick={() => jogar(key)}
          className={`grid_item ${item} ${
            seqVencedora.includes(key) ? `seqVencedora-${vencedor}` : ""
          }`}
          item
          xs={4}
          key={key}
        >
          {item}
        </Grid>
      ))}
    </Grid>
  );
}

export default Quadro;
