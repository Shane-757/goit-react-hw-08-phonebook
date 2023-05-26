import { Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavLink = ({ to, isActive, children }) => {
  return (
    <Box as={RouterLink} to={to} fontWeight={isActive ? 'bold' : 'normal'}>
      {children}
    </Box>
  );
};

export default NavLink;