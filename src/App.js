import { useEffect, useState, Suspense} from 'react';
import './App.css';
import ActivityItem from './activity-item/activity-item';
import EmptyActivity from './img/activity-empty-state.png';
import axios from 'axios';
import { fetchActivity } from './fetchApi/getActivityAll';
import { useSelector, useDispatch } from 'react-redux'
import { stopNewFetch } from './features/fetchSlice';
import DeleteActivity from './delete-activity/deleteActivity';
import PopUpDelete from './popup-delete/popUpDelete';

function App() {
  const [getAllActivity, setActivity] = useState([]);
  const fetchSlice = useSelector(state => state.fetchSlice.value);
  const [modalDeleteActivity, setModalDeleteActivity] = useState(false);
  const [getDetailActivity, setDetailActivity] = useState({});
  const [popUp, setPopUp] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchActivity()
    .then(function (response) {
      setActivity(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }, [])

  useEffect(() => {
    if (fetchSlice === true) {
      fetchActivity()
      .then(function (response) {
        setActivity(response.data.data)
        dispatch(stopNewFetch())
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }
  })

  const addActivity = () => {
    axios.post('https://todo.api.devcode.gethired.id/activity-groups', {
      title: 'New Activity',
    })
    .then(function (response) {
      if (response.status === 201) {
        fetchActivity()
        .then(function (response) {
          setActivity(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const deleteActivityThis = (e) => {
      setDetailActivity(e);
      setModalDeleteActivity(e.valueModalDelete);
  };

  const modalActivityFetch = (e) => {
      fetchActivity()
      .then(function (response) {
        if (response.status === 200) {
          setModalDeleteActivity(e);
          setPopUp(true);
          setActivity(response.data.data);
          dispatch(stopNewFetch());
          setInterval(() => {
            setPopUp(false);
          }, 2500)
        };
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  return (
    <div className={`App bg-[#F4F4F4] font-poppins relative ${modalDeleteActivity || popUp ? 'overflow-hidden h-[1000px]' : ''}`}>
      <div data-cy='header-background' className='h-[105px] bg-[#16ABF8] flex items-center justify-center'>
        <div className='w-[976px]'>
          <div data-cy='header-title'>
            <h2 className='text-white text-start font-bold text-2xl'>
              TO DO LIST APP
            </h2>
          </div>
        </div>
      </div>
      <div className='max-w-[976px] mx-auto min-h-screen'>
          <div className='flex mt-9 mx-auto flex-wrap mobile:gap-2 justify-between items-center'>
             <h1 data-cy='activity-title' className='text-[#212529] font-bold text-4xl'>Activity</h1>
             <button onClick={addActivity} data-cy='activity-add-button' className='w-[159px] rounded-[45px] h-[54px] flex items-center text-white bg-[#16ABF8] text-lg font-semibold justify-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              Tambah
              </button> 
          </div>
          <div className='mt-3 mx-auto'>
            {
              getAllActivity.length > 0 ?
              <div className='flex flex-wrap gap-2 mt-10 justify-center'>
                {
                  getAllActivity.map((activity,index) => (
                    <ActivityItem idActivity={activity.id} title={activity?.title} date={activity?.created_at} deleteActivityThis={deleteActivityThis} dataCy={`activity-item-${index}`}/>
                  ))
                }
              </div>
              :
              <img data-cy='activity-item' src={EmptyActivity} alt="empty" />
            }
          </div>
          <div className={`${modalDeleteActivity ? 'block' : 'hidden'}`}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DeleteActivity setModalDeleteActivity={modalActivityFetch} cancelDelete={setModalDeleteActivity} detailActivityToDelete={getDetailActivity}/>
                </Suspense>
          </div>
          <div className={`${popUp ? 'block' : 'hidden'}`}>
              <Suspense fallback={<div>Loading...</div>}>
                  <PopUpDelete title={"Activity"}/>
              </Suspense>
          </div>
      </div>
    </div>
  );
}

export default App;
