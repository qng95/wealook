import React, {useState} from 'react';
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Typography,
  Avatar,
  Stack,
  TextField
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";


function FilterCard(props) {
  const {id, name, onDeleteBtnClick, onNameChange} = props;
  const navigate = useNavigate();
  const toFilterPage = () => {
    navigate(`/filters/${id}`, {state:{id: id, name: name}})
  }

  const [isEditingName, setisEditingName] = useState(false);
  const [editableName, setEditableName] = useState(name);

  const debouncedNameChange = _.debounce(function (event) {
   const newName = event.target.value;
   setEditableName(newName);
  }, 300);

  const toogleEditMode = () => {
    if (isEditingName) {
      onNameChange(id, editableName);
    }
    setisEditingName(!isEditingName);
  }

  const deleteBtnClick = () => {
    onDeleteBtnClick(id)
  }

  const img_name = Math.floor(Math.random() * 8);
  return (
    <Card>
      <Box 
        sx={{
          border:'2px solid',
          borderColor: 'third.light',
          backgroundColor: 'third.dark',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [1.9, 1.8, 1.7],
          },
      }}>
        <Stack direction="column">
          <Avatar variant="square" 
            style={{border: 0, objectFit: 'cover'}} 
            sx={{width:'100%', height: 300}} 
            src={`/countries_img/${img_name}.jpg`} onClick={toFilterPage} />
          <Stack direction="row">
            <IconButton aria-label="delete-filter" color="error" onClick={deleteBtnClick}>
              <Delete />
            </IconButton>
            <CardActionArea sx={{color: 'primary.light', p:2, textAlign: 'center'}} >
              {
                isEditingName
                  ? <TextField id="standard-basic" defaultValue={editableName} variant="standard" onChange={debouncedNameChange}/>
                  : <Typography>{editableName}</Typography>
              }

            </CardActionArea>
            <IconButton aria-label="start" color="info" onClick={toogleEditMode}>
              {
                isEditingName
                  ? <CheckIcon/>
                  : <EditIcon/>
              }
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default FilterCard;