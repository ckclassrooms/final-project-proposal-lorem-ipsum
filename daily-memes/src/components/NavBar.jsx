import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { supabase } from '../supabaseClient'

function Nav({session, setSession}) {
    const loginSubmit = async ()=>{
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
            console.log(data.user.id)
            if(data){
                setSession(data)
            }            
    }

    const logoutSubmit = async ()=>{
        const { error } = await supabase.auth.signOut()
        console.log(error)
       setSession(null);
    }
    const subscribe = async ()=>
    {
      const email = { "email_id":  session.user.email}
      console.log(email)
      const requestOptions = {

        method: 'POST',
      
        body: email,
      
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      
      };
    
      
      fetch("https://karthikhosur45.pythonanywhere.com/memes/subscribe", requestOptions)
      
        .then(response => response.text())
      
        .then(result => console.log(result))
      
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
              <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <IconButton>
              <Button variant="outlined" size="small" onClick={()=>subscribe()}>
                  Subscribe Newsletter
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