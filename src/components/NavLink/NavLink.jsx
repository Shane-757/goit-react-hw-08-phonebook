import { Link as RouterLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const NavLink = ({ to, children, fontSize = "lg", ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const color = isActive ? "blue.500" : "gray.500";
  
  return (
    <RouterLink to={to}>
      <Text
        color={color}
        fontSize={fontSize}
        _hover={{ textDecoration: "underline" }} 
        {...rest}>
        {children}
      </Text>
    </RouterLink>
  );
};

export default NavLink;