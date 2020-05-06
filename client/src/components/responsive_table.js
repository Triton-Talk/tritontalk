import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap'
import TableTile from "./tableTile";

const ResponsiveTable = (props) => {
  const notes = props.notes;

  const noteRows = notes.map(note => {

    //let classes = `small ${!!note.isNew ? 'table-success' : ''}`;

    return (

      <Col
        xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }}
        lg={{ span: 4 }} xl={{ span: 3 }}
      >
        <center>
          <TableTile user={note} />
        </center>
      </Col>

      // <tr key={note.id.toString()} className={classes}>
      //   <td className="align-middle" style={{ width: '80px' }}>
      //     <div className="d-flex flex-row">
      //       <a data-toggle="tooltip" data-placement="top" title="Edit Patient" className="p-2" onClick={() => props.onOpenEditNoteModal(note.id)}>
      //         <i className="fa fa-edit fa-lg text-primary"></i>
      //       </a>
      //       <a data-toggle="tooltip" data-placement="top" title="Delete Patient" className="p-2" onClick={() => props.onDeleteNote(note.id)}>
      //         <i className="fa fa-times-circle-o fa-lg text-danger"></i>
      //       </a>
      //     </div>
      //   </td>
      //   <td className="align-middle"><a href={'/patient/' + note.title}>{note.title}</a></td>

      //   {note.title === 'Eric Robinsinstinson' ? (
      //     <td className="align-middle text-center text-danger">
      //       <span className="d-inline-block text-truncate" style={{ maxWidth: '200px' }}>
      //         <p className="align-middle text-danger">{note.content}</p>
      //       </span>
      //     </td>
      //   ) : null}

      //   {note.title !== 'Eric Robinsinstinson' ? (
      //     <td className="align-middle text-center">
      //       <span className="d-inline-block text-truncate" style={{ maxWidth: '200px' }}>
      //         <p className="align-middle text-success">{note.content}</p>
      //       </span>
      //     </td>
      //   ) : null}
      //   {/* <td className="align-middle text-success">
      //               <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
      //               <a href="#" className="align-middle text-success">{note.content}</a>
      //               </span>
      //           </td> */}
      //   <td className="align-middle text-center">{`${new Date(note.updatedDate).toISOString().slice(0, 10)} ${new Date(note.updatedDate).toISOString().slice(11, 16)}`}</td>
      // </tr>
    );
  });

  return (
    <div>
      <div className="btn-group" role="group" aria-label="Button group with nested dropdown" >

        <div className="btn-group" role="group" style={{ textAlign: 'right', marginBottom: '15px' }}>
          <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Filter Criteria
                    </button>
          {
            /*
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item" href="#">Alphabetical</a>
            <a className="dropdown-item" href="#">Forms Incompleted</a>
            <a className="dropdown-item" href="#">Time of Creation</a>
          </div>
            */
          }
        </div>

        <p className="h6" style={{ margin: '10px' }}><small><b>{notes.length}</b>  Friends</small></p>

      </div>

      <table className="table table-bordered" >
        <thead className="thead-dark">
          <tr>

          </tr>
        </thead>
        <tbody>
          <Row gutter={40}>
            {noteRows}
          </Row>
        </tbody>
      </table>
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{ marginLeft: '50%' }}></i>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

ResponsiveTable.propTypes = {
  notes: PropTypes.array,
  onDeleteNote: PropTypes.func,
  onOpenEditNoteModal: PropTypes.func
};

export default ResponsiveTable;
