import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from '../Context'

const PrivateRoute = ({ render, ...rest }) => {

    const userDetails = useAuthState()
    console.log(userDetails)
    return (
        <Route
            {...rest}
            render={props =>
                Boolean(userDetails.token) ? (
                    render(props)
                ) : (
                        <Redirect
                            to={{ pathname: "/login" }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute