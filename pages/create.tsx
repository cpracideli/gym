import { Button, Link, TextField, Typography } from "@mui/material";
import { TrainingCreatorType } from "../src/types/Training";
import { useState } from "react";
import { CreateData } from "../src/api";
import Notiflix from "notiflix";

export default function Create() {
  const [exercise, setExercise] = useState<string>();
  const [weekDay, setWeekDay] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [series, setSeries] = useState<number>();
  const [repetitions, setRepetitions] = useState<string>();
  const [startPeriod, setStartPeriod] = useState<string>();
  const [endPeriod, setEndPeriod] = useState<string>();

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Criar Novo Treino
      </Typography>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          label="Nome"
          variant="outlined"
          fullWidth
          type="text"
          value={exercise}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setExercise(event.target.value);
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Dia da Semana"
          variant="outlined"
          fullWidth
          type="text"
          value={weekDay}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setWeekDay(event.target.value);
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Url do Video"
          variant="outlined"
          fullWidth
          type="text"
          value={videoUrl}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVideoUrl(event.target.value);
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Séries"
          variant="outlined"
          fullWidth
          type="number"
          value={series}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSeries(Number(event.target.value));
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Repetições"
          variant="outlined"
          fullWidth
          type="text"
          value={repetitions}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRepetitions(event.target.value);
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Início do treino"
          variant="outlined"
          fullWidth
          type="date"
          value={startPeriod}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStartPeriod(event.target.value);
          }}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Fim do treino"
          variant="outlined"
          fullWidth
          type="date"
          value={endPeriod}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEndPeriod(event.target.value);
          }}
        />
        <Button
          style={{ marginTop: 10 }}
          variant="contained"
          color="primary"
          fullWidth
          children="Salvar"
          onClick={() => {
            const newVideoUrl = videoUrl?.replace(
              "https://youtu.be/",
              "https://www.youtube.com/embed/"
            );
            const training: TrainingCreatorType = {
              exercise,
              weekDay,
              videoUrl: newVideoUrl,
              series,
              repetitions,
              startPeriod,
              endPeriod,
              weight: "",
            };
            CreateData(training).then((res) => {
              if (res) {
                console.log(res);
                Notiflix.Notify.success("Treino Criado");
              } else {
                Notiflix.Notify.failure("Erro ao criar treino");
              }
            });
          }}
        />
        <Link href="/">
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            color="secondary"
            fullWidth
            children="Voltar"
          />
        </Link>
      </div>
    </div>
  );
}
