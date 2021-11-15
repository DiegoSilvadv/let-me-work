import { Switch, Route } from "react-router";

import {Home} from '../pages/Home'
import {OfferService} from "../pages/OfferService";
import {Work} from '../pages/Work'
const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/works" exact component={Work} />
        <Route path="/offer-service/:id" exact component={OfferService} />
    </Switch>
)

export default Routes;
