import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../App.css'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default class Fetch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            search_data:[],
            title:'',
            postData:[]
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    //Function to call the records from Api
    receivedData() {
      axios
      .get(`https://api.artic.edu/api/v1/artworks?limit=100`)
            .then(res => {

                const data = res.data.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                  
                    <Link to='/Detail' state={{data:pd}}>
                   <p>
                  
                      {pd.title}</p>
                    <img src={pd.thumbnailUrl} alt=""/></Link>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });
    }
//Function to dispaly the data via pagination

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            
              this.receivedData()
             
           
         
        });

    };

    componentDidMount() {
        this.receivedData()
    }
/// Return the records based on title
    doSearch(title){
        axios
      .get('https://api.artic.edu/api/v1/artworks/search?query[term][title]='+title+'&limit=100')
            .then(res => { 

                const data = res.data.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const search_data = slice.map(pd => <React.Fragment>
                  
                    <Link to='/Detail' state={{data:pd}}>
                   <p>
                  
                      {pd.title}</p>
                    </Link>
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    search_data
                })
            });
    
    }
   /// Clear the Search Data  
    doClear(){
      this.setState({search_data:[],title:''})
    }


    render() {
        return (
            <div>
              <Container maxWidth="lg">
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
        
          <Typography variant="h6" color="inherit" component="div">
            Book List
          </Typography>
          <Search>
            <SearchIconWrapper>
              
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={e=>this.setState({title:e.target.value})}
            />
          </Search>
        <Button style={{color:"white"}} onClick={e=>this.doSearch(this.state.title)}>Search</Button>
        <Button style={{color:"white"}} onClick={e=>this.doClear(this.state.title)}>Clear</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
    </Container>
                {(this.state.postData.length!==0 && this.state.search_data.length==0)?this.state.postData:this.state.search_data}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>

        )
    }
}
