import ModuleList from "../Modules/List";
import "./index.css";
import Status from "./Status";

function Home() {
    return (
        <div className="wd-flex-fill">
            <div className="flex-fill">
                <ModuleList />
            </div>
            <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ width: 250, paddingLeft: 10 }}>
                <Status />
            </div>
        </div>
    );
}
export default Home;