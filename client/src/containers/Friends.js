import React from 'react'

import ResponsiveTable from "../components/responsive_table";

const Friends = (props) => {

  const dumData = [
    { id: "hi1", title: "title0", updatedDate: "123", content: "content0", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi2", title: "title1", updatedDate: "123", content: "content1", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi3", title: "title2", updatedDate: "123", content: "content2", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi4", title: "title3", updatedDate: "123", content: "content3", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi5", title: "title4", updatedDate: "123", content: "content4", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi6", title: "title5", updatedDate: "123", content: "content5", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" },
    { id: "hi7", title: "title6", updatedDate: "123", content: "content6", image: "https://image.flaticon.com/icons/svg/2858/2858063.svg" }
  ]

  const [friends] = React.useState(dumData);
  /*
  const [friends, _setFriends] = React.useState(dumData);
  const [selectedNote, setSelectedNote] = React.useState(null)
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = React.useState(false)
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = React.useState(false)
  */

  return (
    <div>
      <ResponsiveTable friends={friends} />
    </div >
  )
}


export default Friends;
