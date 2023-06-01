import { useRouter } from "next/router";
import { CreateData, GetData, UpdateData } from "../../src/api";
import { Button, Link, TextField, Typography } from "@mui/material";
import { TrainingCreatorType, TrainingType } from "../../src/types/Training";
import { useState } from "react";
import Notiflix from "notiflix";

export default function Edit() {
  const router = useRouter();
  const id:number = Number(router.query.id);

  const [data, setData] = useState<TrainingType|null>();

  const [exercise, setExercise] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [series, setSeries] = useState<number>(0);
  const [repetitions, setRepetitions] = useState<string>("");
  const [startPeriod, setStartPeriod] = useState<string>("");
  const [endPeriod, setEndPeriod] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  


  if (data === undefined && id) {
    GetData(id).then((resData: TrainingType) => {
      // console.log(resData);
      setData(resData);
      setExercise(resData.exercise);
      setWeekDay(resData.weekDay);
      setVideoUrl(resData.videoUrl);
      setSeries(resData.series);
      setRepetitions(resData.repetitions);
      setStartPeriod(resData.startPeriod);
      setEndPeriod(resData.endPeriod);
      setWeight(resData.weight);
    });
  }

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Editar Treino
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
            const training: TrainingType = {
              id,
              exercise,
              weekDay,
              videoUrl: newVideoUrl,
              series,
              repetitions,
              startPeriod,
              endPeriod,
              weight,
            };
            UpdateData(training).then((res) => {
              if (res) {
                console.log(res);
                Notiflix.Notify.success("Treino Atualizado");
              } else {
                Notiflix.Notify.failure("Erro ao atualizar treino");
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
