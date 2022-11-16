import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';
import { supabase } from '../supabaseClient'

function Nav({session, setSession}) {
    const sections = [
        { title: 'Technology', url: '#' },
        { title: 'Design', url: '#' },
        { title: 'Culture', url: '#' },
        { title: 'Business', url: '#' },
        { title: 'Politics', url: '#' },
        { title: 'Opinion', url: '#' },
        { title: 'Science', url: '#' },
        { title: 'Health', url: '#' },
        { title: 'Style', url: '#' },
        { title: 'Travel', url: '#' },
      ];
    console.log(session)

    const loginSubmit = async ()=>{
        // Todo - Add logic to login via Github Oauth
   
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
            console.log(data.user.id)
            if(data){
                setSession(data)
            }
         
            console.log(session)  
                
    }

    const logoutSubmit = async ()=>{
        // Todo - Add logic to logout
        const { error } = await supabase.auth.signOut()
       setSession(null);
    }

    if (session != null){
        return (
            <>
              <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <IconButton>
                    <FavoriteIcon />
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
              <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
              >
                {sections.map((section) => (
                  <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    sx={{ p: 1, flexShrink: 0 }}
                  >
                    {section.title}
                  </Link>
                ))}
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