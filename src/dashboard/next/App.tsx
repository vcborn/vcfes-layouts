import React, { useCallback, useRef, useState } from "react";
import { useReplicant } from "../../hooks";
import { TextField, Button, Grid, IconButton } from "@mui/material";

const App: React.FC = () => {
	const [next, setNext] = useReplicant("next");
    const [time, setTime] = useState("");
    const [event, setEvent] = useState("");
    const [update, setUpdate] = useState(0);

	if (typeof next === "undefined") return null;

    const addNext = () => {
        if (time !== "" && event !== "") {
            const temp = next
            temp.push({time: time, event: event})
            setNext(temp)
            setTime("")
            setEvent("")
            setTimeout(() => {
                setUpdate(Math.floor(Math.random() * 1000))
            }, 200);
        }
    }

    const deleteItem = (index: number) => {
        const temp = next
        temp.splice(index, 1)
        setNext(temp)
        setTimeout(() => {
            setUpdate(Math.floor(Math.random() * 1000))
        }, 300);
    }

	return (
        <div>
            <p style={{ display: 'none' }}>{update}</p>
            <Grid container direction="column" alignItems="stretch" spacing={2}>
                {next.map((item, index) => {
                    return (
                        <Grid item key={index}>
                            <TextField
                                id="outlined-read-only-input"
                                label={`時間${index + 1}`}
                                defaultValue={item.time}
                                sx={{ mr: 2 }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            /> 
                            <TextField
                                id="outlined-read-only-input"
                                label={`イベント${index + 1}`}
                                defaultValue={item.event}
                                InputProps={{
                                    readOnly: true,
                                }}
                            /> 
                            <IconButton sx={{ ml: 1, mt: 1 }} aria-label="delete" onClick={() => {deleteItem(index)}}>
                                <span className="material-icons">delete</span>
                            </IconButton>
                        </Grid>
                    )
                })}
                <Grid item>
                    <TextField
                        id="outlined-basic"
                        label="時間"
                        variant="outlined"
                        value={time}
                        sx={{ mr: 2 }}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="イベント"
                        variant="outlined"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={addNext}>
                        追加
                    </Button>
                </Grid>
            </Grid>
        </div>
	);
};

export default App;