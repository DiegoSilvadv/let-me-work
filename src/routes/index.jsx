import { Switch, Route, BrowserRouter } from "react-router-dom";

import {Home} from '../pages/Home'
import {OfferService} from "../pages/OfferService";
import {Work} from '../pages/Work';
// import createHistory from 'history/createBrowserHistory';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


// const history = createHistory();

const Router = () => (
    <BrowserRouter>
        <ToastContainer autoClose={3500} />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/works" exact component={Work} />
            <Route path="/offer-service/:id" exact component={OfferService} />
        </Switch>
    </BrowserRouter>
)

export default Router;
