import React, { Component } from 'react'
import Navbar from './Navbar';
import Table from 'react-bootstrap/Table'
import TableTile from '../components/tableTile';
import Responsive_Table from "../components/responsive_table";
import DummyImage from "./dummy_profile_photo.png";
class Friends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [{ id: "hi", title: "title0", updatedDate: "123", content: "content0", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title1", updatedDate: "123", content: "content1", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title2", updatedDate: "123", content: "content2", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title3", updatedDate: "123", content: "content3", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title4", updatedDate: "123", content: "content4", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title5", updatedDate: "123", content: "content5", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
      { id: "hi", title: "title6", updatedDate: "123", content: "content6", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" }],
      selectedNote: null,
      isAddNoteModalOpen: false,
      isEditNoteModalOpen: false
    };
  }

  render() {




    return (
      <div>
        <Navbar />
        <Responsive_Table notes={this.state.notes} />

        {/* <Table responsive>
          <tbody>
            {elements.map((value, index) => {
              return (
                <tr>
                  <td><TableTile /></td>
                  <td><TableTile /></td>
                  <td><TableTile /></td>
                </tr>
              )
            })}

          </tbody>

        </Table> */}
      </div >
    )
  }
}

export default Friends;
