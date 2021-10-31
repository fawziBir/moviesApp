import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { styled, alpha} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Typography from '@mui/material/Typography';
import {movies$} from './movies'
import { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ThumbUpSharpIcon from '@mui/icons-material/ThumbUpSharp';
import { useSelector, useDispatch } from 'react-redux'
import { assign, assignAll, deleteItem, setPageItems, setFilterValues } from './features/movies/moviesSlice'



// let movies = [
//   {
//     id: '1',
//     title: 'Oceans 8',
//     category: 'Comedy',
//     likes: 4,
//     dislikes: 1
//   }, {
//     id: '2',
//     title: 'Midnight Sun',
//     category: 'Comedy',
//     likes: 2,
//     dislikes: 0
//   }, {
//     id: '3',
//     title: 'Les indestructibles 2',
//     category: 'Animation',
//     likes: 3,
//     dislikes: 1
//   }]

const originalMovies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    likes: 4,
    dislikes: 1
  }, {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    likes: 2,
    dislikes: 0
  }, {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    likes: 3,
    dislikes: 1
  }]

function ControlledOpenSelect() {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [uniqueCategories,setUniqueCategories] = React.useState([]);
  const currentMovies = useSelector((state) => state.movie.allValues)
  const pageSize = useSelector((state) => state.movie.pageSize)
  const currentPage = useSelector((state) => state.movie.currentPage)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setAge(event.target.value);

    if (event.target.value !== "All"){
     dispatch(setFilterValues(event.target.value))
     dispatch(setPageItems({"pageSize":pageSize,"currentPage":1}));
    }else{
      dispatch(setFilterValues("All"))
      dispatch(setPageItems({"pageSize":pageSize,"currentPage":1}));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const uniqueCategories2 = []
    const categoryList = currentMovies.map(movie => {
    if (uniqueCategories2.indexOf(movie.category) === -1) {
      uniqueCategories2.push(movie.category);
    }
  });
    setUniqueCategories(uniqueCategories2)
  },[currentMovies]);

  return (
    <div>
      <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        Select a category
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {uniqueCategories.map((item, index) => 
          (<MenuItem value={item} key={index}>{item}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}

function SelectNumberFilm() {
  const [film, setFilm] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const currentPage = useSelector((state) => state.movie.currentPage)
  const dispatch = useDispatch()


  const handleChange = (event) => {
    setFilm(event.target.value);
    dispatch(setPageItems({"pageSize":event.target.value,"currentPage":currentPage}))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button sx={{ display: '', mt: 2, minWidth: 120  }} onClick={handleOpen}>
        Select Number of Films
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Number</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          defaultValue={12}
          label="Film"
          onChange={handleChange}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12 }>12</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}



function MovieCard(props) {

  const [countLikes, setLike] = useState(props.likes);
  const [countDislikes, setDislike] = useState(props.dislikes);
  const [currentReaction,setCurrentReaction] = useState(0); /*(-1:dislike,0:none,1:like)*/
  const dispatch = useDispatch()
  
  const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

  function ReactLike(){
    if (currentReaction == 0){
      setLike(countLikes+1)
      setCurrentReaction(1)
    }else if(currentReaction == -1){
      setLike(countLikes + 1)
      setDislike(countDislikes-1)
      setCurrentReaction(1)
    }else{
      setLike(countLikes - 1)
      setCurrentReaction(0)
    }
  }

  function ReactDisLike(){
    if (currentReaction == 0){
      setDislike(countDislikes+1)
      setCurrentReaction(-1)
    }else if(currentReaction == 1){
      setLike(countLikes - 1)
      setDislike(countDislikes+1)
      setCurrentReaction(-1)
    }else{
      setDislike(countDislikes - 1)
      setCurrentReaction(0)
    }
  }

  function DeleteItem(){
    dispatch(deleteItem(props.id))
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.category}
        </Typography>
      </CardContent>

      <GaugeChart id="gauge-chart1" 
        nrOfLevels={30} 
        colors={["#d3d3d3", "#2f97de"]} 
        arcWidth={0.2}
        textColor="#000000" 
        percent={countLikes/(countDislikes+countLikes)} 
      />

      <CardActions disableSpacing>
        <IconButton aria-label="like button" onClick={ReactLike}>
          <ThumbUpOutlinedIcon /> &nbsp; {countLikes}
        </IconButton>
        <IconButton aria-label="dislike button" onClick={ReactDisLike}>
          <ThumbDownAltOutlinedIcon/> &nbsp; {countDislikes}
        </IconButton>
        <ExpandMore
          aria-label="show more"
        >
          <DeleteForeverOutlinedIcon color="secondary" onClick={DeleteItem}/>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MovieCards(){
  const movies = useSelector((state) => state.movie.value)
  const dispatch = useDispatch()
  useEffect(() => {
    movies$.then(x => {
      dispatch(assignAll(x))
      dispatch(assign(x))
    })
  },[]);
  return(
    movies.map((item) => <Grid item xs={12} sm={6} lg={4} key={item.id} >
            <MovieCard title={item.title} category={item.category} 
            likes={item.likes} dislikes={item.dislikes} id={item.id}/>
          </Grid>)
  )
}

function BasicGrid() {
  const allValues = useSelector((state) => state.movie.allValues)
  const pageSize = useSelector((state) => state.movie.pageSize)
  const pagesNumber = useSelector((state) => state.movie.pagesNumber)
  const dispatch = useDispatch()

  const ChangePage = (event, page) => {
    console.log(pageSize,page)
    dispatch(setPageItems({"pageSize":pageSize,"currentPage":Number(page)}))
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12}>
          <ControlledOpenSelect/>
        </Grid>
        <Grid container item spacing={2} alignItems="center" justify="center">
          <MovieCards/>
        </Grid> 

        <Grid item xs={6}>
          <SelectNumberFilm/>  
        </Grid>
        <Grid item xs={6}>
        <Stack spacing={2}>
          <Pagination count={pagesNumber} showFirstButton showLastButton 
          onChange={ChangePage}/>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
    <BasicGrid/>
    </div>
  );
}


export default App;
