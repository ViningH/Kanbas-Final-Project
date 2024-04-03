import KanbasNavigation from "../../Navigation";
import AccountNavigation from "../Navigation";
import { Navigate, Route, Routes, useParams, Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { link } from "fs";
function AccountBreadcrumb() {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    pathArray.shift();
    var pathLinks = [];
    var previousLink = "";
    for (let pathIndex in pathArray) {
        pathLinks.push("" + previousLink + "/" + pathArray[pathIndex]);
        previousLink = pathLinks[pathIndex];
    };
    console.log(pathLinks);
    const currentPage = pathArray[pathArray.length - 1];
    console.log(pathArray);
    pathArray.shift();
    pathLinks.shift();
    pathArray.shift();
    pathLinks.shift();
    var breadCrumbLinks = [];
    for (let pathIndex in pathArray) {
        breadCrumbLinks.push({_name: pathArray[pathIndex], _links: pathLinks[pathIndex]})
    };
    console.log()
    return (
        <>
            <nav className="wd-breadcrumb" aria-label="breadcrumb">
                <div>
                    <span className="float-end">
                        <div className="d-md-none">
                            <button className="wd-breadcrumb-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseAccountNavi"
                            ><FaChevronDown /></button>
                        </div>
                    </span>
                    <ol className="breadcrumb">
                        <button className="navbar-toggler wd-breadcrumb-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseKanbasNavi" aria-expanded="false"
                            aria-controls="collapseKanbasNavi"><HiMiniBars3 /></button>
                        {breadCrumbLinks.map(({_name, _links}) => (<li className={"breadcrumb-item " + (_name == currentPage ? "active" : "")} >
                            {_name == currentPage ? _name : <Link to={_links}>{_name}</Link>}
                            </li>))}    
                    </ol>

                </div>
            </nav>
            <div className="collapse" id="collapseKanbasNavi">
                <KanbasNavigation />
            </div>
            <div className="collapse" id="collapseAccountNavi">
                <AccountNavigation />
            </div>
        </>
    );
}
export default AccountBreadcrumb;