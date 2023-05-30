import React, { useState } from "react";
import { GetAllData, UpdateData } from "../src/api";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VideoViewer from "../src/components/VideoViewer";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material/";
import {
  Accordion,
  Divider,
  Fab,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddTraining from "../src/components/AddTraining";
import { TrainingType } from "../src/types/Training";

export default function Home() {
  const [data, setData] = useState<TrainingType[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  if (data === undefined || data.length === 0) {
    GetAllData().then((resData: TrainingType[]) => {
      // console.log(resData);
      setData(resData);
      let weekDaysGetter: string[] = resData.map((d: TrainingType) => {
        return d.weekDay;
      });
      let uniqueWeekDays = weekDaysGetter.filter(function (item, pos) {
        return weekDaysGetter.indexOf(item) === pos;
      });
      console.log(uniqueWeekDays);
      setWeekDays(uniqueWeekDays);
    });
  }

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Treinos
      </Typography>
      <div>
        {weekDays.map((weekDay: any, index: number) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{weekDay}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={5}>
                  {data
                    ?.sort((a: TrainingType, b: TrainingType) => {
                      return a.id - b.id;
                    })
                    .filter((t: TrainingType) => t.weekDay === weekDay)
                    .map((training: TrainingType, index: number) => {
                      return (
                        <Grid key={index} item xs={12} xl={6}>
                          <Divider style={{ marginBottom: 20 }} />
                          <Typography variant="h6">
                            <Fab
                              color="secondary"
                              aria-label="add"
                              size="small"
                              style={{ marginRight: 2 }}
                            >
                              <EditIcon fontSize="small" />
                            </Fab>
                            {training.exercise}
                          </Typography>
                          <VideoViewer url={training.videoUrl} />
                          <Typography>
                            <b>Id:</b> {training.id}
                          </Typography>
                          <Typography>
                            <b>Séries:</b> {training.series}
                          </Typography>
                          <Typography>
                            <b>Repetições:</b> {training.repetitions}
                          </Typography>
                          <Typography>
                            <b>Dia da Semana:</b> {training.weekDay}
                          </Typography>
                          <Typography>
                            <b>Período:</b> {training.startPeriod} até{" "}
                            {training.endPeriod}
                          </Typography>
                          {/* <Typography>Peso: {training.weight}</Typography> */}
                          <div style={{ marginTop: 5 }}>
                            <TextField
                              variant="outlined"
                              label="Peso"
                              value={training.weight}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                let currentData: TrainingType[] | TrainingType =
                                  data.filter((d: any) => d.id === training.id);
                                currentData = currentData[0];
                                currentData.weight = event.target.value;

                                let newData: TrainingType[] = data.filter(
                                  (d: any) => d.id !== training.id
                                );

                                newData.push(currentData);
                                setData(newData);
                              }}
                              size="small"
                            />
                            <Button
                              color="primary"
                              variant="contained"
                              size="medium"
                              children="Salvar"
                              startIcon={<SaveIcon />}
                              onClick={() => {
                                UpdateData(training).then(
                                  (resData: TrainingType) => {
                                    let newData: TrainingType[] = data.filter(
                                      (d: any) => d.id !== training.id
                                    );
                                    newData.push(resData);
                                    setData(newData);
                                    // setData([newData, {training}])
                                  }
                                );
                              }}
                            />
                          </div>
                        </Grid>
                      );
                    })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <AddTraining />
    </div>
  );
}
