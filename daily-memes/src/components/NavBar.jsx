import React, {useState} from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { supabase } from '../supabaseClient'

function Nav({session, setSession}) {
  const [subscribed,setSubscribed]=useState(false)
    const loginSubmit = async ()=>{
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
            console.log(data.user.id)
            if(data){
                setSession(data)
            }            
    }
    if (session != null){
      let formData = new FormData();
      formData.append('email_id', session.user.email);
      console.log(session.user.email)
      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
    
      
      fetch("https://karthikhosur100.pythonanywhere.com/memes/check", requestOptions)
      
        .then(response => response.json())
      
        .then(result => {
          console.log(result.data)
          setSubscribed(result.data)
        })
      
        .catch(error => console.log('error', error));
        console.log("subscribed",subscribed)

    }


    const logoutSubmit = async ()=>{
        const { error } = await supabase.auth.signOut()
        console.log(error)
       setSession(null);
    }
    const subscribe = async ()=>
    {
      let formData = new FormData();
      formData.append('email_id', session.user.email);
      console.log(formData)
      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
    
      
      fetch("https://karthikhosur100.pythonanywhere.com/memes/subscribe", requestOptions)
      
        .then(response => response.text())
      
        .then(result => {
          setSubscribed(true)
          console.log(result)})
      
        .catch(error => console.log('error', error));
      
       
      // try {
      //   const res = await axios.post('https://karthikhosur45.pythonanywhere.com/memes/subscribe', email)
      //   console.log(res.data)
      // } catch (e) {
      //   console.log(e)
      // }
  }


    if (session != null){
        return (
            <>
              <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:10 }}>
              <IconButton>
              <Button variant="outlined" size="small" onClick={()=>subscribe()}>
              {subscribed === false ? 'Subscribe Newsletter' : ' Newsletter Subscribed'}
                </Button>
                </IconButton>
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  sx={{ flex: 1 }}
                >
                  Daily Memes
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" onClick={()=>logoutSubmit()}>
                  Log Out
                </Button>
              </Toolbar>
              
            </>
          );
    }
    else {
    return ( 
        <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            Daily Memes
          </Typography>
          <IconButton>
           
          </IconButton>
          <Button variant="outlined" size="small" onClick={()=>loginSubmit()}>
            Log In
          </Button>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >

        </Toolbar>
      </>
)
    }

  

}

export default Nav;