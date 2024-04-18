import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules);
  let module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
      );
  }, [courseId]);
  const handleAddModule = () => {
    module = {...module, id: Date.now()};
    console.log(module.id);
    console.log(module._id);
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      <div className="wd-align-right">
        <button className="wd-standard-button">Collapse All</button>
        <button className="wd-standard-button">View Progress</button>
        <select className="wd-standard-button">
          <option>✔ Publish All</option>
          <option>Unpublish All</option>
        </select>
        <button className="wd-red-button">+ Module</button>
        <button className="wd-standard-button">⋮</button>
      </div>
      <hr />
      <div className="wd-add-module">
        <h6>New Module Information</h6>
        <input value={module.name}
          className="form-control wd-add-spacing"
          onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
          }
        />
        <textarea value={module.description}
          className="form-control"
          onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
          }
        />
        <div className="wd-align-right">
          <button className="wd-add-button"
            onClick={handleAddModule}>Add</button>
          <button className="wd-edit-button" onClick={() => handleUpdateModule()}>
            Update
          </button>
        </div>
      </div>
      <ul className="list-group wd-modules">
        {modulesList.filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}>
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button className="wd-red-delete-button"
                    onClick={() => handleDeleteModule(module._id)}>
                    Delete
                  </button>
                  <button className="wd-edit-button"
                    onClick={() => dispatch(setModule(module))}>
                    Edit
                  </button>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule && selectedModule?.id === module.id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any) => (

                    <li className="list-group-item "  >
                      <FaEllipsisV className="me-2" />
                      {lesson.extlink ?
                        <>
                          <FaLink className="me-2 text-success" />
                          <a href={lesson.extlink} className="wd-red-link">
                            {lesson.name} <FaExternalLinkAlt className="me-2" />
                          </a></> : lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>

                    </li>

                  )

                  )
                  }

                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;