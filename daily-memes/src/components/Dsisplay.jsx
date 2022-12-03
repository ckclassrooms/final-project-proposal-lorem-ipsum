import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box'



function Display() {
    const [memes,setMemes]=useState()
    const headers = {
        "Content-Type": "application/json",
        
      };
    useEffect(() => {
        getAllMemes();
   },[memes]);
   
   
    const url= "https://karthikhosur24.pythonanywhere.com/memes/cache?format=json"
    const getAllMemes =() => {
        axios.get(url,headers).then((response) => {
            const allMemes=response.data
            setMemes(allMemes)
        })
        .catch(error => console.log(error))

    }
    console.log(memes)
 
if(memes!==undefined)
{
    return (
        <Grid container spacing={2}>
            {memes.data.map((news) => {
                return (
                    <>

                    <Grid
                        item
                        xs={6}
                        >
                        <Typography variant="h6" gutterBottom>
                            {news.news_name}
                        </Typography>
                        <Divider />
                        <Box sx={{ paddingLeft: '100px' }} >
                            <Carousel >
                                {news.meme_urls.map((i) => (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 400,
                                            width: 400,
                                            objectFit: 'cover'
                                        }}
                                        src={i}
                                    />
                                ))}
                            </Carousel>
                        </Box>
                    </Grid>
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

export default Display