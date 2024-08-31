import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = (props) => {
    let route = "/";
    let [segment, setSegment] = useState([""]);
    let location = useLocation();

    useEffect(() => {
        setSegment(location.pathname.split("/"));
    }, [location.pathname])

    return (
        <div className="container-fluid page-header py-5" style={{backgroundColor:"#3b5d50" }}>
            <h1 className="text-center text-white display-6 text-capitalize">
                {segment.length === 4 ? `${segment[segment.length - 1]} ${segment[segment.length - 2]}` : segment[segment.length - 1]}
            </h1>
            <ol className="breadcrumb justify-content-center mb-0">

                {segment.length > 0 && segment.map((s, i) => {
                    s = s.replace("-", " ")

                    if(route) {
                        route = route + "/" + s;   
                    }
                
                    if (s === "") {
                        return <li className="breadcrumb-item text-capitalize" key={i}>
                            <Link to="/">Home</Link>
                        </li>
                    }

                    if (s === "admin") {
                        return <li className="breadcrumb-item text-capitalize" key={i}>
                            <Link to="/admin/dashboard">Admin</Link>
                        </li>
                    }

                   
                    if (segment.length - 1 === i) {

                        return <li className="breadcrumb-item text-capitalize" key={i}>
                            <Link to="#">{s}</Link>
                        </li>
                    }

                    if(s === "edit" ) {
                        return undefined
                    }

                    return <li className="breadcrumb-item text-capitalize" key={i}>
                        <Link to={route.replace("///", "/")}>{s}</Link>
                    </li>
                })}
            </ol>
        </div>
    )
}

export default Breadcrumb