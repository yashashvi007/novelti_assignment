import { styled } from '@mui/material/styles';
import { AppBar} from '@mui/material';


export const StyledAppBar = styled(AppBar)({
    backgroundColor: '#2196F3'
});
  
export const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
});
  
export  const linkStyles = {
    textDecoration: 'none',
    margin: '0 8px',
    color: '#FFFFFF',
};
export const activeLinkStyles = {
    fontWeight: 'bold', 
    color: 'yellow', 
  };