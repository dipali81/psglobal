import React, { useState, useEffect} from 'react';
import Header from '../../shared/Header';
import Sidebar from '../../shared/Sidebar';
import HeadBar from '../../components/HeadBar';
import { toast, Toaster } from 'react-hot-toast';
import config from '../../config/config';
import Types from './components/Types';

function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const onDelete = (deletedAnnouncementId) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement._id !== deletedAnnouncementId)
    );
  };
  
  useEffect(() => {
    // Fetch announcements when the component mounts
    async function fetchAnnouncements() {
      try {
        const response = await fetch(`${config.baseUrl}/api/getAnnouncements`);
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Error fetching announcements', error);
      }
    }
    fetchAnnouncements();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !startsAt || !endsAt) {
      toast.error('Please complete all fields');
      return;
    }

    const data = {
      title,
      description,
      startsAt,
      endsAt,
    };

    try {
      const response = await fetch(`${config.baseUrl}/api/createAnnouncement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Announcement created successfully');
        setTitle("")
        setDescription("")
        setStartsAt("")
        setEndsAt("")

  
      } else {
        const errorData = await response.json();
        toast.error('Error: ' + errorData.error);
      }
    } catch (error) {
      toast.error('An error occurred while creating the announcement');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Toaster />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <HeadBar title={"Add Announcement"} description={"Schedule a new announcement"} />
            <section className="bg-gray-100">

 
            <div className="max-w-4xl px-4">
                <div className="p-6 mb-3 bg-white rounded-md shadow">
         
      <Types announcements={announcements} onDelete={onDelete} />
                  
</div>
</div>

              <div className="max-w-4xl px-4">
                <div className="p-6 bg-white rounded-md shadow">
                  <h2 className="mb-6 text-xl font-medium leading-6 text-gray-900">Announcement Details</h2>
                  <form action="#" method="post" className="">
                    <div className="container px-4 mx-auto" />
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium" htmlFor="title">Announcement Title</label>
                      <input
                        className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write announcement title"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium" htmlFor="description">Description</label>
                      <textarea
                        className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        placeholder="Write the announcement message"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium" htmlFor="startsAt">Schedule Starting Date</label>
                      <input
                        type="date"
                        id="startsAt"
                        value={startsAt}
                        onChange={(e) => setStartsAt(e.target.value)}
                        className="border rounded text-gray-900 sm:text-sm focus:outline-none block w-full pl-10 p-2.5"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium" htmlFor="endsAt">Schedule Ending Date</label>
                      <input
                        type="date"
                        id="endsAt"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                        className="border rounded text-gray-900 sm:text-sm focus:outline-none block w-full pl-10 p-2.5"
                      />
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-start space-x-2">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="inline-block w-full px-6 py-2.5 bg-blue-500 text-white font-semibold  leading-tight  rounded shadow-md hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
