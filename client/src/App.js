import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './utills/PrivateRoute';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import ProductScreen from './containers/ProductScreen/ProductScreen';
import CartScreen from './containers/CartScreen/CartScreen';
import LoginScreen from './containers/LoginScreen/LoginScreen';
import RegisterScreen from './containers/RegisterScreen/RegisterScreen';
import ProfileScreen from './containers/ProfileScreen/ProfileScreen';
import ShippingScreen from './containers/ShippingScreen/ShippingScreen';
import PaymentScreen from './containers/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './containers/PlaceOrderScreen/PlaceOrderScreen';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Boostrap & Styling:
import './App.css';
import { Container } from 'react-bootstrap';

const App = props => {
  return (
    <div className="App">
      <Header />
      <Container className="main">
        <Route path={'/'} exact component={HomeScreen}/>
        <Route path={'/login'} component={LoginScreen}/>
        <Route path={'/register'} component={RegisterScreen}/>
        <Route path={'/product/:productId'} component={ProductScreen}/>
        <PrivateRoute path={'/cart'} component={CartScreen} isAuth={props.isAuth}/>
        <PrivateRoute path={'/profile'} component={ProfileScreen} isAuth={props.isAuth}/>
        <PrivateRoute path={'/shipping'} component={ShippingScreen} isAuth={props.isAuth}/>
        <PrivateRoute path={'/payment'} component={PaymentScreen} isAuth={props.isAuth}/>
        <PrivateRoute path={'/place_order'} component={PlaceOrderScreen} isAuth={props.isAuth}/>
      </Container>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.userReducer.isAuth
  }
}

export default connect(mapStateToProps)(App);