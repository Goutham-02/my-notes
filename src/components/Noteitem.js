import React from 'react';
import { Link } from 'react-router-dom';

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p className="card-text">{note.description}</p>
                    {/* <Link to="#" className="card-link">Card link</Link>
                    <Link to="#" className="card-link">Another link</Link> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem