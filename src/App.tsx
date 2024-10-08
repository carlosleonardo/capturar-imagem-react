import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
    const [urlVideo, setUrlVideo] = useState("");
    const [urlImagem, setUrlImagem] = useState("");

    function aoSelecionarArquivo(event: ChangeEvent<HTMLInputElement>): void {
        const arquivo = event.target.files?.[0];
        if (arquivo) {
            const url = URL.createObjectURL(arquivo);
            setUrlVideo(url);
        }
    }

    function aoCapturarImagem(): void {
        const canvas = document.createElement("canvas");
        const video = document.querySelector("video");
        canvas.width = video?.videoWidth || 0;
        canvas.height = video?.videoHeight || 0;
        const contexto = canvas.getContext("2d");
        contexto?.drawImage(
            video as HTMLVideoElement,
            0,
            0,
            canvas.width,
            canvas.height
        );
        const url = canvas.toDataURL("image/png");
        setUrlImagem(url);
    }

    return (
        <>
            <div className="container">
                <video src={urlVideo} controls width="500px" height="300px">
                    Seu browser não suporta a tag video
                </video>
                <input
                    type="file"
                    id="arquivo"
                    className="mt-3"
                    accept="video/*"
                    onChange={aoSelecionarArquivo}
                />
                <button
                    className="btn btn-primary mt-3"
                    onClick={aoCapturarImagem}
                >
                    Capturar imagem
                </button>
                {urlImagem && (
                    <img
                        src={urlImagem}
                        alt="Captura de tela"
                        className="mt-3"
                        width={"320px"}
                        height={"auto"}
                    />
                )}
            </div>
        </>
    );
}
export default App;
