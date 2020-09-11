import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../../App'
import {Link,useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-responsive-modal';


const useStyles = makeStyles ((theme) =>({
    root: {
      minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    container: {
       
        height: '100vh',
        display:'flex',
        justifyContent:'center',
        backgroundColor: 'white'
    },
    text: {
        color: 'blue'
        

    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    
  }));

 
function Home() {
    localStorage.setItem("position", JSON.stringify(""))
    const [data,setData] = useState([])
    const {state,dispatch} =  useContext(UserContext)
    const classes = useStyles()
    const history = useHistory()
    // getModalStyle is not a pure function, we roll the style only on the first rende
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const teacher = () => {
        history.push('/teacher')
        localStorage.setItem("position", JSON.stringify("teacher"))
    
    }
  
    


    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                {/* <Typography component="div" className={classes.container} >
                    <img id="image" src="data:image/png;base64,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"/>
                    <h1>Examination System</h1>
                    <p>              
                    React components for faster and easier web development. Build your own design system, or start with Material Design.
                    </p>
                </Typography> */}
                
                <Typography component="div" className={classes.container} >
                 <div style={{ width: '100%' }}>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                         <img id="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAADICAMAAAD7nnzuAAAAxlBMVEX///8AgcsAsP8Asv8Ags77/v8Af8wmu/4mk9MAt/8Asf8AhdQAtP9ExP5EotkAg9MAmeUAk95jseCB1/8Ah9Py+fwAf8/U6fbo+P/o8/r1+/0Ai9TI4vMAuf/k8vrc7PefyunP7/+AvOTf9f+r0u242O7K4vOz5P/D6/+UxeZw0P4/nd1Kn9otv/+P2/7S8P+q4v8AdshcqNtVy/5zsuCCveOc3/89xP4zmNo9n9iFyvQAmemG1/+u2O85mtsAjtNFsvJcv+8ovllUAAANhElEQVR4nOWdeUPiOhfGK6RlKZgRW6CUTQQVpOCwCPNetfd+/y/1JhWVJW2ztoV5/h2r/U1ymifJSY62vNO185TeWNhCj9e0TmdynviNgfub/8X1h5Xla4VKxZvdS3ypZNTtf0DT4IbvjrfQLGqFfC5fqr6IdKDk1RpNLeMK8MLbw6kFrkAAnyvnC8snua+nVI2FC66uuOHbu8c/4ZEqpUlT8iuqkj1wzasrbninZsLPx7/hc/mK93oO+M6wWAdX3PBO3/9+/AceNX5l+Zj10LdHC7B7dx549Piu2Y/hc+WKN8l26LdXPvxmZ4dHjxtXV2T4AP8tu33fGfs/zc4O313fmAePH8EjdQqv2ez7rWHR3Gs3Vni7XzSvDh8/hUehv3lqqWPgVOvhGh69PAt8a/QHguPHCfCo75du59lyvHpjYJ28PD188Pjx02T4oPEz5Xi74+dTdHr4HvKypMfJ8GjU71RfFRPRKzCjBFHC98MeD4NHrV+o3qmmolJjQX53Svj2dejj4fC4809SD329NwCn0UoNj+bsZvjjUfDY8aYc+t1+kRSttPDd8bcVZoZP2/EiM0r4SDPA1yL+5+Lh0bBXSM3xPqxcI+rl4+H/HDsDNvjA8d6m0fittW9GolPAX4vCI/xSJ3HH2xq6kV02MXi80lFNNPRRsJ942dTgUd/vJBj67ZUb9Z1LGh4Ne3nvLZlhrzvegtgenyw8Uqf6ot7z6EO8LkunJOFR6G9U9/3GdbgjSxc+lytVbu/VtT7ysgzoicMHa7yqQh9vwtAFe0rwwbD3qmKhRx8uqIM9NXi8vVOVH/qNmkv5jU8VHrd+YSK37ztfmzBnAI9Nz0zeEvfeLso5wKPGz28kOV67fboum3F4aY73YeCzDG/ZgMezPe9WNPS7623YEpt6eF8AHuF3Cq9Cnuc9ds6uDt6s14Tg8ajvcW/vtNp/uL5zUuCBNX3XBOGDrAa+hKYG5cRVBTwAz2NHE4fPVco8a7zd/las2QXggeGuGsEPCMMjw19avrD1/dYwdCdCPbxpLtq7UVoCPB72mBKadglFqcCDenH4bVBkwOfwZHdJ2/edGqepkQFvuuu9hyTBo75foJrsOpGbMGrhAfwKdsnweHun+hJn+O3RdeQmjFJ4aC1Gh98mefC5cjkul7EdtwmjEB7Ut0Pn6AckwuMv3+Y2vPGd9VbE0InBQ2vQO/kBqfCB4Q9Z6GkNt5BxqUYePLAWDcIPSIbHpmfzdDrZtR/+1OV84zngjcDLJgGPGr80eTp8Lf1hIOpl+eGB9ellE4EP1ngPtnd6Y7nBzgIPoL8m9Xhl8Hiy6/1MdocfrOuy8uDN+nUj3HqrgUet/7XGG55QlAA8LA6jfiY2OYEbv9KZzPXeSsDUgOgOE5+Z8Wscvc4YDZ8veXnurlHJe/+LygiKRfd9Mfh+O/rfY+BL1adlqcJLnyv9wx/syIy2a5G9hvuMDTW81nzZcONXfvGiAxStjpY6vKY1b0ulhOFhfYCH5gzAa9r9slDh+fJxwkN3Z0YzAa/pj8tOnh2fCx5Y0+FuaM4GvIZDv8Ic+hzwaObZ73790azAa9r8jbnvs8NDd7BnRrMDr+l3rMMeKzyE1+19oAzBIz1tCiyNzwZvmNujmWe24DV7tikx5G8xwANzuz6eeWYM/jP0afHp4dHMc/Vw8rcyB6+1npZ5yi8fNTyaeY4Ic5DsweNhz6Mb9ijhQb3YJ661ZBEe4c8KNI6XDt50T4I90/DI8U68+L5PA2+4tdBlpqzCaxp2vMLwhrWIWGvJLjyF442DB/Djx8ueF7ymN2eVUlTfj4E364Ne5Purhe8JwSPNq1GONxIeednTkT05eGcQl4oWC49Cv9oph7V+BLyBJq6xv1sdvDP0oQR4rfm6CbN8ofAAbsN2UZKAt9vXJohNQqSB17S7N4+MHwIPDHcQ1+NVwjcGNxDEZ2DSwWPHS/zuk+FN+J0RlAa8M/4wDy8JEoPH61weYbZHgkdTmCFt7pYK+PeP3Q6SPHiE/+adDHsEeNMf0KetSYfX29ffuygy4dGwNzkO/WN4nP4Xt4uiEr6xv1MuFx6HfunA8B/BQ3NBmriGSy780QkmyfAnjvcAHg1v5IlruGTCt94Xh0kC0uHRbG+2t72zD0/MCIqRRHh8gunocfnweLLbqZzAh2QExUgavF2zTjKClMB/TnbL+/CAxssSJAneGZJSvBXBY8ebr3zDo4nrOGriGi4p8PjqDVKSgCp41PffOmjYC+BRsDc4fagM+PbKJSdIqIPXWnh7B8EDNHHlPn4qDu+EJ4IphA8cr/cP/HgXOHkrCo+vkQtNi1EKj6Lt9V+aiWu4BOEJ18glB4++fCIP99ZuFDtFKlr0/51qeAE5/WnMqQTVlwSlB/8ecpEbU8ufJ3yvRpG2eZnwXdKtjX8HvDMkXvr4N8C32tTZuhcH3zi40/jvgo+/B+5S4VtDtrszLgi+1V4w3Y90SfCNgc963vBS4J3+M/sRpAuBH8V72UuFb1ybXOcNzx9e7615jyCdPTwKdu7j9BLgI/PpVMO/ixy6M+PKN8XCv0Rm0qqF74kcpwfQHcf8/lh4rTmJaHyV8Dbysrzk+FRCLXYvIB5e0+6WXlhKkTp4m7iLQivDXVBsddPAa/pLNSSZUhW83Ra5MgVY0z7NgjgVvKbdv5LPECiCR16W/8oUnMlFt99LCa/p97ekZEol8LbIPXBXprGi3f2ihUe6+9xcVA4/+hC4SQDC4oh6448BXtNQ6JcVw+sPVBeYh72v9dFn+GNM8Nr92+bwxLhseJwRJHCmfLtmSu5gg0d9f1LYPzYqF17Ey+LhbdVm2+pmhdfsp2WnogReF/KywJyyZXJpHPB4b7Xz/d2XCC92Dxzysuw3zXLAoza6LezwpcE767rARTmWW+O5ZJcLXtOeJp+HhiXBO0ORe+AAlZcliBNesx+DPGop8HpMMZ4YdGM65LxbmRceZ1R5+bwM+MbgRmDiWvc5M7k0EXjkeCcdTxjeHm9FJq5WLfoIUqQE4JHmS4/7LwfSh8Q6eZQC1jVfsO8kBq+1BGvWzfjWZQMZbF72RPbIjy59FQcvqtvSr+ikovBXMxm97JH09irGUiUAX879sjjYobV6EDk114i/clI9fCVXzuduWNHN+jOzl91Xq0+xYpAEPL4bkK3vG6bP4WV/pONTc/F/Jhl4fD8afd8HcDvgHtk1vAUUUZcyDfhcuVK+oRvy6NZlw9Wjrg6SGDzq+2Wa0IcWt5cNZA+n1OVwEoRHH75yXOgD6Ecep4/ViGXanCT8J37U25hG/CZMlLo1y2S4fDBZeBz64X3fsMSC3RkzXq2bNDyueEjGB6LBTqixnjl4cuiDOu0mDFk6fdpmqvAY/9jxinrZ3nrLsWKQCjy+CH+/7wP4py1UAW/MtwWUEjx2vLld30deluu84Zf0Ee/VuqnBI8ebw6GPJq5iXvahZvCuGKQI/xn6PusmzKEaY4GFojTh8bBX/k/Myz6LbHWbK2mYZEXC4wogE/51svbC5b9M2oBFIV9Bo2j4XFDuku/sXZdwKJxeUGzFgE6x8Oi7X3hlx3f6Ilvd4KYmYqloFQ+PVzqWjOUuneG1QDkc4C5GinAPRQPPXO5yVBOoDgLqzye1fBSJCh7jexHFfw7VHfjM5Xt/0KG1dtTXUv8UJTxSp0BV887uC6Vtct3cwSt6+KDAexy+PRLKa7GmyQT7TgzwQejPo7pkqyEyvOFMroSCfScW+KDyU0S5SzRxFagOAv1Bgj0+EBs8GvU71ZBKt62+kJet18SmzTxihcfVb6pzwi9q/xHJ5II+fdqmPLHD53Kl8uT+qO5XoyZQ8gxNm8cpoPPB48pBr4d1v0RytA1/lXSwi8DjYa/67Xjt0VQgURlYi+SDXQw+V857O8fbXgnkLgIzMS9Lgues/vPleLurGyFDtxbaAhLUa4G/8FW5VPhPpL6haYntfokLn97hrvomUvfLsBbkupRJ6n5GOMBBqQpzPsuXgDFN2MuSpc/fOlyFr/jhAXTXArmLUtW6i7wKXTq8aS4i6lImLv3R6yQFb5jPaXjZKNmz0/uQVcADazvOUKt/CafwM5a7ZIYHYJv4xJVOrccl43efFR5ataz1+B81XwpMNe/Y4EG9KJS2qVzNSYfB8LLAG2h4yzQ61nziUVs+BnjjZpXEJoyo9Edqx0sNj7xsdoP9ULgCCF3dLzp4YE5TnLgya35LFfp08NAXOpWQvPS7TTm+8Wng4e8F72XSKSr0qgoWeGBN05+48qg5Cy3+QwkPwHMCOQaKNH+LHvai4UHdX2fTy9KpdXBenQ0el2g/v2A/kP3iHV9VQQUP4Ee2vSyd7FlogfdQeMN0szhx5dHdJKTIdQg8AKltwigQmuwS17nI8PB8vCydmi8k00OCTzChKDk1b0+/+wR4GFrD9rw1Xx5v75zAQzeR7MFUdFzu8ggeT1zTfkWFas4OSv4dwCMbf75elk53+9s7e/AA+uPLGd7ChBxvrnQCb/6u8ZcCOiu9fPX9L3gAi+c5ceWRPdsE2zuf8MD6uBQvS6e7iVfOB/CgfsNe5O/MFUx2EfzFeVk6NdFk96Y+HV2koYtXc/arr3Rk/z/77XG8A31gywAAAABJRU5ErkJggg=="/>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                    <h1>Examination System</h1>
                    </Box>
                    
                </Box>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                    <p>              
                    React components for faster and easier web development. Build your own design system, or start with Material Design.
                    </p>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={()=>teacher()}>Teacher</Button>
                    <Button>Student</Button>
                    </ButtonGroup>
                    </Box>
                </Box>
                </div>
                </Typography>
                
            </Container>
        </>
        
    )
}

export default Home
