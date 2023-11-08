import React, {useState} from 'react'
import {MdDateRange} from "react-icons/md"
import config from "../../../config/config"
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';


const Types = ({ announcements,onDelete  }) => {

    const currentDate = new Date();
const navigate = useNavigate()
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
      };
    
      const deleteAnnouncement = async (announcementId) => {
        try {
          // Send a network request to delete the announcement
          const response = await fetch(`${config.baseUrl}/api/deleteAnnouncement/${announcementId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            toast.success("Deleted announcement")
            onDelete(announcementId);
          } else {
            // Handle error
            console.error('Error deleting announcement');
          }
        } catch (error) {
          // Handle network error
          console.error('Network error', error);
        }
      };

      
  const upcomingAnnouncements = announcements.filter(
    (announcement) => new Date(announcement.startsAt) > currentDate
  );

  const liveAnnouncements = announcements.filter(
    (announcement) =>
      new Date(announcement.startsAt) <= currentDate &&
      new Date(announcement.endsAt) >= currentDate
  );

  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [liveVisible, setLiveVisible] = useState(false);

  return (
    <div>
        <Toaster/>
         <div>

      <h2 className="text-xl font-semibold mb-4">
        Upcoming Announcements ({upcomingAnnouncements.length})
        <button
          onClick={() => setUpcomingVisible(!upcomingVisible)}
          className="ml-2 px-2 py-1 bg-gray-300 rounded"
        >
          {upcomingVisible ? 'Hide' : 'Show'}
        </button>
      </h2>
      {upcomingVisible && (
        <ul className="space-y-4">
          {upcomingAnnouncements.map((announcement, index) => (
            <li key={index} className="bg-green-100 p-2 rounded">
              <h3 className="font-semibold text-lg mb-1">{announcement.title}</h3>
              <p> <span className='font-semibold '>Description :&nbsp;</span>{announcement.description}</p>
              <p><span className='font-semibold '><MdDateRange className='inline-block '/> Starts at :&nbsp;</span> {formatDate(announcement.startsAt)}</p>
              <p><span className='font-semibold '><MdDateRange className='inline-block '/> Ends at :&nbsp;</span> {formatDate(announcement.startsAt)}</p>
              <button
                onClick={() => deleteAnnouncement(announcement._id)} // Pass the announcement ID to the delete function
                className="bg-red-500 text-white hover:bg-red-700 text-sm font-medium px-4 py-1 mt-3 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Live Announcements ({liveAnnouncements.length})
        <button
          onClick={() => setLiveVisible(!liveVisible)}
          className="ml-2 px-2 py-1 bg-gray-300 rounded"
        >
          {liveVisible ? 'Hide' : 'Show'}
        </button>
      </h2>
      {liveVisible && (
        <ul className="space-y-4">
          {liveAnnouncements.map((announcement, index) => (
            <li key={index} className="bg-blue-100 p-2 rounded">
              <h3 className="font-semibold text-lg mb-1">{announcement.title}</h3>
              <p> <span className='font-semibold '>Description :&nbsp;</span>{announcement.description}</p>
              <p><span className='font-semibold '><MdDateRange className='inline-block '/> Starts at :&nbsp;</span> {formatDate(announcement.startsAt)}</p>
              <p><span className='font-semibold '><MdDateRange className='inline-block '/> Ends at :&nbsp;</span> {formatDate(announcement.startsAt)}</p>
              <button
                onClick={() => deleteAnnouncement(announcement._id)} // Pass the announcement ID to the delete function
                className="bg-red-500 text-white hover:bg-red-700 text-sm font-medium px-4 py-1 mt-3 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    </div>
  )
}

export default Types