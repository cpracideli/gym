import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import { GetAllData, UpdateData } from "../src/api";
import {
  Accordion,
  Divider,
  Fab,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddTraining from "../src/components/AddTraining";

export interface Training {
  id: number;
  series: number;
  repetitions: string;
  exercise: string;
  startPeriod: string;
  endPeriod: string;
  videoUrl: string;
  weight: string;
  weekDay: string;
}

export default function Home() {
  const [data, setData] = useState<Training[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  if (data === undefined || data.length === 0) {
    GetAllData().then((resData: Training[]) => {
      // console.log(resData);
      setData(resData);
      let weekDaysGetter: string[] = resData.map((d: Training) => {
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
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {weekDays.map((weekDay: any, index: number) => {
          return (
            <div>
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
                      ?.sort((a: Training, b: Training) => {
                        return a.id - b.id;
                      })
                      .filter((t: Training) => t.weekDay === weekDay)
                      .map((training: Training, index: number) => {
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
                                  let currentData: Training[] | Training =
                                    data.filter(
                                      (d: any) => d.id === training.id
                                    );
                                  currentData = currentData[0];
                                  currentData.weight = event.target.value;

                                  let newData: Training[] = data.filter(
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
                                    (resData: Training) => {
                                      let newData: Training[] = data.filter(
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
            </div>
          );
        })}

        <AddTraining />
      </Box>
    </Container>
  );
}
