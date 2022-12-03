import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Carousel from 'react-material-ui-carousel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'


function Display({session}) {
    const [memes,setMemes]=useState()
    const headers = {
        "Content-Type": "application/json",
        
      };
    useEffect(() => {
        getAllMemes();
   },[]);
   
   
    const url= "https://karthikhosur90.pythonanywhere.com/memes/cache?format=json"
    const getAllMemes =() => {
        axios.get(url,headers).then((response) => {
            const allMemes=response.data
            setMemes(allMemes)
        })
        .catch(error => console.log(error))

    }
    console.log(memes)
    if (session != null){
 
if(memes!==undefined)
{
    return (
        <Grid container spacing={2}>
            
            {memes.data.reverse().map((news) => {
                return (
                    <>

                    <Grid
                        item
                        xs={6}
                        >
                       
                        <Box sx={{ paddingLeft: '100px' }} >
                            <Carousel >
                                
                                {news.meme_urls.map((i) => (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 600,
                                            width: 500,
                                            objectFit: 'cover'
                                        }}
                                        src={i}
                                    />

                                ))}
                            </Carousel>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                       
                        >
                            <Paper  display="flex"
      justifyContent="center" sx ={{margin: 1}} elevation={10}>
                            <Typography sx ={{paddingTop:2, paddingLeft: 7,paddingRight:2 }} variant="h4" gutterBottom>
                            {news.news_name}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx ={{paddingLeft: 7,paddingRight:2 }}>
                            {news.news_description} ......
                        </Typography>
                        
                        <Link href={news.news_url} underline="none" sx ={{paddingLeft: 7,paddingRight:2 }}>
                        <Typography variant="h6" gutterBottom sx ={{paddingLeft: 7,paddingRight:2 }}>
                            Read More
                        </Typography>
                        </Link>
                        </Paper>
                        </Grid>
                        <Divider />
                    </>
                )
            })}
            
        </Grid>
    );
        }
        else{
            return(
                <Typography>Loading</Typography>
            )
            }
        }
}

export default Display