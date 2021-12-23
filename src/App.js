import "./App.css";
import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "./Components/Header";
import Quadro from "./Components/Quadro";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const quadro_vazio = new Array(9).fill("");
  const [quadro, setQuadro] = React.useState(quadro_vazio);
  const [jogadorAtual, setJogadorAtual] = React.useState("X");
  const [vencedor, setVencedor] = React.useState(null);
  const [sequenciaVencedora, setSequenciaVencedora] = React.useState([]);
  const [snackbar, setSnackBar] = React.useState({
    estado: false,
    msg: "",
    duracao: 3000,
    tipo: "success",
  });

  React.useEffect(() => {
    if (vencedor && vencedor !== "E") {
      informar({
        msg: (
          <Typography variant="body1">
            {" "}
            O Jogador <b className={vencedor}>{vencedor}</b> venceu
          </Typography>
        ),
        estado: true,
        tipo: "info",
        duracao: 3000,
      });
    }
  }, [vencedor]);

  React.useEffect(() => {
    AlguemVenceu(testarSeAlguemGanhou());
  }, [quadro]);

  const sequenciasVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  function fecharSnackbar(event, tipo) {
    if (tipo === "clickaway") {
      return;
    }

    setSnackBar({ ...snackbar, estado: false });
    if (vencedor) {
      setQuadro(quadro_vazio);
      setSequenciaVencedora([]);
      setVencedor(null);
    }
  }

  function jogar(posItemClicado) {
    if (!vencedor) {
      if (AdicionarItemAoQuadro(posItemClicado)) {
        //se deu para add o item
        trocarUsuario();
      }
    }
  }

  function trocarUsuario() {
    if (jogadorAtual === "X") setJogadorAtual("O");
    else setJogadorAtual("X");
  }

  function AdicionarItemAoQuadro(posItemClicado) {
    if (quadro[posItemClicado] !== "") {
      informar({
        msg: "O quadro esta ocupado!",
        estado: true,
        tipo: "error",
        duracao: 2000,
      });
      return false;
    }
    setQuadro(
      quadro.map((item, k) => (k === posItemClicado ? jogadorAtual : item))
    );
    return true;
  }

  function informar(opcoes) {
    setSnackBar({ ...snackbar, ...opcoes });
  }

  function testarSeAlguemGanhou() {
    let info = { estado: false };
    sequenciasVencedoras.forEach((sequencia, indice) => {
      if (
        quadro[sequencia[0]] === quadro[sequencia[1]] &&
        quadro[sequencia[0]] === quadro[sequencia[2]]
      ) {
        //alguem ganhou , so falta saber quem
        if (quadro[sequencia[0]] === "X")
          info = { estado: true, vencedor: "X", sequenciaVencedora: sequencia };
        else if (quadro[sequencia[0]] === "O") {
          info = { estado: true, vencedor: "O", sequenciaVencedora: sequencia };
        }
      }
    });

    if (quadro.every((e) => e !== "")) {
      //ninguem ganhou e todos os lementos do quadro estao preenchidos
      foiEmpate();
    }
    //Se chegar ate aqui, entao ninguem venceu
    return info;
  }

  function AlguemVenceu(info) {
    if (info.estado === true) {
      //alguem venceu
      console.log("Alguem venceu");
      setVencedor(info.vencedor);
      setSequenciaVencedora(info.sequenciaVencedora);
    } else {
      console.log("ninguem venceu");
    }
  }
  function foiEmpate() {
    informar({
      msg: <Typography variant="body1"> Foi empate</Typography>,
      tipo: "info",
      duracao: 2000,
      estado: true,
    });
    setVencedor("E");
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <Header jogAtual={jogadorAtual} />
        <Box className="Quadro">
          <Quadro
            seqVencedora={sequenciaVencedora}
            vencedor={vencedor}
            quadro={quadro}
            jogar={jogar}
          />
        </Box>
      </Box>

      <Snackbar
        open={snackbar.estado}
        autoHideDuration={snackbar.duracao}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={fecharSnackbar}
      >
        <Alert
          style={{ width: "100%" }}
          onClose={fecharSnackbar}
          severity={snackbar.tipo}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
