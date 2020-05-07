import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap'
import TableTile from "./tableTile";
import Filter from './filter';


const Responsive_table = (props) => {
  const friends = props.friends;
  const FriendTable = friends.map(note => {
    return (
      <Col
        xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }}
        lg={{ span: 4 }} xl={{ span: 3 }}>
        <center><TableTile user={note} /></center>
      </Col>
    );
  });


  return (
    <div>
      <Filter props={friends} />
      <table className="table" >
        <tbody>
          <Row gutter={40}>
            {FriendTable}
          </Row>
        </tbody>
      </table>
    </div>
  );
};

Responsive_table.propTypes = {
  friends: PropTypes.array,
  onDeleteFriend: PropTypes.func,
  onOpenEditFriendModal: PropTypes.func
};

export default Responsive_table;
